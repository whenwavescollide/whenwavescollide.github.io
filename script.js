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
