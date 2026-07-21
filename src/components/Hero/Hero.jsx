import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  backgroundVariant = "navy",
}) {
  return (
    <section className={`hero hero--${backgroundVariant}`}>
      <div className="hero__overlay"></div>
      <div className="hero__content">
        {subtitle && (
          <span className="hero__subtitle">{subtitle}</span>
        )}

        <h1 className="hero__title">{title}</h1>

        {description && (
          <p className="hero__description">{description}</p>
        )}

        <div className="hero__actions">
          {primaryCta && (
            <Link
              to={primaryCta.to}
              className="hero__btn hero__btn--primary"
            >
              {primaryCta.label}
            </Link>
          )}

          {secondaryCta && (
            <Link
              to={secondaryCta.to}
              className="hero__btn hero__btn--secondary"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>

      <div className="hero__shapes">
        <div className="hero__shape hero__shape--1"></div>
        <div className="hero__shape hero__shape--2"></div>
      </div>
    </section>
  );
}