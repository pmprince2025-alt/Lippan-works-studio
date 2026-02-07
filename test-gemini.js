import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;

async function listModels() {
    if (!API_KEY) {
        console.error("VITE_GEMINI_API_KEY NOT FOUND");
        return;
    }
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const models = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Dummy to get the object
        // Wait, the SDK doesn't have a direct listModels in the client usually, it's a separate API call.
        // Actually, in the web SDK it's not exposed like that.
        console.log("Searching for working model...");
    } catch (e) {
        console.error(e);
    }
}

listModels();
