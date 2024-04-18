import React from "react";

export default function GuidesPage() {
  const guides = [
    {
      name: "Maria, Cultaral Explorer",
      location: "Spain",
      expertise:
        "Maria specializes in leading immersive cultural journeys that delve deep into the traditions, stories, and cuisines of diverse communities.",
      activities:
        "Guided village tours, traditional craft workshops, cooking classes with local families.",
      approach:
        "Maria believes in sustainable tourism that respects local cultures and supports community well-being",
      languages: "Fluent in English and Spanish",
      image: "../images/guide4.jpeg",
    },
    {
      name: "Amina, Community Connector",
      location: "France",
      expertise:
        "Amina specializes in urban exploration, connecting travelers with the heart and soul of cities while supporting local initiatives",
      activities:
        "City walking tours, visits to community projects, cultural performances",
      approach:
        "Amina's tours focus on promoting cultural understanding, supporting local businesses, and fostering meaningful connections.",
      languages: "Fluent in English, Arabic, and French",
      image: "../images/guide2.jpeg",
    },
    {
      name: " Luca, Adventure Seeker",
      location: "Italy",
      expertise:
        "Luca is an experienced mountaineer and outdoor enthusiast who leads sustainable trekking and adventure tours",
      activities:
        "Trekking expeditions, rock climbing, camping under the stars",
      approach:
        "Luca believes in low-impact adventure that leaves no trace and fosters a deep connection with nature",
      languages: "Fluent in English and Italian",
      image: "../images/guide3.jpeg",
    },
    {
      name: "Raj, Nature Enthusiast",
      location: "India",
      expertise:
        " Raj is a naturalist and birdwatcher who leads eco-friendly expeditions focused on wildlife conservation and ecological education.",
      activities:
        " Birdwatching tours, jungle treks, nature photography workshops.",
      approach:
        " Raj's tours aim to create a sense of wonder for the natural world while promoting responsible wildlife interactions",
      languages: "Proficient in English, Hindi, and regional languages.",
      image: "../images/guide1.jpeg",
    },
    {
      name: "Javier, Marine Conservationist",
      location: "Indonesia",
      expertise:
        "Javier is a marine biologist and conservationist who leads educational underwater expeditions that emphasize ocean conservation and sustainable diving practices.",
      activities:
        " Snorkeling and scuba diving tours, coral reef restoration workshops.",
      approach:
        " Javier's tours combine adventure with education, inspiring travelers to become ocean stewards and protect fragile marine ecosystems",
      languages: "Fluent in English and Spanish.",
      image: "../images/guide5.jpeg",
    },
    {
      name: "Leila, Wilderness Storyteller",
      location: "Bali",
      expertise:
        " Leila is a nature lover and storyteller who leads immersive wilderness experiences that connect travelers with the natural world through storytelling and mindfulness.",
      activities: "Forest walks, nature journaling, mindfulness workshops",
      approach:
        " Leila's tours encourage travelers to slow down, connect with nature on a deeper level, and cultivate a sense of awe and appreciation",
      languages: "Fluent in English and French.",
      image: "../images/guide6.jpeg",
    },
  ];

  return (
    <>
      <div className="container mx-auto text-white m-4 -2">
        <div className="flex flex-wrap justify-between items-center px-4">
          <p className="text-3xl">
            Responsible Tour Operators Around The World
          </p>
          <div>
            <button className="bg-green-600 hover:bg-green-700 rounded-lg p-2">
              Register yourself as an operator
            </button>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 justify-evenly items-center">
          {guides.map((guide, index) => {
            return (
              <div
                key={index}
                className="p-4 mx-4 bg-gray-800 rounded-lg"
                style={{ width: "25rem" }}
              >
                <img
                  className="rounded-full w-52 mx-auto"
                  src={guide.image}
                  alt={`guide${index}`}
                />
                <p className="text-xl font-semibold text-center">
                  {guide.name}
                </p>
                <p>
                  <span className="font-semibold">📍Location: </span>
                  {guide.location}
                </p>
                <p>
                  <span className="font-semibold">🚀Expertise: </span>
                  {guide.expertise}
                </p>
                <p>
                  <span className="font-semibold">🌿Activities: </span>
                  {guide.activities}
                </p>
                <p>
                  <span className="font-semibold">📜Approach: </span>
                  {guide.approach}
                </p>
                <p>
                  <span className="font-semibold">🗣️Languages: </span>
                  {guide.languages}
                </p>
                <button className="w-full font-bold rounded-lg p-2 bg-green-500 hover:bg-green-600 mt-4">
                  📞Schedule a Call
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
