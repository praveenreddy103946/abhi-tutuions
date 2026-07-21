import React from "react";
import "./VideoCard.css";

export default function VideoCard({ video, onClick, isActive }) {
  return (
    <div
      className={`video-card ${isActive ? "video-card--active" : ""}`}
      onClick={() => onClick(video)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onClick(video);
        }
      }}
    >
      <div className="video-card__thumb">
        <div className="video-card__play-icon">▶</div>

        <span
          className={`video-card__subject video-card__subject--${video.subject
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          {video.subject}
        </span>

        <span className="video-card__duration">
          {video.duration}
        </span>
      </div>

      <div className="video-card__info">
        <h4 className="video-card__title">{video.title}</h4>

        <p className="video-card__grade">
          {video.grade}
        </p>

        <p className="video-card__desc">
          {video.description}
        </p>
      </div>
    </div>
  );
}