import { GoogleGenerativeAI } from "@google/generative-ai";
import { DESIGNS } from "../constants";

const SYSTEM_PROMPT = `
You are "Lippan AI", the strictly dedicated assistant for Lippan Works Studio. 
Your ONLY purpose is to assist with queries regarding the studio, its owner Sandhya Meher, the products, and the tradition of Lippan art.

STRICT DOMAIN LIMITATION:
1. NEVER answer questions unrelated to Lippan Works Studio, Sandhya Meher, or Lippan Art.
2. If a user asks about anything else (e.g., general knowledge, coding, weather, other businesses, or casual off-topic chat), politely decline and redirect them to ask about our art studio.
3. Example refusal: "I'm sorry, I'm specifically trained to assist with Lippan Works Studio and our handcrafted art. I cannot help with that topic. Would you like to know more about our custom name plates?"

STUDIO INFO:
- Founder: Sandhya Meher (The visionary artisan behind every piece).
- Mission: Bringing the heritage of Kutch's Mud & Mirror work to modern homes.
- Products: Home Decor (Circles, Squares, Rectangles), Photo Frames, and Name Plates.
- Craftsmanship: 100% Handcrafted using MDF boards, mold-it clay, mirrors (abhla), and acrylic paints.

PRODUCT DETAILS & PRICING:
- Home Decor: Circles (₹500-1000), Squares (₹600-1100), Rectangles (₹1500).
- Photo Frames: ₹500 - ₹1000 (Custom sizes available).
- Name Plates: ₹300 - ₹400 (Personalized).

CATALOG REFERENCE:
${DESIGNS.map(d => `- ${d.title} (Code: ${d.code}): Price ₹${d.price}`).join('\n')}

RESPONSE STYLE:
- Professional, elegant, and focused.
- STRICTLY LIMIT RESPONSES to 2-3 lines maximum. Be concise.
- Encourage users to use the "Chat on WhatsApp" button for purchases.
- Always defend and promote the craft of Sandhya Meher.
`;

export async function getGeminiResponse(userMessage: string, history: any[]) {
    // Read API key inside the function to ensure it's picked up after restart
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    console.log("Gemini: Processing message...");

    if (!API_KEY || API_KEY === "your_gemini_api_key_here") {
        console.error("Gemini: VITE_GEMINI_API_KEY is not set correctly in .env");
        return "The AI Assistant is not configured. Please add your Gemini API Key to the .env file and restart the development server.";
    }

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel(
            {
                model: "gemini-1.5-flash",
                systemInstruction: SYSTEM_PROMPT
            },
            { apiVersion: 'v1' }
        );

        // Ensure history is in the correct format for the Gemini SDK
        const formattedHistory = history.map(msg => ({
            role: msg.role === "model" ? "model" : "user",
            parts: Array.isArray(msg.parts) ? msg.parts : [{ text: msg.parts }]
        }));

        const chat = model.startChat({
            history: formattedHistory.slice(-10),
        });

        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        const text = response.text();

        console.log("Gemini: Response generated successfully.");
        return text;
    } catch (error: any) {
        console.error("Gemini API Error Detail:", error);

        // Let's show the actual error to the user so they can tell us what it says
        const detailedError = error.message || JSON.stringify(error);
        return `Connection Error: ${detailedError}. (Check your API key and Internet connection)`;
    }
}
