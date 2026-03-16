// Powered by Google Gemini API
// ============================================================
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * @typedef {Object} UserLearningData
 * @property {string} name
 * @property {string} career_interest
 * @property {string[]} skills
 * @property {number} readiness_score
 * @property {string} branch
 * @property {number} year
 */

// ============================================================
// SYSTEM PROMPT - Defines the AI's personality & capabilities
// ============================================================
export function buildSystemPrompt(userData) {
  const skillsSummary = userData.skills?.join(", ") || "No skills selected yet";
  
  // YouTube Insights from Extension
  let youtubeContext = "No recent YouTube learning data.";
  if (userData.youtubeInsights && userData.youtubeInsights.length > 0) {
    youtubeContext = userData.youtubeInsights.map(vid => 
      `- Watched "${vid.title}" (${vid.channel}). Quality: ${vid.rating}/5, Relevance: ${vid.relevance}% - Summary: ${vid.summary}`
    ).join("\n");
  }

  return `You are T7 SKILL_BOT, a friendly AI career mentor integrated into the T7skillup placement readiness platform.

== USER PROFILE ==
Name: ${userData.name}
Target Career: ${userData.career_interest || "Not specified"}
Academic Background: ${userData.year ? userData.year + " Year " : ""}${userData.branch || ""}
Skills: ${skillsSummary}
Current Readiness Score: ${userData.readiness_score || 0}%

== RECENT YOUTUBE LEARNING (Synced from T7 Extension) ==
${youtubeContext}

== YOUR CAPABILITIES ==
1. PLACEMENT READINESS: Analyze and explain the user's readiness for their target role.
2. SKILL GAP: Compare user skills to ${userData.career_interest || "industry"} requirements and identify missing skills.
3. RECOMMENDATIONS: Suggest high-quality learning resources (YouTube, Coursera, etc.) to bridge gaps. Mention the YouTube videos the user has already watched if relevant.
4. DOUBT SOLVING: Answer technical questions based on both platform knowledge and the specific YouTube videos the user has synced.
5. CAREER ADVICE: Suggest intermediate jobs or roles the user qualifies for NOW based on their skills.

== BEHAVIOR RULES ==
- Always be encouraging, concise, and actionable.
- Use emojis sparingly to keep tone friendly.
- When recommending resources, be specific about why it helps.
- If the user has recently synced YouTube videos, acknowledge them if they are relevant to the conversation.
- If the user asks something unrelated to learning or career, gently redirect them.
- Keep responses focused — don't dump everything at once. Ask follow-up questions.

Respond in clean, readable text. Use bullet points and short paragraphs. Never use markdown headers like ## or **.`;
}

// ============================================================
// GEMINI API CALL (Using direct Fetch to match working Extension)
// ============================================================
export async function callGemini(apiKey, messages, systemPrompt) {
  if (!apiKey || apiKey.trim() === "") {
    console.error("DEBUG: API Key is missing!");
    throw new Error("Gemini API Key is missing. Please check your .env file.");
  }

  const maskedKey = apiKey.substring(0, 6) + "..." + apiKey.substring(apiKey.length - 4);
  console.log(`DEBUG: Chatbot calling Gemini via Fetch with key: ${maskedKey}`);

  const recentMessages = messages.slice(-5);
  const lastUserMessage = recentMessages[recentMessages.length - 1].content;
  
  const conversationContext = recentMessages.slice(0, -1).map(m => 
    `${m.role === 'assistant' ? 'AI' : 'User'}: ${m.content}`
  ).join("\n");

  const prompt = conversationContext 
    ? `Recent Conversation:\n${conversationContext}\n\nUser: ${lastUserMessage}`
    : lastUserMessage;

  // Models in priority order - Using VERIFIED IDs from the user's API key list
  const targetModels = [
    { name: "gemini-2.5-flash", version: "v1beta" },
    { name: "gemini-2.0-flash", version: "v1beta" },
    { name: "gemini-flash-latest", version: "v1beta" },
    { name: "gemini-pro-latest", version: "v1beta" },
    { name: "gemini-3.1-flash-lite-preview", version: "v1beta" },
    { name: "gemini-2.5-flash-lite", version: "v1beta" },
    { name: "gemini-2.5-pro", version: "v1beta" }
  ];

  let lastError = null;

  for (const model of targetModels) {
    try {
      console.log(`DEBUG: Attempting ${model.name} (${model.version}) via REST...`);
      
      const body = {
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
      };
      
      if (systemPrompt) {
        body.system_instruction = { parts: [{ text: systemPrompt }] };
      }

      let res = await fetch(
        `https://generativelanguage.googleapis.com/${model.version}/models/${model.name}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }
      );

      if (!res.ok) {
        let errData = await res.json().catch(() => ({}));
        
        // If system_instruction is the problem, try without it
        if (errData?.error?.message?.toLowerCase().includes("system_instruction") || res.status === 400) {
           console.warn(`DEBUG: Model ${model.name} rejects system_instruction, retrying without it...`);
           const retryPrompt = `${systemPrompt}\n\n${prompt}`;
           const retryBody = {
             contents: [{ role: 'user', parts: [{ text: retryPrompt }] }],
             generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
           };
           const retryRes = await fetch(
             `https://generativelanguage.googleapis.com/${model.version}/models/${model.name}:generateContent?key=${apiKey}`,
             { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(retryBody) }
           );
           
           if (retryRes.ok) {
             const retryData = await retryRes.json();
             return retryData.candidates?.[0]?.content?.parts?.[0]?.text || '';
           } else {
             errData = await retryRes.json().catch(() => ({}));
           }
        }
        
        throw new Error(errData?.error?.message || `API error ${res.status}`);
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      if (text) {
        console.log(`DEBUG: Success with ${model.name}!`);
        return text;
      }
    } catch (e) {
      console.warn(`DEBUG: ${model.name} failed:`, e.message);
      lastError = e;
      
      if (e.message?.includes('API key not valid') || e.message?.includes('PERMISSION_DENIED')) {
         throw new Error("Invalid API Key. Please verify your .env file.");
      }
      
      if (e.message?.includes('quota') || e.message?.includes('429')) {
         console.error(`DEBUG: model ${model.name} quota exceeded.`);
      }
    }
  }

  throw lastError || new Error("All AI models are busy. Please try again in 1 minute.");
}

// ============================================================
// INTENT DETECTION
// ============================================================
export function detectIntent(message) {
  const lower = message.toLowerCase();
  if (lower.match(/progress|ready|score|how.*going/)) return "progress";
  if (lower.match(/missing|gap|need|lack|require|job.*need/)) return "skill_gap";
  if (lower.match(/recommend|suggest|resource|course|learn|tutorial|where.*learn/)) return "recommendation";
  if (lower.match(/what is|explain|how does|define|tell me about|example/)) return "doubt";
  return "general";
}

// ============================================================
// QUICK REPLIES
// ============================================================
export function getQuickReplies(intent) {
  const replies = {
    progress: ["Show my skill gaps", "Which course should I take?", "How to improve my score?"],
    skill_gap: ["Recommend resources", "Show my readiness score", "What jobs can I apply to?"],
    recommendation: ["Suggest another resource", "Check my skill gaps", "How ready am I?"],
    doubt: ["Recommend a course on this", "Check my readiness", "What's my next step?"],
    general: ["Show my progress", "Check skill gaps", "What should I learn next?"],
  };
  return replies[intent] || replies.general;
}
