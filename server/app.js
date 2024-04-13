import MistralClient from "@mistralai/mistralai";
// import

const apiKey = "A76fl5FgS8vEmyujewq3TGPUdLJ7QtWF";

const client = new MistralClient(apiKey);
const fetch = async () => {
  const prompt = "hello"
    // "Write me an itinerary for 2 days to India in the coming April. Describe the weather that month, and also 5 things to take note about this country's culture. Keep to a maximum travel area to the size of Hokkaido, if possible, to minimize traveling time between cities.\n\nFor each day, list me the following:\n- Attractions suitable for that season\n- 2 Restaurants, one for lunch and another for dinner, with shortened Google Map links\nand give me a daily summary of the above points into a paragraph or two.\n";
  const chatStreamResponse = await client.chatStream({
    model: "mistral-tiny",
    messages: [{ role: "user", content: prompt }],
  });

  console.log("Chat Stream:");
  for await (const chunk of chatStreamResponse) {
    if (chunk.choices[0].delta.content !== undefined) {
      const streamText = chunk.choices[0].delta.content;
      process.stdout.write(streamText);
    }
  }
};

fetch();
