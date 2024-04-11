const themeSwitch = document.querySelector(".header-switch");

themeSwitch.addEventListener("click", (e) => {
  themeSwitch.classList.toggle("active");
  document.body.classList.toggle("dark-mode-variables");
});

const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  input.onfocus = () => {
    input.previousElementSibling.classList.add("top", "focus");
    input.parentNode.classList.add("focus");
  };
  input.onblur = () => {
    input.value = input.value.trim();
    if (input.value.trim().length === 0) {
      input.previousElementSibling.classList.remove("top");
    }
    input.previousElementSibling.classList.remove("focus");
    input.parentNode.classList.remove("focus");
  };
});

