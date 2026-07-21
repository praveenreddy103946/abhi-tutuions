import React, { useState } from "react";
import Hero from "../../components/Hero/Hero";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import "./Admissions.css";

const STEPS = [
  {
    step: "1",
    title: "Submit Inquiry",
    desc: "Fill out the enquiry form below or call us directly.",
  },
  {
    step: "2",
    title: "Diagnostic Assessment",
    desc: "A short test to understand the student's current level.",
  },
  {
    step: "3",
    title: "Learning Plan",
    desc: "We prepare a custom learning plan with subject focus and schedule.",
  },
  {
    step: "4",
    title: "Enroll & Begin",
    desc: "Confirm enrollment and start attending classes within 2 days.",
  },
];

const INITIAL = {
  name: "",
  parentName: "",
  grade: "",
  subjects: "",
  phone: "",
  email: "",
  message: "",
};

export default function Admissions() {
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <Hero
        subtitle="Admissions"
        title="Begin Your Academic Journey"
        description="We welcome motivated students from Grade 5 to Grade 10. Limited seats available—apply today."
        backgroundVariant="crimson"
      />

      {/* Admission Steps */}
      <section className="admissions_section">
        <div className="admissions_inner">
          <SectionTitle
            subtitle="How to Join"
            title="Admission Process"
            description="Simple, transparent, and student-friendly. Join in just 4 steps."
          />

          <div className="admissions_steps">
            {STEPS.map(({ step, title, desc }) => (
              <div key={step} className="admissions_step">
                <div className="admissions_step-circle">{step}</div>
                <h4 className="admissions_step-title">{title}</h4>
                <p className="admissions_step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Form */}
      <section className="admissions_form-section">
        <div className="admissions_inner admissions_form-grid">

          <div className="admissions_info">
            <SectionTitle
              subtitle="Enquire Now"
              title="Apply for Admission"
              align="left"
              accentColor="forest"
            />

            <div className="admissions_highlights">
              {[
                ["📅", "Classes available 6 days a week"],
                ["👥", "Batch size limited to 15 students"],
                ["📚", "CBSE, ICSE & State Board"],
                ["🎓", "Free trial class before enrollment"],
                ["⚡", "Response within 24 hours"],
              ].map(([icon, text]) => (
                <div key={text} className="admissions_highlight">
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="admissions_form-wrap">
            {submitted ? (
              <div className="admissions_success">
                <div className="admissions_success-icon">✅</div>

                <h3>Application Submitted!</h3>

                <p>
                  Thank you, <strong>{form.name}</strong>! We'll contact you
                  within 24 hours on <strong>{form.phone}</strong>.
                </p>

                <button
                  className="admissions_reset"
                  onClick={() => {
                    setForm(INITIAL);
                    setSubmitted(false);
                  }}
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form className="admissions_form" onSubmit={handleSubmit}>

                <div className="admissions_form-row">
                  <div className="admissions_field">
                    <label>Student Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                    />
                  </div>

                  <div className="admissions_field">
                    <label>Parent / Guardian Name *</label>
                    <input
                      name="parentName"
                      value={form.parentName}
                      onChange={handleChange}
                      placeholder="Parent Name"
                      required
                    />
                  </div>
                </div>

                <div className="admissions_form-row">
                  <div className="admissions_field">
                    <label>Current Grade *</label>
                    <select
                      name="grade"
                      value={form.grade}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Grade</option>
                      {[5, 6, 7, 8, 9, 10].map((g) => (
                        <option key={g} value={g}>
                          Grade {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="admissions_field">
                    <label>Subjects Needed *</label>
                    <input
                      name="subjects"
                      value={form.subjects}
                      onChange={handleChange}
                      placeholder="e.g. Maths, Science"
                      required
                    />
                  </div>
                </div>

                <div className="admissions_form-row">
                  <div className="admissions_field">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      required
                    />
                  </div>

                  <div className="admissions_field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div className="admissions_field">
                  <label>Additional Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Any specific requirements or questions..."
                  />
                </div>

                <button type="submit" className="admissions_submit">
                  Submit Application →
                </button>

              </form>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}