// hero.js
function initHeroSlider() {
  // ---------------- Select Elements ----------------
  const slides = document.querySelectorAll('.hero-slider .slide');
  const prevArrow = document.getElementById('prevArrow');
  const nextArrow = document.getElementById('nextArrow');
  const currentSlideEl = document.getElementById('currentSlide');
  const totalSlidesEl = document.getElementById('totalSlides');
  const progressBar = document.querySelector('.slide-progress .progress-bar');
  const autoplayToggle = document.getElementById('autoplayToggle');

  // ---------------- Variables ----------------
  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoplay = true;
  const intervalTime = 4000; // 4 seconds
  let slideInterval;

  if (!slides.length) return; // safety check

  // ---------------- Initialize ----------------
  totalSlidesEl.textContent = totalSlides;
  showSlide(currentSlide);
  startAutoplay();

  // ---------------- Functions ----------------
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    currentSlideEl.textContent = index + 1;
    resetProgressBar();
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  // ---------------- Progress Bar ----------------
  function resetProgressBar() {
    if (!progressBar) return;
    progressBar.style.transition = 'none';
    progressBar.style.width = '0';
    setTimeout(() => {
      progressBar.style.transition = `width ${intervalTime}ms linear`;
      progressBar.style.width = '100%';
    }, 50);
  }

  // ---------------- Autoplay ----------------
  function startAutoplay() {
    slideInterval = setInterval(() => {
      if (autoplay) nextSlide();
    }, intervalTime);
  }

  function toggleAutoplay() {
    autoplay = !autoplay;
    if (autoplayToggle) {
      autoplayToggle.classList.toggle('fa-pause', autoplay);
      autoplayToggle.classList.toggle('fa-play', !autoplay);
    }
  }

  function resetAutoplay() {
    clearInterval(slideInterval);
    startAutoplay();
  }

  // ---------------- Event Listeners ----------------
  if (nextArrow) nextArrow.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
  if (prevArrow) prevArrow.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
  if (autoplayToggle) autoplayToggle.addEventListener('click', toggleAutoplay);

  // ---------------- Responsive touch swipe ----------------
  let touchStartX = 0;
  let touchEndX = 0;

  const sliderContainer = document.querySelector('.hero-slider');
  if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
    sliderContainer.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextSlide(); // swipe left
    if (touchEndX > touchStartX + 50) prevSlide(); // swipe right
  }
}
