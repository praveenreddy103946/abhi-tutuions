// Base URL of your videos folder
export const BUCKET_BASE_URL = "/videos";

// Video Catalog
export const VIDEO_CATALOG = [
  {
    id: 1,
    title: "DEMO 1",
    subject: "Sample Subject",
    grade: "Grade 6-8",
    description:
      "Covers number systems, basic algebra, and geometry fundamentals.",
    duration: "45 min",
    thumbnail: null,
    filename: "dem01_lecture.mp4",
  },
  {
    id: 2,
    title: "Fundamentals of Science",
    subject: "Science",
    grade: "Grade 6-8",
    description:
      "Introduction to Physics, Chemistry and Biology concepts.",
    duration: "50 min",
    thumbnail: null,
    filename: "science-fundamentals.mp4",
  },
  {
    id: 3,
    title: "English Grammar Essentials",
    subject: "English",
    grade: "Grade 5-7",
    description:
      "Parts of speech, sentence structure and writing skills.",
    duration: "40 min",
    thumbnail: null,
    filename: "english-grammar.mp4",
  },
  {
    id: 4,
    title: "Advanced Algebra",
    subject: "Mathematics",
    grade: "Grade 9-10",
    description:
      "Quadratic equations, polynomials and coordinate geometry.",
    duration: "55 min",
    thumbnail: null,
    filename: "algebra-advanced.mp4",
  },
  {
    id: 5,
    title: "Environmental Science",
    subject: "Science",
    grade: "Grade 8-9",
    description:
      "Ecosystems, climate, and sustainable development.",
    duration: "42 min",
    thumbnail: null,
    filename: "env-science.mp4",
  },
  {
    id: 6,
    title: "History & Civics Overview",
    subject: "Social Studies",
    grade: "Grade 7-9",
    description:
      "Indian history, constitution and democratic processes.",
    duration: "48 min",
    thumbnail: null,
    filename: "history-civics.mp4",
  },
];

/**
 * Returns the video URL.
 * Change BUCKET_BASE_URL to your AWS S3 URL when deploying.
 */
export const getVideoUrl = (filename) => {
  return `${BUCKET_BASE_URL}/${filename}`;
};