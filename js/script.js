particlesJS('particles-js', {
  particles: {
    number: { value: 70, density: { enable: true, value_area: 900 } },
    color: { value: '#d9a95c' },
    shape: { type: 'circle' },
    opacity: {
      value: 0.4,
      random: true,
      anim: { enable: true, speed: 0.4, opacity_min: 0.1, sync: false }
    },
    size: { value: 2, random: true },
    line_linked: {
      enable: true,
      distance: 140,
      color: '#d9a95c',
      opacity: 0.12,
      width: 1
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'grab' },
      onclick: { enable: false },
      resize: true
    },
    modes: {
      grab: { distance: 160, line_linked: { opacity: 0.25 } }
    }
  },
  retina_detect: true
});

const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('is-visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

cards.forEach((card) => observer.observe(card));
