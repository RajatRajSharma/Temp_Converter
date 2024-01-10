// app.js

const celsiusField = document.querySelector("#celsius");
const degree = document.querySelector("#degree");
const convertBtn = document.querySelector("#convert-btn");
const tempType = document.querySelector("#temp-type");
const currentTime = document.querySelector("#current-time");

window.addEventListener("load", () => {
  degree.value = "";
  celsiusField.innerHTML = "";
  setCurrentTime();
});

if (degree.value === "") {
  convertBtn.setAttribute("disabled", "");
  setTimeout(() => {
    convertBtn.removeAttribute('disabled');
  }, 4000);
}

convertBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Validate input based on temperature type
  if (tempType.value === "kelvin" && parseFloat(degree.value) < 0) {
    showAlert("Kelvin value can't be less than 0. It's the minimum value on the Kelvin scale.");
  } else if (tempType.value === "fahrenheit" && parseFloat(degree.value) < -459.67) {
    showAlert("Minimum value on the Fahrenheit scale is -459.67 °F. Please enter a value more than that.");
  } else {
    convertToCelsius();
    convertBtn.innerHTML = "<span class='icon'><i class='fa fa-spinner fa-spin'></i> Converting...</span>";
    setTimeout(() => {
      convertBtn.innerHTML = "<span>Convert</span>";
    }, 1000);
  }
});

function convertToCelsius() {
  let inputValue = degree.value;

  setTimeout(() => {
    if (tempType.value === "fahrenheit") {
      const FahrenheitToCelsius = (inputValue - 32) * (5 / 9);
      celsiusField.innerHTML = `${FahrenheitToCelsius.toFixed(3)} &deg;c`;
    } else if (tempType.value === "kelvin") {
      const KelvinToCelsius = inputValue - 273.15;
      celsiusField.innerHTML = `${KelvinToCelsius.toFixed(3)} &deg;c`;
    }
  }, 1200);
}

// Function to set the current time
function setCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
  currentTime.textContent = formattedTime;
}

// Function to display Bootstrap alert
function showAlert(message) {
  const alertDiv = document.getElementById("temperature-alert");
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  alertDiv.style.display = "block";

  // Automatically remove the alert after 2 seconds
  setTimeout(() => {
    alertDiv.style.display = "none";
  }, 2000);
}
