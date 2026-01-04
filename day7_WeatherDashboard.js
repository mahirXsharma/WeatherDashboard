const apiKEY = "43373be5b1cc82e6ebf2e3f7d2d95dc2";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";

const btn = document.querySelector("#search-btn");
const input = document.querySelector("#city-input");
const card = document.querySelector(".card");

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (input.value === "") {
      aler("please enter a city name");
    }
    checkWeather(input.value);
  }
});

btn.addEventListener("click", () => {
  const city = input.value;
  if (city === "") {
    alert("please enter a city name");
  } else {
    checkWeather(city);
  }
});
async function checkWeather(city) {
  try {
    console.log("Searching for : " + city);
    const response = await fetch(apiURL + city + "&appid=" + apiKEY);
    const data = await response.json();
    console.log(response);
    console.log(data);

    if (response.status == 200) {
      const { name } = data;
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const { description } = data.weather[0];

      document.querySelector("#city-name").innerText = name;
      localStorage.setItem("lastCity", city);
      document.querySelector("#temperature").innerText =
        Math.round(temp - 273.15) + "°C";
      document.querySelector("#description").innerText = description;
      document.querySelector("#humidity").innerText = humidity + "%";
      document.querySelector("#wind-speed").innerText =
        (speed * 3.6).toFixed(1) + " km/h";
      document.querySelector("#error-message").style.display = "none";
      document.querySelector("#weather-display").style.display = "block";
    } else {
      document.querySelector("#error-message").style.display = "block";
      document.querySelector("#weather-display").style.display = "none";
      return;
    }
  } catch (error) {
    console.log("Network Error:", error);
    alert("Something went wrong! Check your internet connection.");
  }
}

const savedCity = localStorage.getItem("lastCity");
if (savedCity) {
  input.value = savedCity;
  checkWeather(savedCity);
}
