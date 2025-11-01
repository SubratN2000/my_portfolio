  // ✅ Simple reference text for context
  const referenceText = `
    My name is Subrat Prasad Nayak.
    I am a Software Test Engineer with 3+ years of experience in Manual and Automation Testing.
    I live in Bangalore, India. Hometown: Bhadrak, Odisha.
    Contact: 6371773304, Email: nayaksubrat030247@gmail.com
    Education: B.Tech in Computer Science, Balasore College Of Engineering and Technology
    Skills: Manual Testing, Automation Testing, Selenium WebDriver, SDLC, STLC, Agile
    Languages: English, Hindi, Odia
    LinkedIn: https://www.linkedin.com/in/subrat-nayak-2b9983370/
    GitHub: https://github.com/SubratN2000
  `;

  const API_KEY = "AIzaSyDMJVmhZQPRnGF1L0qyFjESULZubbItGeM";
  const MODEL = "gemini-2.5-flash-lite";

  async function askGemini(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
    const body = {
      contents: [
        {
          parts: [
            {
              text: `
                You are an assistant. Answer the user's query based only on the following context, 
                in **one concise sentence**, plain text only. Ignore unrelated topics.
                
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
      return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "I cannot answer that.";
    } catch (err) {
      return "Error contacting Gemini: " + err.message;
    }
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

    output.textContent = "🤖 Thinking...";
    const answer = await askGemini(query);
    output.innerHTML = `<div class="typing-text">${answer}</div>`;

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