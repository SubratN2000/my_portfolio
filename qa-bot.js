const qaData = [
    {
        question: "Hi, Hii, Hello",
        answer: "This is Subrat. Kindly specify which details you require."
    },
    {
        question: "What is your name?",
        answer: "My name is Subrat Prasad Nayak."
    },
    {
        question: "What is your profession?",
        answer: "I'm a Software Test Engineer with 3+ years of experience in Manual and Automation Testing."
    },
    {
        question: "Where do you live?",
        answer: "I'm based in Bangalore, India."
    },
    {
        question: "What is your residential address or current address or home address?",
        answer: "My hometown is in Bhadrak, Odisha."
    },
    {
        question: "What is your contact or phone number?",
        answer: 'You can reach me at 6371773304. <a href="tel:+916371773304">Call me</a'
    },
    {
        question: "What is your email address?",
        answer: "My email is nayaksubrat030247@gmail.com."
    },
    {
        question: "What is your birthday?",
        answer: "I was born on February 16, 2000."
    },
    {
        question: "What are your hobbies?",
        answer: "I'm a cricket enthusiast who enjoys teamwork and strategy on the field."
    },
    {
        question: "Which languages do you know?",
        answer: "I can speak English, Hindi, and Odia."
    },
    {
        question: "Tell me about your experience.",
        answer: "I have 3+ years of experience in Manual and Automation Testing, with expertise in Smoke, Functional, Integration, System, and Regression Testing using tools like Selenium WebDriver."
    },
    {
        question: "What company are you working at?",
        answer: "I currently work at Tata Consultancy Services (TCS) since 2022."
    },
    {
        question: "What did you do at TCS?",
        answer: "At TCS, I performed manual and automation testing, created test cases, prepared traceability matrices, and automated regression scenarios using Selenium WebDriver."
    },
    {
        question: "Intership Details?",
        answer: "I interned at Vission India Pvt. Ltd. from 2021 to 2022, focusing on manual testing and learning web development basics."
    },
    {
        question: "Tell me about your education details.",
        answer: "I completed my B.Tech in Computer Science at Balasore College Of Engineering and Technology (2018–2022). I also studied at Buadrak Junior College and Kendriya Vidyalaya."
    },
    {
        question: "What did you study in college?",
        answer: "In B.Tech, I studied programming, computer architecture, operating systems, databases, and software engineering."
    },
    {
        question: "What did you study in junior college?",
        answer: "At Bhadrak Junior College (2016-2018), I studied Mathematics, Physics, and Chemistry."
    },
    {
        question: "Where did you go to school?",
        answer: "I studied at Kendriya Vidyalaya from 2006 to 2016."
    },
    {
        question: "What are your skills?",
        answer: "My skills include Manual Testing, Automation Testing, Selenium WebDriver, SDLC, STLC, Agile methodology, and strong problem-solving and collaboration."
    },
    {
        question: "What tools do you use?",
        answer: "I have used Selenium WebDriver for automation, created test cases, and worked with traceability matrices."
    },
    {
        question: "Do you have a LinkedIn profile?",
        answer: 'Yes, you can view it here <a href="https://www.linkedin.com/in/subrat-nayak-2b9983370/" target="_blank">LinkedIn Profile</a>'
    },
    {
        question: "Do you have a GitHub account?",
        answer: 'Yes, check out my <a href="https://github.com/SubratN2000" target="_blank">GitHub Profile</a>'
    },
    {
        question: "whatsapp number",
        answer: 'Message me directly on <a href="https://wa.me/+916371773304" target="_blank">WhatsApp</a>'
    }
];

// Fuse.js setup
const fuse = new Fuse(qaData, {
    keys: ['question'],
    threshold: 0.4
});

// DOM elements
const input = document.querySelector('[data-form-input]');
const button = document.querySelector('[data-form-btn]');
const output = document.getElementById('answerOutput');

// Enable button when input is not empty
input.addEventListener('input', () => {
    button.disabled = input.value.trim().length === 0;
});

// Handle ask button click
button.addEventListener('click', (e) => {
    e.preventDefault();

    const query = input.value.trim();
    if (!query) return;

    const result = fuse.search(query);

    if (result.length > 0) {
        output.innerHTML = `<div class="typing-text">${result[0].item.answer}</div>`;
    } else {
        output.textContent = "Sorry, I don't have an answer for that yet.";
    }

    input.value = '';
    button.disabled = true;
});

// ✅ Add Enter key functionality
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); // prevent form submission/reload
    button.click();     // trigger the same handler as the button
  }
});
