import React from "react";
import "./GalleryItem.css";

export default function GalleryItem({
  title,
  category,
  imageUrl,
  onClick,
}) {
  return (
    <div
      className="gallery-item"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onClick?.();
        }
      }}
    >
      <div
        className="gallery-item__img"
        style={
          imageUrl
            ? { backgroundImage: `url(${imageUrl})` }
            : {}
        }
      >
        {!imageUrl && (
          <span className="gallery-item__placeholder"></span>
        )}

        <div className="gallery-item__overlay">
          <span className="gallery-item__zoom">🔍</span>
        </div>
      </div>

      <div className="gallery-item__info">
        <p className="gallery-item__category">{category}</p>
        <h4 className="gallery-item__title">{title}</h4>
      </div>
    </div>
  );
}