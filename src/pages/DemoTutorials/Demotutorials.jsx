import React, { useState, useMemo } from "react";

import Hero from "../../components/Hero/Hero";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import VideoCard from "../../components/VideoCard/VideoCard";

import { VIDEO_CATALOG, getVideoUrl } from "../../config/s3.config";

import "./Demotutorials.css";

const SUBJECTS = [
  "All",
  ...new Set(VIDEO_CATALOG.map((video) => video.subject)),
];

export default function DemoTutorials() {
  const [activeVideo, setActiveVideo] = useState(VIDEO_CATALOG[0]);
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return filter === "All"
      ? VIDEO_CATALOG
      : VIDEO_CATALOG.filter((video) => video.subject === filter);
  }, [filter]);

  return (
    <main>
      <Hero
        subtitle="Demo Tutorials"
        title="Learn Before You Enroll"
        description="Watch our free demo lessons streamed directly from our library. No registration required."
        backgroundVariant="navy"
      />

      <section className="demo_section">
        <div className="demo_inner">

          <SectionTitle
            subtitle="Free Video Library"
            title="Browse Our Tutorial Videos"
            description="Select any topic below to start streaming. All videos are hosted securely on AWS S3."
          />

          <div className="demo_layout">

            {/* Video Player */}
            <div className="demo_player-col">

              <VideoPlayer
                key={activeVideo.id}
                src={getVideoUrl(activeVideo.filename)}
                title={activeVideo.title}
              />

              <div className="demo_now-playing">

                <span
                  className={`demo_subject-tag demo_subject-tag--${activeVideo.subject
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {activeVideo.subject}
                </span>

                <h3 className="demo_playing-title">
                  {activeVideo.title}
                </h3>

                <p className="demo_playing-grade">
                  {activeVideo.grade} &nbsp;•&nbsp; {activeVideo.duration}
                </p>

                <p className="demo_playing-desc">
                  {activeVideo.description}
                </p>
              </div>

              <div className="demo_s3-note">
                <div className="demo_s3-icon">☁️</div>

                <div>
                  <strong>Streamed from AWS S3</strong>

                  <p>
                    Videos are delivered directly from your configured S3
                    bucket. To add new videos, upload the MP4 file to your
                    bucket and add an entry to{" "}
                    <code>src/config/s3.config.js</code>.
                  </p>
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="demo_sidebar">

              <div className="demo_filters">
                {SUBJECTS.map((subject) => (
                  <button
                    key={subject}
                    className={`demo_filter ${
                      filter === subject ? "demo_filter--active" : ""
                    }`}
                    onClick={() => setFilter(subject)}
                  >
                    {subject}
                  </button>
                ))}
              </div>

              <div className="demo_count">
                {filtered.length} video
                {filtered.length !== 1 ? "s" : ""}
              </div>

              <div className="demo_video-list">
                {filtered.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onClick={setActiveVideo}
                    isActive={activeVideo.id === video.id}
                  />
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
}