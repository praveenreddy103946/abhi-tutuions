import React from "react";
import "./CourseCard.css";
export default function CourseCard({
  icon,
  title,
  description,
  grades,
  features,
}) {
  return (
    <div className="course-card">
      <div className="course-card__icon">{icon}</div>
      <h3 className="course-card__title">{title}</h3>
      <p className="course-card__grades">Grades: {grades}</p>
      <p className="course-card__desc">{description}</p>
      {features && (
        <ul className="course-card__features">
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
