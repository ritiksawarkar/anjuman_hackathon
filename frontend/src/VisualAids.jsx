import React from "react";

const aids = [
  {
    title: "Infographic: Water Cycle",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Water_cycle.png",
    desc: "A simple infographic showing the water cycle stages.",
  },
  {
    title: "Mind Map: Photosynthesis",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Photosynthesis_Mindmap.png",
    desc: "A mind map to help understand photosynthesis.",
  },
  {
    title: "Diagram: Human Eye",
    img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Human_eye_diagram-en.svg",
    desc: "A labeled diagram of the human eye.",
  },
];

const VisualAids = () => (
  <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8">
    <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Visual Learning Aids</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {aids.map((aid, i) => (
        <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex flex-col items-center">
          <img src={aid.img} alt={aid.title} className="h-32 object-contain mb-2 rounded" />
          <div className="font-semibold mb-1 text-center text-gray-800 dark:text-gray-100">{aid.title}</div>
          <div className="text-xs text-gray-500 dark:text-gray-300 text-center">{aid.desc}</div>
        </div>
      ))}
    </div>
    <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
      Visual aids like infographics, diagrams, and mind maps help all learners, especially those with learning disabilities.
    </p>
  </div>
);

export default VisualAids;
