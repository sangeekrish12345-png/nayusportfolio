const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('nayana-theme');
if (savedTheme === 'light') body.classList.add('light');
themeToggle.textContent = body.classList.contains('light') ? '☾' : '☼';
themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  const light = body.classList.contains('light');
  themeToggle.textContent = light ? '☾' : '☼';
  localStorage.setItem('nayana-theme', light ? 'light' : 'dark');
});

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});
navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

const modal = document.getElementById('certificateModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const openOriginal = document.getElementById('openOriginal');
let previousFocus = null;
function openCertificate(button) {
  previousFocus = document.activeElement;
  modalImage.src = button.dataset.cert;
  modalTitle.textContent = button.dataset.title || 'Certificate';
  openOriginal.href = button.dataset.cert;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('modalClose').focus();
}
function closeCertificate() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (previousFocus) previousFocus.focus();
}
document.querySelectorAll('[data-cert]').forEach(button => button.addEventListener('click', () => openCertificate(button)));
document.getElementById('modalClose').addEventListener('click', closeCertificate);
modal.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeCertificate));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal.classList.contains('is-open')) closeCertificate(); });

document.getElementById('copyEmail').addEventListener('click', async () => {
  const status = document.getElementById('copyStatus');
  try {
    await navigator.clipboard.writeText('nayanak0107@gmail.com');
    status.textContent = 'Copied!';
  } catch {
    status.textContent = 'Email: nayanak0107@gmail.com';
  }
  setTimeout(() => status.textContent = '', 2500);
});
document.getElementById('year').textContent = new Date().getFullYear();
