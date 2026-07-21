import React from "react";
import "./StatsBanner.css";

const STATS = [
  { value: "1,500+", label: "Students Enrolled" },
  { value: "50+", label: "Expert Tutors" },
  { value: "15+", label: "Years of Excellence" },
  { value: "98%", label: "Success Rate" },
];

export default function StatsBanner() {
  return (
    <section className="stats-banner">
      <div className="stats-banner__inner">
        {STATS.map(({ value, label }) => (
          <div key={label} className="stats-banner__item">
            <span className="stats-banner__value">{value}</span>
            <span className="stats-banner__label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}