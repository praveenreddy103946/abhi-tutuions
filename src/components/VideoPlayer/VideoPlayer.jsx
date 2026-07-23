import React, { useRef, useState, useCallback } from "react";
import "./VideoPlayer.css";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw
} from "lucide-react";

export default function VideoPlayer({ src, title, poster }) {
  const videoRef = useRef(null);
  const controlsTimer = useRef(null);
  const userStarted = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const resetControlsTimer = useCallback(() => {
    setShowControls(true);

    clearTimeout(controlsTimer.current);

    controlsTimer.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 3000);
  }, [playing]);

  const togglePlay = () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      userStarted.current = true;
      video.play();
    } else {
      userStarted.current = false;
      video.pause();
    }

    resetControlsTimer();
  };

  const onMouseEnter = () => {
    const video = videoRef.current;
    if (!video || userStarted.current) return;

    video.volume = volume;
    video.muted = false;
    setMuted(false);

    video.play().catch(() => { });
    setPlaying(true);
  };
  const onMouseLeave = () => {
    const video = videoRef.current;
    if (!video || userStarted.current) return;

    video.pause();
    video.currentTime = 0;

    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    if (playing) setShowControls(false);
  };

  const onTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    setCurrentTime(video.currentTime);
    setProgress((video.currentTime / video.duration) * 100 || 0);

    if (video.buffered.length > 0) {
      setBuffered(
        (video.buffered.end(video.buffered.length - 1) / video.duration) * 100,
      );
    }
  };

  const onSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;

    video.currentTime = percent * video.duration;
  };

  const onVolumeChange = (e) => {
    const value = parseFloat(e.target.value);

    setVolume(value);

    if (videoRef.current) {
      videoRef.current.volume = value;
      videoRef.current.muted = value === 0;
    }

    setMuted(value === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const container = videoRef.current?.closest(".vp");

    if (!document.fullscreenElement) {
      container?.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const skip = (seconds) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.min(
      Math.max(0, video.currentTime + seconds),
      video.duration,
    );
  };

  return (
    <div
      className={`vp ${fullscreen ? "vp--fullscreen" : ""}`}

      onMouseMove={resetControlsTimer}
    >
      <video
        ref={videoRef}
        className="vp__video"
        src={src}
        poster={poster}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        muted={muted}
        onClick={togglePlay}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        onEnded={() => {
          setPlaying(false);
          setShowControls(true);
          userStarted.current = false;
        }}
      />

      {!playing && (
        <button
          className="vp__big-play"
          onClick={togglePlay}
          aria-label="Play video"
        >
          <Play size={34} fill="currentColor" />
        </button>
      )}

      <div
        className={`vp__controls ${showControls ? "vp__controls--visible" : ""
          }`}
      >
        <div className="vp__progress-bar" onClick={onSeek}>
          <div className="vp__buffered" style={{ width: `${buffered}%` }} />
          <div className="vp__played" style={{ width: `${progress}%` }} />
          <div className="vp__thumb" style={{ left: `${progress}%` }} />
        </div>

        <div className="vp__toolbar">
          <div className="vp__toolbar-left">
            <button className="vp__btn" onClick={togglePlay}>
              {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
            </button>

            <button className="vp__btn" onClick={() => skip(-10)}>
              <RotateCcw size={22} />
            </button>

            <button className="vp__btn" onClick={() => skip(10)}>
              <RotateCw size={22} />
            </button>

            <button className="vp__btn" onClick={toggleMute}>
              {muted || volume === 0 ?
                <VolumeX size={18} />
                :
                <Volume2 size={18} />
              }
            </button>

            <input
              className="vp__volume"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={onVolumeChange}
            />

            <span className="vp__time">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="vp__toolbar-right">
            {title && <span className="vp__title">{title}</span>}

            <button className="vp__btn" onClick={toggleFullscreen}>
              {fullscreen ?
                <Minimize size={18} />
                :
                <Maximize size={18} />
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
