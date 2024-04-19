import React, { useState, useEffect, useRef } from "react";
import MistralClient from "@mistralai/mistralai";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import { toast } from "react-hot-toast";

export default function PlannerPage() {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(2);
  const [hotels, setHotels] = useState(true);
  const [restaurants, setRestaurants] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("Any month");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const client = new MistralClient(process.env.REACT_APP_MISTRAL_API_KEY);

  const generateItinerary = async () => {
    toast("making an itinerary for you🪄✨");
    dispatch(ShowLoading());
    setIsGenerating(true);
    const basePrompt = "Write me an itinerary for";
    const addHotelsPrompt =
      "- Hotels (prefer not to change it unless traveling to another city)\n";
    const addRestaurantsPrompt =
      "- Restaurants, one for lunch and another for dinner\n";
    let prompt = `${basePrompt} ${duration} days to ${selectedPlace} in the coming ${selectedMonth} 2024. Describe the weather of that month, and also mention 5 things to take note about  ${selectedPlace}. \n\nFor each day, list me the following:\n- 5 places which are suitable to visit in the month of ${selectedMonth}\n and also mention the average price budget needed(ticket fares.. etc) with complete expenditure planning`;
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
    dispatch(HideLoading());
  };

  return (
    <div className="flex items-center landscape:h-[85vh] ">
      <div className="flex portrait:flex-col items-center justify-evenly w-[100vw]  h-full">
        <div className="flex items-center justify-evenly h-full portrait:max-w-[90vw] portrait:mx-2">
          <div className="portrait:p-2 portrait:max-w-[90vw] portrait:my-2 flex flex-col items-center border border-gray-500 rounded-lg px-10 pt-10 flex flex-col items-start justify-start ">
            <h1 className="text-white font-bold text-3xl">
              Travel Itinerary Generator ✨
            </h1>
            <div className="my-4 flex flex-col">
              <div className="w-full" style={{ zIndex: "100" }}>
                <div className="flex items-center">
                  <span className="">Where do you want to go?</span>
                </div>
                <input
                  type="text"
                  onChange={(e) => {
                    setSelectedPlace(e.target.value);
                  }}
                  placeholder="enter the location..."
                  className="prompt-box w-full"
                />
              </div>
              <div className="flex portrait:flex-wrap w-full mt-4 z-0">
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
                    <span className="ml-2">Also include</span>
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
                    className="cursor-progress mt-2 w-full font-bold text-white bg-green-600 text-black p-4 rounded-lg hover:bg-green-500"
                    disabled
                  >
                    Creating your itinerary....
                  </button>
                ) : (
                  <button
                    className="mt-2 w-full font-bold text-white bg-green-600 text-black p-4 rounded-lg hover:bg-green-500"
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
