const slidesData = [
  { img: 'image/SE.jpg', title: 'Software Engineer', desc: 'A Software Engineer designs, develops, and maintains software systems. They use programming skills to create efficient, reliable, and user-friendly applications that meet specific needs.' },
  { img: 'image/AE.jpg', title: 'AI/ML Engineer', desc: 'AI/ML Engineer develops systems that enable machines to learn and make decisions. They design algorithms, train models, and use data to create intelligent solutions for real-world problems.' },
  { img: 'image/DS.jpg', title: 'Data Scientist', desc: 'A Data Scientist analyzes and interprets complex data to uncover patterns, insights, and trends. They use statistics, programming, and machine learning to help guide smart business and research decisions.' },
  { img: 'image/CS.jpg', title: 'Cybersecurity Specialist', desc: 'Protects systems and networks from cyber threats, ensuring data integrity, confidentiality, and availability using advanced security measures.' },
  { img: 'image/CE.jpg', title: 'Cloud Engineer', desc: 'Designs, implements, and manages cloud infrastructure and services, ensuring scalability, security, and performance in cloud environments.' },
  { img: 'image/DE.jpg', title: 'DevOps Engineer', desc: 'Bridges development and operations teams to automate processes, monitor systems, and improve deployment cycles for software projects.' },
  { img: 'image/FE.jpg', title: 'Full-Stack Developer', desc: 'Handles both frontend and backend development, creating complete web applications that are interactive, efficient, and responsive.' },
  { img: 'image/MD.jpg', title: 'Mobile App Developer', desc: 'Develops mobile applications for Android and iOS platforms, focusing on user experience, performance, and functionality.' },
  { img: 'image/WD.jpg', title: 'Web Developer', desc: 'Builds websites and web applications, implementing design, functionality, and responsiveness using modern technologies.' },
  { img: 'image/UD.jpg', title: 'UI/UX Designer', desc: 'Designs user interfaces and experiences for digital products, ensuring they are visually appealing, intuitive, and user-friendly.' }
];

const bgColors = [
  '#778899', '#080808', '#333333', '#004040', '#ADD8E6',
  '#070606', '#202A3E', '#596780', '#506780', '#7A7D71'
];

// Select active slide elements
const imgEl = document.querySelector('.slide.active .image-container img');
const titleEl = document.querySelector('.slide.active .text-container h2');
const descEl = document.querySelector('.slide.active .text-container p');
const textContainer = document.querySelector('.slide.active .text-container');
const innerCardEl = document.querySelector('.slide.active .inner-card');
const outerCard = document.getElementById('outerCard');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let current = 0;
let autoSlide;

function showSlide(index) {
  imgEl.style.transition = 'transform 0.6s ease';
  imgEl.style.transform = 'rotateY(90deg)';

  textContainer.style.transition = 'all 0.8s ease';
  textContainer.style.transform = 'translateX(100%)';
  textContainer.style.opacity = '0';

  outerCard.style.transition = 'opacity 0.5s ease';
  innerCardEl.style.transition = 'opacity 0.5s ease';
  outerCard.style.opacity = '0';
  innerCardEl.style.opacity = '0';

  setTimeout(() => {
    imgEl.src = slidesData[index].img;
    titleEl.textContent = slidesData[index].title;
    descEl.textContent = slidesData[index].desc;

    imgEl.style.transform = 'rotateY(0deg)';
    textContainer.style.transform = 'translateX(0)';
    textContainer.style.opacity = '1';

    outerCard.style.background = `linear-gradient(145deg, ${bgColors[index]}, #0d0f12)`;
    innerCardEl.style.background = `linear-gradient(145deg, ${bgColors[index]}, #1a1a1a)`;
    innerCardEl.style.boxShadow = `0 0 25px rgba(255,255,255,0.05), inset 0 0 25px rgba(255,255,255,0.08)`;

    outerCard.style.opacity = '1';
    innerCardEl.style.opacity = '1';

    current = index;
    pauseVideoIfNotVisible();
  }, 300);
}

function nextSlide() {
  showSlide((current + 1) % slidesData.length);
  resetAutoSlide();
}

function prevSlide() {
  showSlide((current - 1 + slidesData.length) % slidesData.length);
  resetAutoSlide();
}

function startAutoSlide() {
  autoSlide = setInterval(() => showSlide((current + 1) % slidesData.length), 8000);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

startAutoSlide();

// === YouTube API Integration ===
const iframe = document.getElementById('careerVideo');
let playerReady = false;
let player = null;

// Load YouTube IFrame API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

// Define global function for YouTube API
window.onYouTubeIframeAPIReady = function() {
  player = new YT.Player('careerVideo', {
    events: {
      onReady: () => {
        playerReady = true;
      }
    }
  });
};

// Pause video when not visible
function pauseVideoIfNotVisible() {
  if (!iframe || !playerReady || !player) return;

  const rect = iframe.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const notVisible =
    rect.bottom < 0 ||
    rect.top > windowHeight ||
    rect.right < 0 ||
    rect.left > windowWidth;

  if (notVisible) {
    player.pauseVideo();
  }
}

window.addEventListener('scroll', pauseVideoIfNotVisible);
// Scroll fade in/out using IntersectionObserver
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
      entry.target.classList.remove("hidden");
    } else {
      entry.target.classList.remove("reveal");
      entry.target.classList.add("hidden");
    }
  });
}, { threshold: 0.3 }); // adjust threshold for sensitivity

sections.forEach((section) => observer.observe(section));
