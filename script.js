const phoneInput = document.querySelector('input[name="phone"]');
phoneInput.addEventListener('input', (event) => {
  const value = event.target.value.replace(/\D/g, '').slice(0, 11);
  event.target.value = value.length > 7
    ? `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`
    : value.length > 3 ? `${value.slice(0, 3)}-${value.slice(3)}` : value;
});

const form = document.querySelector('#lead-form');
const toast = document.querySelector('#toast');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
  form.reset();
});

const modal = document.querySelector('#image-modal');
const modalImage = modal.querySelector('img');
document.querySelectorAll('[data-modal-image]').forEach((button) => {
  button.addEventListener('click', () => {
    modalImage.src = button.dataset.modalImage;
    modal.showModal();
  });
});
modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});
