import React from "react";
import { Link } from "react-router-dom";

import Hero from "../../components/Hero/Hero";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import StatsBanner from "../../components/StatsBanner/StatsBanner";
import CourseCard from "../../components/CourseCard/CourseCard";
import TestimonialCard from "../../components/TestimonialCard/TestimonialCard";

import "./Home.css";

const COURSES = [
  {
    icon: "📘",
    title: "Mathematics",
    grades: "5-12",
    description:
      "From foundations to advanced calculus with structured, concept-driven teaching.",
    features: [
      "Algebra & Geometry",
      "Trigonometry",
      "Calculus",
      "Board Exam Prep",
    ],
  },
  {
    icon: "🔬",
    title: "Science",
    grades: "6-10",
    description:
      "Physics, Chemistry and Biology with lab-style interactive lessons.",
    features: [
      "Conceptual Clarity",
      "Diagram-based Learning",
      "NCERT Beyond",
      "Practicals Covered",
    ],
  },
  {
    icon: "📖",
    title: "English",
    grades: "5-10",
    description:
      "Grammar, comprehension and creative writing for confident communication.",
    features: [
      "Grammar Mastery",
      "Essay Writing",
      "Literature",
      "Speaking Skills",
    ],
  },
  {
    icon: "🌍",
    title: "Social Studies",
    grades: "6-10",
    description:
      "History, Geography and Civics made engaging and easy to remember.",
    features: [
      "Map Work",
      "Timeline Revision",
      "Current Affairs",
      "NCERT Aligned",
    ],
  },
];

const TESTIMONIALS = [
  {
    quote:
      "ABHI TUITIONS transformed my daughter's performance. She went from struggling to scoring 95% in Maths!",
    name: "Priya Sharma",
    grade: "Parent of Grade 9 Student",
    rating: 5,
  },
  {
    quote:
      "The teachers here genuinely care. I finally understand Physics concepts I thought were impossible.",
    name: "Rohan Mehta",
    grade: "Grade 10 Student",
    rating: 5,
  },
  {
    quote:
      "Excellent study material and very supportive faculty. Highly recommended for any student.",
    name: "Anika Joshi",
    grade: "Parent of Grade 7 Student",
    rating: 5,
  },
];

export default function Home() {
  return (
    <main>
      <Hero
        subtitle="Welcome to ABHI TUITIONS"
        title="Unlocking Every Student's Full Potential"
        description="Expert tutoring, personalized attention, and proven methods helping students from Grade 5 to Grade 12 achieve academic excellence."
        primaryCta={{ to: "/admissions", label: "Enroll Today" }}
        secondaryCta={{
          to: "/demo-tutorials",
          label: "Watch Free Demos",
        }}
        backgroundVariant="navy"
      />

      <StatsBanner />

      {/* Courses */}
      <section className="home_courses">
        <div className="home_section-inner">
          <SectionTitle
            subtitle="Our Programs"
            title="Subjects We Excel In"
            description="Comprehensive tuition across core subjects with experienced educators who make complex topics simple."
          />

          <div className="home_courses-grid">
            {COURSES.map((course) => (
              <CourseCard key={course.title} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="home_why">
        <div className="home_section-inner">
          <div className="home_why-grid">
            <div className="home_why-text">
              <SectionTitle
                subtitle="Why Choose Us"
                title="What Makes ABHI TUITIONS Different"
                description="We go beyond textbooks. Our approach builds critical thinkers, confident learners, and future leaders."
                align="left"
                accentColor="forest"
              />

              <ul className="home_why-list">
                {[
                  ['🎯', 'Personalized learning plans for every student'],
                  ['👨‍🏫', 'Experienced, subject-expert tutors'],
                  ['🎥', 'Free demo tutorials on every topic'],
                  ['📊', 'Regular assessments & progress tracking'],
                  ['💡', 'Doubt-clearing sessions every week'],
                  ['🏆', 'Proven results – 98% of students improve grades'],
                ].map((icon,text) => (
                  <li key={text}>
                    <span className="home_why-icon">{icon}</span>
                    {text}
                  </li>
                ))}
              </ul>

              <Link to="/about" className="home_why-btn">
                Learn More About Us →
              </Link>
            </div>

            <div className="home_why-visual">
              <div className="home_why-card home_why-card--1">
                <div className="home_why-big">98%</div>
                <div>Students improve grades in the first term</div>
              </div>

              <div className="home_why-card home_why-card--2">
                <div className="home_why-big">50+</div>
                <div>Expert Tutors Across All Subjects</div>
              </div>

              <div className="home_why-card home_why-card--3">
                <div className="home_why-big">15+</div>
                <div>Years of Teaching Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section className="home_demo-cta">
        <div className="home_section-inner">
          <div className="home_demo-cta-box">
            <div>
              <h2 className="home_demo-title">Try Before You Enroll</h2>
              <p className="home_demo-sub">
                Watch free demo tutorial videos streamed directly from our
                library—no sign-up required.
              </p>
            </div>

            <Link to="/demo-tutorials" className="home_demo-btn">
              Watch Free Demos →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="home_testimonials">
        <div className="home_section-inner">
          <SectionTitle
            subtitle="Student Stories"
            title="What Our Families Say"
          />

          <div className="home_testimonials-grid">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                {...testimonial}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enroll CTA */}
      <section className="home_enroll-cta">
        <div className="home_section-inner">
          <h2 className="home_enroll-title">
            Ready to Start Your Journey?
          </h2>

          <p className="home_enroll-sub">
            Seats are limited. Enroll now and give your child the academic edge
            they deserve.
          </p>

          <div className="home_enroll-actions">
            <Link
              to="/admissions"
              className="home_enroll-btn home_enroll-btn--primary"
            >
              Apply for Admission
            </Link>

            <Link
              to="/contact"
              className="home_enroll-btn home_enroll-btn--secondary"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}