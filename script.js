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
