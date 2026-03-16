// T7 Background Service Worker

chrome.runtime.onInstalled.addListener(() => {
  console.log('T7 installed');
});

// Handle messages from popup and content scripts
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'GEMINI_REQUEST') {
    callGemini(msg.payload).then(sendResponse).catch(e => sendResponse({ error: e.message }));
    return true; // keep channel open for async
  }
  if (msg.type === 'GET_TRANSCRIPT') {
    getYouTubeTranscript(msg.videoId).then(sendResponse).catch(e => sendResponse({ error: e.message }));
    return true;
  }
});

async function callGemini({ prompt, key, systemPrompt }) {
  const models = [
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-pro-latest'
  ];

  let lastError;

  for (const model of models) {
    try {
      console.log(`Background: Attempting ${model}...`);
      const body = {
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
      };
      if (systemPrompt) {
        body.system_instruction = { parts: [{ text: systemPrompt }] };
      }

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `API error ${res.status}`);
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      if (text) {
        console.log(`Background: Success with ${model}`);
        return { text };
      }
    } catch (e) {
      console.warn(`Background: ${model} failed`, e.message);
      lastError = e;
      if (e.message?.includes('API key not valid') || e.message?.includes('PERMISSION_DENIED')) {
         throw e;
      }
    }
  }

  throw lastError || new Error('All models failed');
}

async function getYouTubeTranscript(videoId) {
  // Fetch timedtext from YouTube
  try {
    const listUrl = `https://www.youtube.com/api/timedtext?type=list&v=${videoId}`;
    const listRes = await fetch(listUrl);
    const listText = await listRes.text();
    // Parse available transcript languages
    const langMatch = listText.match(/lang_code="([^"]+)"/);
    const lang = langMatch ? langMatch[1] : 'en';
    const transcriptUrl = `https://www.youtube.com/api/timedtext?lang=${lang}&v=${videoId}&fmt=json3`;
    const tRes = await fetch(transcriptUrl);
    const tData = await tRes.json();
    if (tData.events) {
      const segments = tData.events
        .filter(e => e.segs)
        .map(e => ({
          start: e.tStartMs / 1000,
          text: e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim()
        }))
        .filter(s => s.text && s.text !== ' ');
      return { segments };
    }
    return { segments: [] };
  } catch (e) {
    return { segments: [] };
  }
}
