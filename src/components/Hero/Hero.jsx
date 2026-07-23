import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight, ChevronDown } from "lucide-react";
import "./Hero.css";

export default function Hero({
  subtitle,
  titlePart1,
  titlePart2,
  mainSubtitle,
  description,
  primaryCta,
  secondaryCta,
}) {
  useEffect(() => {
    // Freeze scroll when Hero is mounted
    document.body.style.overflow = "hidden";
    
    // Cleanup function to ensure scroll is restored when navigating away
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const scrollToContent = () => {
    // Unfreeze scroll when user clicks to discover more
    document.body.style.overflow = "auto";
    
    const heroElement = document.querySelector('.hero');
    if (heroElement && heroElement.nextElementSibling) {
      heroElement.nextElementSibling.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    }
  };
  return (
    <section className="hero">
      <div className="hero__content">
        {subtitle && <span className="hero__subtitle">{subtitle}</span>}

        <h1 className="hero__title">
          {titlePart1}
          {titlePart2 && (
            <span className="hero__title--accent">{titlePart2}</span>
          )}
        </h1>

        <div className="hero__icon-divider">
          <GraduationCap />
        </div>

        {mainSubtitle && (
          <h2 className="hero__subtitle-main">{mainSubtitle}</h2>
        )}

        {description && <p className="hero__description">{description}</p>}

        <div className="hero__actions">
          {primaryCta && (
            <Link to={primaryCta.to} state={primaryCta.state} className="hero__btn hero__btn--primary">
              {primaryCta.label} <ArrowRight size={18} />
            </Link>
          )}

          {secondaryCta && (
            <Link
              to={secondaryCta.to}
              state={secondaryCta.state}
              className="hero__btn hero__btn--secondary"
            >
              {secondaryCta.label} <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </div>

      <div 
        className="hero__scroll-indicator" 
        onClick={scrollToContent}
        role="button"
        tabIndex={0}
        aria-label="Scroll down to content"
      >
        <span className="hero__scroll-text">Discover More</span>
        <ChevronDown size={28} className="hero__scroll-icon" />
      </div>
    </section>
  );
}
