import Groq from "groq-sdk";
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
- Craftsmanship: 100% Handcrafted using MDF boards, mold-it-clay, mirrors (abhla), and acrylic paints.

PRODUCT DETAILS & PRICING:
- Home Decor: Circles (₹500-1000), Squares (₹600-1100), Rectangles (₹1500).
- Photo Frames: ₹500 - ₹1000 (Custom sizes available).
- Name Plates: ₹300 - ₹400 (Personalized).

CATALOG REFERENCE:
${DESIGNS.map(d => `- ${d.title} (Code: ${d.code}): Price ₹${d.price}`).join('\n')}

RESPONSE STYLE:
- Professional, elegant, and focused.
- Encourage users to use the "Chat on WhatsApp" button for purchases.
- Always defend and promote the craft of Sandhya Meher.
`;

export async function getAIResponse(userMessage: string, history: any[]) {
    const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

    if (!API_KEY || API_KEY === "your_groq_api_key_here") {
        return "The Groq AI Assistant is not configured. Please add your VITE_GROQ_API_KEY to the .env file.";
    }

    try {
        const groq = new Groq({
            apiKey: API_KEY,
            dangerouslyAllowBrowser: true // Needed for client-side Groq usage
        });

        const messages = [
            { role: "system", content: SYSTEM_PROMPT },
            ...history.map(msg => ({
                role: msg.role === "model" ? "assistant" : "user",
                content: msg.parts[0].text
            })),
            { role: "user", content: userMessage }
        ];

        const chatCompletion = await groq.chat.completions.create({
            messages: messages as any,
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 1,
            stream: false
        });

        return chatCompletion.choices[0]?.message?.content || "I couldn't generate a response.";
    } catch (error: any) {
        console.error("Groq API Error:", error);
        return `AI Error: ${error.message || "Unknown error"}. Please check your Groq API key.`;
    }
}
