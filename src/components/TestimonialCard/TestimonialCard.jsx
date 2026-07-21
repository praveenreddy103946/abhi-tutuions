import React from "react";
import "./TestimonialCard.css";

export default function TestimonialCard({
  quote,
  name,
  grade,
  rating = 5,
}) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-card__stars">
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </div>

      <blockquote className="testimonial-card__quote">
        "{quote}"
      </blockquote>

      <div className="testimonial-card__author">
        <div className="testimonial-card__avatar">
          {name.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="testimonial-card__name">{name}</p>
          <p className="testimonial-card__grade">{grade}</p>
        </div>
      </div>
    </div>
  );
}