/* ------- CONFIG -------- */
const AUTOPLAY_DELAY = 2000; // 2s

/* ------- INIT FOR EACH SECTION -------- */
document.querySelectorAll('.gallery').forEach(section => {
  const mainImg   = section.querySelector('#main-slide img');
  const thumbs    = Array.from(section.querySelectorAll('.thumb'));
  const strip     = section.querySelector('#thumb-strip');
  const btnPrev   = section.querySelector('#nav-prev');
  const btnNext   = section.querySelector('#nav-next');

  if (!mainImg || thumbs.length === 0) return; // Skip if invalid

  let current = 0;
  let autoplayId = startAutoplay();
  let hasUserInteracted = false;

  // Show selected slide
  function showSlide(idx) {
    current = (idx + thumbs.length) % thumbs.length;
    mainImg.src = thumbs[current].src;
    thumbs.forEach(t =>
      t.classList.toggle('active', +t.dataset.index === current)
    );
  }

  function nextSlide(step = 1) {
    showSlide(current + step);
  }

  function scrollStrip(px) {
    strip.scrollBy({ left: px, behavior: 'smooth' });
  }

  function stopAutoplay() {
    if (autoplayId) {
      clearInterval(autoplayId);
      autoplayId = null;
    }
  }

  function startAutoplay() {
    return setInterval(() => {
      if (!hasUserInteracted) nextSlide(1);
    }, AUTOPLAY_DELAY);
  }

  function userInteracted() {
    hasUserInteracted = true;
    stopAutoplay();
  }

  // Event listeners
  btnPrev?.addEventListener('click', () => {
    scrollStrip(-thumbs[0].offsetWidth * 3);
    userInteracted();
  });

  btnNext?.addEventListener('click', () => {
    scrollStrip(thumbs[0].offsetWidth * 3);
    userInteracted();
  });

  thumbs.forEach(t => {
    t.addEventListener('click', () => {
      showSlide(+t.dataset.index);
      userInteracted();
    });
  });

  strip?.addEventListener('scroll', userInteracted, { once: true });

  // Initial render
  showSlide(0);
});
