const carousel = document.getElementById('carousel');
const items = Array.from(document.querySelectorAll('.carousel-item'));
let currentIndex = 0;
const total = items.length;
const radius = 250;

function loopIndex(index) {
  return (index + total) % total;
}

function updateCarousel() {
  const angleStep = 360 / total;
  items.forEach((item, index) => {
    const diff = loopIndex(index - currentIndex);
    let angle = diff * angleStep;
    const rad = angle * Math.PI / 180;

    const x = radius * Math.sin(rad);
    const z = radius * Math.cos(rad);

    let scale = 0.6;
    let opacity = 0.3;
    if (diff === 0) {
      scale = 1.2;
      opacity = 1;
    } else if (diff === 1 || diff === total - 1) {
      scale = 0.9;
      opacity = 0.7;
    }

    item.style.transform = `translateX(${x}px) translateZ(${z}px) translateY(-50%) translateX(-50%) scale(${scale})`;
    item.style.zIndex = Math.round(scale * 100);
    item.style.opacity = opacity;
  });
}

function moveRight() {
  currentIndex = loopIndex(currentIndex + 1);
  updateCarousel();
}

function moveLeft() {
  currentIndex = loopIndex(currentIndex - 1);
  updateCarousel();
}


document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') moveLeft();
  if (e.key === 'ArrowRight') moveRight();
});


const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

prevBtn.addEventListener('click', moveLeft);
nextBtn.addEventListener('click', moveRight);


updateCarousel();
