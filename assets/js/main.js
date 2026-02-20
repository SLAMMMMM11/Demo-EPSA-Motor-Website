(() => {
  const scrollButton = document.querySelector('.scroll-up');

  if (!scrollButton) return;

  const toggleScrollButton = () => {
    scrollButton.style.display = window.scrollY > 280 ? 'grid' : 'none';
  };

  window.addEventListener('scroll', toggleScrollButton);
  toggleScrollButton();
})();
