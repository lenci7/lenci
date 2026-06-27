// Evergreen 12-hour countdown ("Bewerberschluss"), resets per new visitor session
(function () {
  const DURATION = 12 * 60 * 60 * 1000;
  const STORAGE_KEY = 'lenci_apply_deadline';
  const el = document.getElementById('countdown');
  if (!el) return;

  let deadline = parseInt(sessionStorage.getItem(STORAGE_KEY), 10);
  if (!deadline || deadline < Date.now()) {
    deadline = Date.now() + DURATION;
    sessionStorage.setItem(STORAGE_KEY, deadline);
  }

  function tick() {
    const remaining = Math.max(0, deadline - Date.now());
    const hours = Math.floor(remaining / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    el.textContent = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
    if (remaining <= 0) clearInterval(timer);
  }

  tick();
  const timer = setInterval(tick, 1000);
})();

// Hero video play button
const playBtn = document.getElementById('playBtn');
const heroVideo = document.getElementById('heroVideo');
const videoOverlay = document.getElementById('videoOverlay');
if (playBtn && heroVideo) {
  playBtn.addEventListener('click', () => {
    heroVideo.setAttribute('controls', '');
    heroVideo.play();
    videoOverlay.classList.add('is-hidden');
  });
}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach((item) => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');

    document.querySelectorAll('.faq-item.is-open').forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove('is-open');
        openItem.querySelector('.faq-answer').style.maxHeight = null;
      }
    });

    item.classList.toggle('is-open', !isOpen);
    answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : null;
  });
});

// Fade-up on scroll for cards / columns
const fadeEls = document.querySelectorAll('.ticket-card, .offer-col, .testimonial-card, .diff-block, .faq-item');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('is-visible'), (i % 4) * 90);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach((el) => fadeObserver.observe(el));

// Me-section photos: unfold left/right from center
const mePhotos = document.querySelector('.me-photos');
if (mePhotos) {
  const photoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        photoObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  photoObserver.observe(mePhotos);
}
