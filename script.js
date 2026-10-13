const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
// Canonicalize old internal links so they never expose index.html in the address bar.
document.querySelectorAll('a[href]').forEach(link => {
  const target = new URL(link.href, window.location.href);
  if (target.origin === window.location.origin && /\/index\.html$/i.test(target.pathname)) {
    target.pathname = target.pathname.replace(/index\.html$/i, '');
    link.href = target.href;
  }
});
toggle?.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}));
// Parallax on the homepage and the full-width backgrounds on selected pages.
const hero = document.querySelector('.hero');
const parallaxSections = Array.from(document.querySelectorAll('.concerts-stage, .videos-section, .bio-section, .contact-page'));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const compactScreen = window.matchMedia('(max-width: 620px)');
let parallaxFrame = 0;
function moveBackground(element, property) {
  if (!element) return;
  if (reducedMotion.matches) {
    element.style.removeProperty(property);
    return;
  }
  const bounds = element.getBoundingClientRect();
  const distance = Math.min(Math.max(-bounds.top, 0), bounds.height);
  const amount = property === '--hero-parallax' ? (compactScreen.matches ? 0.18 : 0.35) : (compactScreen.matches ? 0.08 : 0.12);
  element.style.setProperty(property, (distance * amount).toFixed(2) + 'px');
}
function renderParallax() {
  parallaxFrame = 0;
  moveBackground(hero, '--hero-parallax');
  parallaxSections.forEach(section => moveBackground(section, '--section-parallax'));
}
function scheduleParallax() {
  if (!parallaxFrame) parallaxFrame = requestAnimationFrame(renderParallax);
}
window.addEventListener('scroll', scheduleParallax, { passive: true });
window.addEventListener('resize', scheduleParallax);
reducedMotion.addEventListener('change', scheduleParallax);
renderParallax();


// Preserve links that previously pointed to sections of the one-page site.
const oldSections={music:'music/',concerts:'live/',videos:'videos/',bio:'about/',contact:'contact/'};
if(hero && oldSections[location.hash.slice(1)]) location.replace(oldSections[location.hash.slice(1)]);
nav?.addEventListener('keydown', event => {
  if(event.key === 'Escape') {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.focus();
  }
});
