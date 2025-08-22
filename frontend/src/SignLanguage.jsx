import React from "react";
import Layout from './components/common/Layout';

const videos = [
  {
    title: "Sign Language Alphabet",
    url: "https://www.youtube.com/embed/Ip4LvFjGxwg",
    desc: "Learn the basics of the sign language alphabet.",
  },
  {
    title: "Common Classroom Signs",
    url: "https://www.youtube.com/embed/3xYW6KqF1nE",
    desc: "Useful signs for classroom communication.",
  },
  {
    title: "Sign Language Avatar Demo",
    url: "https://www.youtube.com/embed/1Xw6hG9b2gE",
    desc: "Animated avatar demonstrating sign language.",
  },
];

const SignLanguage = () => (
  <Layout>
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Sign Language Support</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((vid, i) => (
          <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex flex-col items-center">
            <iframe
              width="100%"
              height="180"
              src={vid.url}
              title={vid.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mb-2 rounded"
            ></iframe>
            <div className="font-semibold mb-1 text-center text-gray-800 dark:text-gray-100">{vid.title}</div>
            <div className="text-xs text-gray-500 dark:text-gray-300 text-center">{vid.desc}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        Sign language videos and avatars help hearing-impaired students understand content.
      </p>
    </div>
  </Layout>
);

export default SignLanguage;
