import React, { useState } from "react";
import MistralClient from "@mistralai/mistralai";

export default function PlannerPage() {
  const [duration, setDuration] = useState(2);
  const [hotels, setHotels] = useState(true);
  const [restaurants, setRestaurants] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("Any month");
  const countryList = ["india", "chaina"];
  const months = ["april", "may"];
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const client = new MistralClient(process.env.REACT_APP_MISTRAL_API_KEY);

  const generateItinerary = async () => {
    setIsGenerating(true);
    const basePrompt = "Write me an itinerary for";
    const addHotelsPrompt =
      "- Hotels (prefer not to change it unless traveling to another city)\n";
    const addRestaurantsPrompt =
      "- Restaurants, one for lunch and another for dinner, with shortened Google Map links\n";

    let prompt = `${basePrompt} ${duration} days to ${selectedCountry} in the coming ${selectedMonth}. Describe the weather of that month, and also 5 things to take note about this country's culture. \n\nFor each day, list me the following:\n- places that are suitable for that season\n`;
    if (hotels) prompt += addHotelsPrompt;
    if (restaurants) prompt += addRestaurantsPrompt;
    prompt +=
      "and give me a daily summary of the above points into a paragraph or two.\n";

    try {
      const chatStreamResponse = await client.chat({
        model: "mistral-tiny",
        messages: [{ role: "user", content: prompt }],
      });
      setApiOutput(chatStreamResponse.choices[0].message.content);
    } catch (error) {
      console.error("Error generating itinerary:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex items-center landscape:h-[85vh]">
      <div className="flex portrait:flex-col items-center justify-evenly w-[100vw] h-full">
        <div className="flex items-center h-full">
          <div className="portrait:p-2 portrait:my-2 flex flex-col items-center border border-gray-500 rounded-lg px-10 pt-10 flex flex-col items-start justify-start">
            <h1 className="text-white font-bold text-3xl">
              Travel Itinerary Generator ✨
            </h1>
            <div className="my-4 flex flex-col">
              <div className="flex items-center">
                <span className="">Where do you want to go?</span>
              </div>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="prompt-box mt-2"
              >
                <option className="text-black" value="">
                  Select a country
                </option>
                {countryList.map((country) => (
                  <option className="text-black" key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <div className="flex w-100 mt-4">
                <div
                  className="flex-none mr-6 flex-col items-start"
                  style={{ display: "flex", width: "180px" }}
                >
                  <div className="flex items-center mb-2">
                    <span className="ml-2">How many days?</span>
                  </div>
                  <input
                    type="number"
                    className="rounded block inp-num"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    style={{ width: "180px" }}
                  />
                </div>
                <div className="ml-4">
                  <div className="flex items-center mb-2">
                    <span className="ml-2">Month</span>
                  </div>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="prompt-box text-black"
                  >
                    <option className="text-black" value="">
                      Select a month
                    </option>
                    {months.map((m) => (
                      <option className="text-black" key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="ml-2">Recommendations?</span>
                  </div>
                  <div>
                    <label className="inline-flex items-center mr-8">
                      <input
                        type="checkbox"
                        className="rounded checked:bg-blue-500"
                        value={restaurants}
                        checked={restaurants}
                        onChange={(e) => setRestaurants(e.target.checked)}
                      />
                      <span className="ml-2">🍔 Restaurants</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="rounded checked:bg-blue-500"
                        value={hotels}
                        onChange={(e) => setHotels(e.target.checked)}
                        checked={hotels}
                      />
                      <span className="ml-2">🏨 Hotels</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="py-5">
                {isGenerating ? (
                  <button
                    className="cursor-progress mt-2 w-full font-bold text-white bg-green-400 text-black p-4 rounded-lg hover:bg-green-500"
                    disabled
                  >
                    Creating your itinerary....
                  </button>
                ) : (
                  <button
                    className="mt-2 w-full font-bold text-white bg-green-400 text-black p-4 rounded-lg hover:bg-green-500"
                    onClick={generateItinerary}
                  >
                    Generate
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {apiOutput ? (
          <>
            <div className="gap-4 p-10 portrait:pb-20 portrait:overflow-hidden lanscape:max-h-[85vh] overflow-auto landscape:h-[82vh]">
              <div className="">
                <h3 className="text-4xl text-white font-bold mb-4">
                  Your Itinerary
                </h3>
                <div>
                  {apiOutput ? (
                    <div
                      className=""
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {apiOutput}
                    </div>
                  ) : (
                    <p>No itinerary generated yet.</p>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
