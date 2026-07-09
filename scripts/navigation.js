const navBar = document.querySelector('#nav-menu');
const navButton = document.querySelector('#ham-btn');

navButton.addEventListener('click', () => {
  const isOpen = navBar.classList.toggle('show');
  navButton.classList.toggle('open', isOpen);
  navButton.setAttribute('aria-expanded', isOpen);
  navButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
