// const api_url =
//   "http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}";
// api-key="82005d27a116c2880c8f0fcb866998a0";

let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener(click, (e) => {
  e.prevantDefault();
  getWeather(searchInput.value);
  searchInput.value = "";
  console.log(searchInput.value);
});

const getWeather = async (city) => {
  console.log(city);
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=82005d27a116c2880c8f0fcb866998a0`
    );
    const weatherApp = await response.json();
    console.log(weatherApp);
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener("load", () => {
  let long;
  let lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(long, lat);
      const api_url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=82005d27a116c2880c8f0fcb866998a0`;
      fetch(api_url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          loc.textContent = data.name;
          console.log(loc.textContent);
          tempvalue.textContent = (data.main.temp - 273.15).toFixed(2) + "°C";
          console.log(tempvalue.textContent);
          climate.textContent = data.weather[0].description;
          console.log(climate.textContent);
          iconfile = data.weather[0].icon;
          console.log(iconfile);
          tempicon.src = "http://openweathermap.org/img/w/" + iconfile + ".png";
          console.log(tempicon.src);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    });
  }
});
