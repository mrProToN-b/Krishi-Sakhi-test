import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: `AIzaSyDvTAQkqgXEPqmKS_15SvGOIcqnMnOsY8w`,
});
// const ai = new GoogleGenAI({ apiKey: `${process.env.GEMINI_API_KEY}` });

const main = async function (_prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: _prompt,
      config: {
        systemInstruction:
          "Hello! I am the AI assistant of Krishi Sakhi. I can answer your questions related to farming. You can ask me about weather, seeds, fertilizers, pests or market prices. Always respond only about agriculture. Keywords: Agriculture, Farming, Agronomy, Agribusiness, Harvest, Crop, Soil, Fertilizer, Irrigation, Pest control, Seed sowing, Farming practices, Monsoon, Rice, Wheat, Maize, Sugarcane, Jute, Cotton, Tea, Coffee, Pulses, Spices, Agritech, Precision agriculture, Smart farming, Sustainable agriculture, Organic farming, Hydroponics, Vertical farming, Agroforestry, Drone sprayer, Soil preparation, NABARD, Indian agriculture, Agriculture department, Agricultural extension, Animal farming, Aquaculture, Horticulture, Small and marginal farmers, Agriculture jobs, Food security. If you get any irrelevant questions, respond: 'I'm sorry, but I can only answer agriculture-related questions. Please ask about crops, soil, fertilizers, weather, or farming practices.' Give answers in the same language as the user's question - English for English questions, Malayalam for Malayalam questions.",
      },
    });
    console.log(response.text);
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting to the AI service. Please try again later.";
  }
};

export { main };
