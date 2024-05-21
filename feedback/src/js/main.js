import "../css/style.css";
import throttle from "lodash.throttle";

const form = document.querySelector(".feedback-form");
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const LOCAL_STORAGE_KEY = "feedback-form-state";

const saveFormState = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}, 500);

form.addEventListener("input", saveFormState);

document.addEventListener("DOMContentLoaded", () => {
  const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedState !== null) {
    const formData = JSON.parse(savedState);
    emailInput.value = formData.email || "";
    messageInput.value = formData.message || "";
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log("Form data:", formData);

  localStorage.removeItem(LOCAL_STORAGE_KEY);
  emailInput.value = "";
  messageInput.value = "";
});
