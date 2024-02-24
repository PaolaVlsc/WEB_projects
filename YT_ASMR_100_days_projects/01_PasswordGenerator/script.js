// declare variables
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const copyIconElement = document.querySelector(".input-box span");
const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const generateBtn = document.querySelector(".generate-btn");

// object alphabet
const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!$%&|[](){}:;.,*+-#@<>~",
};

let excludeDuplicate = false;

// Logic for generating a password
const generatePassword = () => {
  const staticPassword = buildStaticPassword();
  let randomPassword = "";
  const passLength = lengthSlider.value;

  for (let i = 0; i < passLength; i++) {
    const randomChar = getRandomChar(staticPassword);
    if (excludeDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }

  passwordInput.value = randomPassword;
};

const buildStaticPassword = () => {
  let staticPassword = "";
  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        staticPassword += `  ${staticPassword}  `;
      } else {
        excludeDuplicate = true;
      }
    }
  });
  return staticPassword;
};

const getRandomChar = (source) => {
  return source[Math.floor(Math.random() * source.length)];
};

const updatePassIndicator = () => {
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

const updateSlider = () => {
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};

// Initial setup
updateSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIconElement.innerText = "check";
  copyIconElement.style.color = "#4285f4";
  setTimeout(() => {
    copyIconElement.innerText = "copy_all";
    copyIconElement.style.color = "#707070";
  }, 1500);
};

copyIconElement.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
