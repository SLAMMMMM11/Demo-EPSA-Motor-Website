document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const modelItems = document.querySelectorAll('.filter-item');

  if (!filterButtons.length || !modelItems.length) return;

  const filterModels = (value) => {
    modelItems.forEach((item) => {
      const visible = value === 'all' || item.classList.contains(value);
      item.classList.toggle('d-none', !visible);
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      filterModels(button.dataset.filter || 'all');
    });
  });
});
