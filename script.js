const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
toggle?.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}));
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('#site-nav a')];
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) links.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
}), { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => observer.observe(section));

// Move only the photograph; text, video and controls keep native scrolling.
const hero = document.querySelector('.hero');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const compactScreen = window.matchMedia('(max-width: 620px)');
let parallaxFrame = 0;
function renderParallax() {
  parallaxFrame = 0;
  if (!hero) return;
  if (reducedMotion.matches) {
    hero.style.removeProperty('--hero-parallax');
    return;
  }
  const bounds = hero.getBoundingClientRect();
  const distance = Math.min(Math.max(-bounds.top, 0), bounds.height);
  hero.style.setProperty('--hero-parallax', (distance * (compactScreen.matches ? 0.18 : 0.35)).toFixed(2) + 'px');
}
function scheduleParallax() {
  if (!parallaxFrame) parallaxFrame = requestAnimationFrame(renderParallax);
}
window.addEventListener('scroll', scheduleParallax, { passive: true });
window.addEventListener('resize', scheduleParallax);
reducedMotion.addEventListener('change', scheduleParallax);
renderParallax();

