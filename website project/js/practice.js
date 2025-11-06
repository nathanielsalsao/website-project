function calculateResult() {
  const answers = document.querySelectorAll('input[type="radio"]:checked');
  if (answers.length < 8) {
    alert("Please answer all questions before submitting.");
    return;
  }

  const results = {};
  answers.forEach(a => {
    results[a.value] = (results[a.value] || 0) + 1;
  });

  let topCareer = Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b);

  const descriptions = {
    "Web Developer": "You enjoy building interactive and creative websites.",
    "UI/UX Designer": "You love designing beautiful, user-friendly interfaces.",
    "AI/ML Engineer": "You’re fascinated by data, patterns, and smart systems.",
    "Cybersecurity Specialist": "You value safety, protection, and secure systems.",
    "Software Engineer": "You enjoy coding logical and efficient software.",
    "Full-Stack Developer": "You’re skilled in both front-end and back-end tech.",
    "Mobile App Developer": "You like creating interactive and portable apps.",
    "Cloud Engineer": "You manage cloud systems and ensure scalable solutions.",
    "DevOps Engineer": "You bridge development and operations for efficiency.",
    "Data Scientist": "You love data, insights, and statistical problem-solving."
  };

  const resultEl = document.getElementById("result");
  resultEl.innerHTML = `<strong>${topCareer}</strong><br>${descriptions[topCareer]}`;
  resultEl.classList.add("show");

  document.querySelector(".btn").style.display = "none";
  document.getElementById("retryBtn").style.display = "block";
}

function retryQuiz() {
  document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
  document.getElementById("result").classList.remove("show");
  document.getElementById("result").innerHTML = "";
  document.getElementById("retryBtn").style.display = "none";

  const submitBtn = document.querySelector(".btn");
  submitBtn.style.display = "block"; 
  document.getElementById("progressBar").style.width = "0%";
}
const totalQuestions = document.querySelectorAll('.quiz-form p').length;
const progressBar = document.querySelector('.progress-bar');
const retryBtn = document.querySelector('.retry');
const submitBtn = document.querySelector('.btn');
const resultDiv = document.getElementById('result');


document.querySelectorAll('.quiz-form input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const answered = document.querySelectorAll('.quiz-form input[type="radio"]:checked').length;
    const progress = (answered / totalQuestions) * 100;
    progressBar.style.width = `${progress}%`;
  });
});


submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  submitBtn.style.display = 'none';
  retryBtn.style.display = 'block';
  retryBtn.style.margin = '2.5rem auto 0'; 
});


retryBtn.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelectorAll('.quiz-form input[type="radio"]').forEach(r => r.checked = false);
  progressBar.style.width = '0%';
  retryBtn.style.display = 'none';
  submitBtn.style.display = 'block';
  resultDiv.classList.remove('show'); 
});
