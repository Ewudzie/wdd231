const navBar = document.querySelector('#nav-menu');
const navButton = document.querySelector('#ham-btn');
const navLinks = document.querySelectorAll('.navigation a');

const currentPage = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach((link) => {
  const linkPage = link.getAttribute('href');
  const isCurrentPage = linkPage === currentPage;

  link.classList.toggle('active', isCurrentPage);
  link.toggleAttribute('aria-current', isCurrentPage);
});

navButton.addEventListener('click', () => {
  const isOpen = navBar.classList.toggle('show');
  navButton.classList.toggle('open', isOpen);
  navButton.setAttribute('aria-expanded', isOpen);
  navButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
