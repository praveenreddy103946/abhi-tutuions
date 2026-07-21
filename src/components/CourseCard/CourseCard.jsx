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
      <div className="course-card_icon">{icon}</div>
      <h3 className="course-card_title">{title}</h3>
      <p className="course-card_grades">Grades: {grades}</p>
      <p className="course-card desc">{description}</p>
      {features && (
        <ul className="course-card features">
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
