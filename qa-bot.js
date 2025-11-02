// ✅ Simple reference text for context
const referenceText = `
    My name is Subrat Prasad Nayak.
    I am a Software Test Engineer with 3+ years of experience in Manual and Automation Testing.
    I live in Bangalore, India. Hometown: Bhadrak, Odisha.
    Contact: 6371773304, Email: nayaksubrat030247@gmail.com, Birthday: February 16, 2000
    Education: B.Tech in Computer Science, Balasore College Of Engineering and Technology
    Skills: Manual Testing, Automation Testing, Selenium WebDriver, SDLC, STLC, Agile
    Experience: Tata Consultancy Services (TCS)(2022 - 2025), Vission India Pvt. Ltd. (2021 - 2022)
    Languages: English, Hindi, Odia
    Hobby: Cricket
    LinkedIn: https://www.linkedin.com/in/subrat-nayak-2b9983370/
    GitHub: https://github.com/SubratN2000
  `;

const API_KEY = "AIzaSyDbsbuf3nHO-tBjeb9YAs2lH3rvU5rH8lA";
const MODEL = "gemini-2.5-flash-lite";

async function askGemini(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    const body = {
        contents: [
            {
                parts: [
                    {
                        text: `
              You are acting as Subrat Prasad Nayak, a Software Test Engineer.
              Answer the question as if you (Subrat) are replying personally, based only on the context below.
              Use proper HTML formatting especially <ul> and <li> tags for bullet points — instead of asterisks (*) and (like <b>, <i>, <br>, <p>, <a>) for better display.
              Be concise but natural, like a human reply.

              Context:
              ${referenceText}

              Question: ${prompt}
            `
                    }
                ]
            }
        ]
    };

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`HTTP ${res.status}: ${errText}`);
        }

        const data = await res.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "<p>I’m not sure about that.</p>";
    } catch (err) {
        return `<p style="color:red;">Error contacting Gemini: ${err.message}</p>`;
    }
}

// ✅ Load available voices
let availableVoices = [];
let voicesReady = false;

function initVoices() {
  return new Promise((resolve) => {
    const load = () => {
      availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        voicesReady = true;
        resolve(availableVoices);
      } else {
        setTimeout(load, 100);
      }
    };
    load();
  });
}

// ✅ Text-to-Speech Function
async function speakText(text) {
  window.speechSynthesis.cancel();
  if (!voicesReady) await initVoices();
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text.replace(/<[^>]+>/g, "");
  utterance.lang = "en-IN";

  // 🎯 Adjust tone & speed
  utterance.rate = 1.0; 
  utterance.pitch = 0.85; 
  utterance.volume = 1.0;

  // 🎤 Try to pick a male voice
  const voices = window.speechSynthesis.getVoices();
  const maleVoice =
    voices.find(v => /male/i.test(v.name)) ||
    voices.find(v => /David|Google UK English Male|Alex|Daniel/i.test(v.name)) ||
    voices[0];

  if (maleVoice) utterance.voice = maleVoice;

  window.speechSynthesis.speak(utterance);
}



// ✅ DOM elements
const input = document.querySelector('[data-form-input]');
const button = document.querySelector('[data-form-btn]');
const output = document.getElementById('answerOutput');

// Enable button when input is not empty
input.addEventListener('input', () => {
    button.disabled = input.value.trim().length === 0;
});

// Handle ask button click
button.addEventListener('click', async (e) => {
    e.preventDefault();

    const query = input.value.trim();
    if (!query) return;

    output.innerHTML = `<div class="typing-text">🤖 Thinking...</div>`;
    const answer = await askGemini(query);
    output.innerHTML = `<div class="typing-text">${answer}</div>`;
    console.log("Answer:", answer);

    speakText(answer);

    input.value = '';
    button.disabled = true;
});

// Enter key triggers the same handler
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        button.click();
    }
});