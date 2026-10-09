// Sortie de Carnyx : 23 octobre 2026 à minuit, heure de Paris.
const RELEASE_AT = new Date('2026-10-23T00:00:00+02:00');
const parts = ['days','hours','minutes','seconds'];
const pad = value => String(value).padStart(2,'0');
function updateCountdown(){
  const remaining=Math.max(0,RELEASE_AT.getTime()-Date.now());
  const seconds=Math.floor(remaining/1000);
  const values={days:Math.floor(seconds/86400),hours:Math.floor(seconds%86400/3600),minutes:Math.floor(seconds%3600/60),seconds:seconds%60};
  for(const part of parts)document.getElementById(part).textContent=pad(values[part]);
  if(remaining===0)document.getElementById('date-note').textContent='LE NOUVEAU SINGLE EST DISPONIBLE';
}
updateCountdown();setInterval(updateCountdown,1000);


// Flux de lettres aléatoires. « CARNYX » s'y glisse parfois, sans pause ni effet distinctif.
const signal = document.getElementById('signal-word');
const singleName = 'CARNYX';
const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let nextRevealAt = Date.now() + randomGap();
function randomGap() { return 10000 + Math.random() * 14000; }
function animateSignal() {
  const now = Date.now();
  if (now >= nextRevealAt) {
    signal.textContent = singleName;
    nextRevealAt = now + randomGap();
    return;
  }
  signal.textContent = Array.from(singleName, () => glyphs[Math.floor(Math.random() * glyphs.length)]).join('');
}
animateSignal();
setInterval(animateSignal, 180);

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  siteNav.classList.toggle('open', !expanded);
});
siteNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  siteNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));


