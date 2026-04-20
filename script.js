/* =========================================================
   STATE
   ========================================================= */
const state = {
  lang: localStorage.getItem('cv-lang') || 'es',
  theme: localStorage.getItem('cv-theme') || 'dark'
};

/* =========================================================
   LANGUAGE SWITCHER
   ========================================================= */
function applyLang(lang) {
  const nodes = document.querySelectorAll('[data-es][data-en]');
  document.querySelectorAll('.fade-switch').forEach(el => el.classList.add('switching'));

  setTimeout(() => {
    nodes.forEach(n => {
      const txt = n.getAttribute('data-' + lang);
      if (txt !== null) n.textContent = txt;
    });
    document.documentElement.lang = lang;
    document.title = lang === 'es'
      ? 'Alejandro Michelis — Senior Web Designer · Full Stack Dev · UX/UI'
      : 'Alejandro Michelis — Senior Web Designer · Full Stack Dev · UX/UI';
    document.querySelectorAll('[data-lang-btn]').forEach(el => {
      el.classList.toggle('on', el.dataset.langBtn === lang);
    });
    localStorage.setItem('cv-lang', lang);
    state.lang = lang;
    document.querySelectorAll('.fade-switch').forEach(el => el.classList.remove('switching'));
  }, 160);
}

document.getElementById('langToggle').addEventListener('click', () => {
  applyLang(state.lang === 'es' ? 'en' : 'es');
});

/* =========================================================
   THEME SWITCHER
   ========================================================= */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('iconSun').style.display = theme === 'dark' ? 'none' : 'block';
  document.getElementById('iconMoon').style.display = theme === 'dark' ? 'block' : 'none';
  localStorage.setItem('cv-theme', theme);
  state.theme = theme;
}

document.getElementById('themeToggle').addEventListener('click', () => {
  applyTheme(state.theme === 'dark' ? 'light' : 'dark');
});

/* =========================================================
   PRINT / PDF
   ========================================================= */
document.getElementById('printBtn').addEventListener('click', () => {
  window.print();
});

/* =========================================================
   SCROLL REVEAL
   ========================================================= */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.section').forEach(s => io.observe(s));

/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.key === 'l' || e.key === 'L') document.getElementById('langToggle').click();
  if (e.key === 't' || e.key === 'T') document.getElementById('themeToggle').click();
  if (e.key === 'p' || e.key === 'P') { e.preventDefault(); document.getElementById('printBtn').click(); }
});

/* =========================================================
   INIT
   ========================================================= */
applyLang(state.lang);
applyTheme(state.theme);

/* Make hero sections visible immediately */
document.querySelectorAll('.hero .section').forEach(s => s.classList.add('visible'));