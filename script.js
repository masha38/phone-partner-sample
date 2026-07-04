import { analytics, ctaStates, formContract } from './landing.config.js';

const form = document.querySelector('#lead-form');
const phoneInput = form.querySelector('[name="phone"]');
const nameInput = form.querySelector('[name="name"]');
const consentInput = form.querySelector('#privacy-consent');
const submitButton = form.querySelector('button[type="submit"]');
const formStatus = form.querySelector('#form-status');
const stickyCTA = document.querySelector('[data-sticky-cta]');
const kakaoBanner = document.querySelector('[data-kakao-consult]');

phoneInput.addEventListener('input', (event) => {
  const value = event.target.value.replace(/\D/g, '').slice(0, 11);
  event.target.value = value.length > 7
    ? `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`
    : value.length > 3 ? `${value.slice(0, 3)}-${value.slice(3)}` : value;
});

function setError(input, errorId, message) {
  const error = document.querySelector(`#${errorId}`);
  error.textContent = message;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validateForm() {
  const errors = {
    name: nameInput.value.trim() ? '' : formContract.messages.name,
    phone: formContract.phonePattern.test(phoneInput.value) ? '' : formContract.messages.phone,
    consent: consentInput.checked ? '' : formContract.messages.consent,
  };
  setError(nameInput, 'name-error', errors.name);
  setError(phoneInput, 'phone-error', errors.phone);
  setError(consentInput, 'consent-error', errors.consent);
  const firstInvalid = [nameInput, phoneInput, consentInput].find((input) => input.getAttribute('aria-invalid') === 'true');
  if (firstInvalid) firstInvalid.focus();
  return !Object.values(errors).some(Boolean);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validateForm()) return;
  submitButton.disabled = true;
  formStatus.textContent = formContract.messages.integration;
  formStatus.classList.add('is-warning');
  analytics.track('lead_form_submit_blocked_demo');
  window.setTimeout(() => { submitButton.disabled = false; }, 800);
});

kakaoBanner.addEventListener('click', () => {
  const kakaoMethod = form.querySelector('[name="contact_method"][value="kakao"]');
  kakaoMethod.checked = true;
  analytics.track('kakao_consultation_click');
});

const modal = document.querySelector('#image-modal');
const modalImage = modal.querySelector('img');
document.querySelectorAll('[data-modal-image]').forEach((button) => {
  button.addEventListener('click', () => {
    modalImage.src = button.dataset.modalImage;
    modal.showModal();
    analytics.track('proof_view');
  });
});
modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});

let finalRegionVisible = false;

function applyStickyState(stateName) {
  const state = ctaStates[stateName] || ctaStates.hidden;
  stickyCTA.textContent = state.label;
  stickyCTA.href = state.target;
  stickyCTA.setAttribute('aria-label', state.label || '모바일 상담 메뉴');
  stickyCTA.toggleAttribute('hidden', !state.visible || finalRegionVisible);
}

const stickySections = document.querySelectorAll('[data-sticky-state]');
const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) applyStickyState(visible.target.dataset.stickyState);
}, { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.25, 0.5] });
stickySections.forEach((section) => observer.observe(section));

const finalRegionObserver = new IntersectionObserver((entries) => {
  finalRegionVisible = entries.some((entry) => entry.isIntersecting);
  if (finalRegionVisible) stickyCTA.setAttribute('hidden', '');
}, { threshold: 0.05 });
finalRegionObserver.observe(document.querySelector('#consult'));
finalRegionObserver.observe(document.querySelector('footer'));
applyStickyState('hidden');
