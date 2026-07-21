import React from "react";
import "./SectionTitle.css";

export default function SectionTitle({
  subtitle,
  title,
  description,
  align = "center",
  accentColor = "crimson",
}) {
  return (
    <div className={`section-title section-title--${align}`}>
      {subtitle && (
        <span
          className={`section-title__sub section-title__sub--${accentColor}`}
        >
          {subtitle}
        </span>
      )}

      <h2 className="section-title__heading">{title}</h2>

      {description && (
        <p className="section-title__desc">{description}</p>
      )}

      <div
        className={`section-title__bar section-title__bar--${accentColor}`}
      ></div>
    </div>
  );
}