import React from "react";
import Hero from "../../components/Hero/Hero";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import "./About.css";

const TEAM = [
  {
    name: "Dr. Abhishek Sharma",
    role: "Founder & Director",
    subject: "Mathematics",
    experience: "18 Years",
  },
  {
    name: "Ms. Priya Kapoor",
    role: "Head of Science",
    subject: "Physics & Chemistry",
    experience: "12 Years",
  },
  {
    name: "Mr. Ramesh Nair",
    role: "Senior Tutor",
    subject: "English & Social Studies",
    experience: "10 Years",
  },
  {
    name: "Ms. Sunita Verma",
    role: "Academic Coordinator",
    subject: "Biology",
    experience: "9 Years",
  },
];

const VALUES = [
  {
    icon: "🎓",
    title: "Academic Excellence",
    description:
      "We maintain the highest standards in curriculum delivery and student outcomes.",
  },
  {
    icon: "👨‍🏫",
    title: "Personalized Attention",
    description:
      "Every student receives a tailored learning plan suited to their pace and needs.",
  },
  {
    icon: "💡",
    title: "Innovation in Teaching",
    description:
      "We use modern methods, visual aids, and technology to make learning effective.",
  },
  {
    icon: "🌱",
    title: "Holistic Growth",
    description:
      "Beyond grades, we nurture confidence, curiosity, and critical thinking.",
  },
];

export default function About() {
  return (
    <main>
      <Hero
        subtitle="About ABHI TUITIONS"
        title="Shaping Minds, Building Futures"
        description="Since 2009, we have been the trusted academic partner for thousands of families, providing quality education with a personal touch."
        backgroundVariant="charcoal"
      />

      {/* Mission */}
      <section className="about_mission">
        <div className="about_inner">
          <div className="about_mission-grid">
            <div>
              <SectionTitle
                subtitle="Our Story"
                title="Who We Are"
                align="left"
                accentColor="crimson"
              />

              <p className="about_body-text">
                ABHI TUITIONS was founded in 2009 by Dr. Abhishek Sharma with a
                single classroom and a bold vision—to make quality education
                accessible and impactful for every student.
              </p>

              <p className="about_body-text">
                Today, we are a thriving institute with 50+ expert tutors,
                1,500+ students, and a legacy of outstanding results.
              </p>
            </div>

            <div className="about_badges">
              <div className="about_badge about_badge--navy">
                <span className="about_badge-num">2009</span>
                <span>Year Founded</span>
              </div>

              <div className="about_badge about_badge--crimson">
                <span className="about_badge-num">1500+</span>
                <span>Students Served</span>
              </div>

              <div className="about_badge about_badge--forest">
                <span className="about_badge-num">50+</span>
                <span>Expert Tutors</span>
              </div>

              <div className="about_badge about_badge--olive">
                <span className="about_badge-num">98%</span>
                <span>Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="about_vision">
        <div className="about_inner about_vision-grid">
          <div className="about_vision-box about_vision-box--mission">
            <div className="about_vision-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>
              To provide personalized, high-quality academic coaching that
              empowers every student to excel in their studies and develop
              lifelong learning skills.
            </p>
          </div>

          <div className="about_vision-box about_vision-box--vision">
            <div className="about_vision-icon">🚀</div>
            <h3>Our Vision</h3>
            <p>
              To be the leading educational institution that nurtures academic
              brilliance, builds character, and inspires students to become
              confident contributors to society.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about_values">
        <div className="about_inner">
          <SectionTitle
            subtitle="Our Foundation"
            title="Core Values"
            description="The principles that guide everything we do at ABHI TUITIONS."
          />

          <div className="about_values-grid">
            {VALUES.map((value) => (
              <div key={value.title} className="about_value-card">
                <div className="about_value-icon">{value.icon}</div>
                <h4 className="about_value-title">{value.title}</h4>
                <p className="about_value-desc">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about_team">
        <div className="about_inner">
          <SectionTitle
            subtitle="Meet the Team"
            title="Our Expert Educators"
            description="Passionate, qualified, and dedicated to every student's success."
          />

          <div className="about_team-grid">
            {TEAM.map((member) => (
              <div key={member.name} className="about_team-card">
                <div className="about_team-avatar">
                  {member.name.charAt(0)}
                </div>

                <h4 className="about_team-name">{member.name}</h4>
                <p className="about_team-role">{member.role}</p>
                <p className="about_team-subject">{member.subject}</p>

                <span className="about_team-exp">
                  {member.experience} Experience
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}