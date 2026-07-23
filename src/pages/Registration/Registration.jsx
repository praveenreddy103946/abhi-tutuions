import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import "../Admissions/Admissions.css";
import "./Registration.css";

const INITIAL = {
  name: "",
  parentName: "",
  grade: "",
  subjects: "",
  phone: "",
  email: "",
  message: "",
};

export default function Registration() {
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
    
    // Save to localStorage
    const existingRegistrations = JSON.parse(localStorage.getItem("registrations") || "[]");
    const newRegistration = { ...form, timestamp: new Date().toISOString() };
    localStorage.setItem("registrations", JSON.stringify([...existingRegistrations, newRegistration]));
    
    setSubmitted(true);
  };

  return (
    <main className="registration-page">
      <section className="admissions_form-section registration-section">
        <div className="admissions_inner admissions_form-grid">

          <div className="admissions_info">
            <SectionTitle
              subtitle="Registration"
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
