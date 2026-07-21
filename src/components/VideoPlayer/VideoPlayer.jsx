import React, { useRef, useState, useCallback } from "react";
import "./VideoPlayer.css";

export default function VideoPlayer({ src, title, poster }) {
  const videoRef = useRef(null);
  const controlsTimer = useRef(null);
  const userStarted = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const resetControlsTimer = useCallback(() => {
    setShowControls(true);

    clearTimeout(controlsTimer.current);

    controlsTimer.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 3000);
  }, [playing]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      v.muted = false;
      setMuted(false);
      userStarted.current = true;
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }

    resetControlsTimer();
  };

  const onMouseEnter = () => {
    const v = videoRef.current;

    if (!v || userStarted.current) return;

    v.muted = true;
    setMuted(true);

    v.play().catch(() => {});
    setPlaying(true);
  };

  const onMouseLeave = () => {
    const v = videoRef.current;

    if (!v || userStarted.current) return;

    v.pause();
    v.currentTime = 0;

    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setShowControls(false);
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;

    setCurrentTime(v.currentTime);
    setProgress((v.currentTime / v.duration) * 100 || 0);

    if (v.buffered.length > 0) {
      setBuffered(
        (v.buffered.end(v.buffered.length - 1) / v.duration) * 100 || 0
      );
    }
  };

  const onSeek = (e) => {
    const v = videoRef.current;
    if (!v) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;

    v.currentTime = pct * v.duration;
  };

  const onVolumeChange = (e) => {
    const val = parseFloat(e.target.value);

    setVolume(val);

    if (videoRef.current) {
      videoRef.current.volume = val;
    }

    setMuted(val === 0);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const toggleFullscreen = () => {
    const container = videoRef.current.closest(".vp");

    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const skip = (seconds) => {
    const v = videoRef.current;
    if (!v) return;

    v.currentTime = Math.min(
      Math.max(0, v.currentTime + seconds),
      v.duration
    );
  };

  return (
    <div
      className={`vp ${fullscreen ? "vp--fullscreen" : ""}`}
      onMouseMove={resetControlsTimer}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <video
        ref={videoRef}
        className="vp_video"
        src={src}
        poster={poster}
        preload="metadata"
        muted={muted}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={() => setDuration(videoRef.current.duration || 0)}
        onEnded={() => {
          setPlaying(false);
          setShowControls(true);
          userStarted.current = false;
        }}
        onClick={togglePlay}
      />

      {!playing && (
        <button
          className="vp_big-play"
          onClick={togglePlay}
          aria-label="Play video"
        >
          ▶
        </button>
      )}

      <div
        className={`vp_controls ${
          showControls ? "controls-visible" : ""
        }`}
      >
        <div className="vp_progress-bar" onClick={onSeek}>
          <div
            className="vp_buffered"
            style={{ width: `${buffered}%` }}
          />
          <div
            className="vp_played"
            style={{ width: `${progress}%` }}
          />
          <div
            className="vp_thumb"
            style={{ left: `${progress}%` }}
          />
        </div>

        <div className="vp_toolbar">
          <div className="vp_toolbar-left">
            <button className="vp_btn" onClick={togglePlay}>
              {playing ? "⏸" : "▶"}
            </button>

            <button className="vp_btn" onClick={() => skip(-10)}>
              ⏪
            </button>

            <button className="vp_btn" onClick={() => skip(10)}>
              ⏩
            </button>

            <button className="vp_btn" onClick={toggleMute}>
              {muted || volume === 0 ? "🔇" : "🔊"}
            </button>

            <input
              className="vp_volume"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={muted ? 0 : volume}
              onChange={onVolumeChange}
            />

            <span className="vp_time">
              {fmt(currentTime)} / {fmt(duration)}
            </span>
          </div>

          <div className="vp_toolbar-right">
            {title && (
              <span className="vp_title">{title}</span>
            )}

            <button
              className="vp_btn"
              onClick={toggleFullscreen}
            >
              {fullscreen ? "🡼" : "⛶"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}