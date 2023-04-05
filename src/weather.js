//import axios from 'axios';
const url = "https://api.openweathermap.org/data/2.5/";
const key = "57baf028e3141c7e7bb486d6f3ff9f8e";

let cityNameInput;

document.addEventListener("DOMContentLoaded", onCreated());

function onCreated() {
  const inputCity = document.querySelector("#inputCity");
  const textCity = document.querySelector("#textCity");
  const cityTemp = document.querySelector("#cityTemp");
  const statusWeather = document.querySelector("#statusWeather");

  const setQuery = (e) => {
    if (e.keyCode == "13") {
      cityNameInput = inputCity.value;
      getResult(cityNameInput);
      inputCity.value = "";
    }
  };

  if (inputCity) {
    inputCity.addEventListener("keypress", setQuery);
  } else {
    console.log("Merhaba");
  }

  const getResult = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;

    /*  fetch(query)
      .then((weather) => {
        return weather.json();
      })
      .then(displayResult)
      .catch((error)=>{
        console.log(error);
      }); */

    const axiosData = async () => {
      try {
        const get_data = await axios.get(query);
        displayResult(get_data);
      } catch (error) {
        if (error.response.statusText == "Not Found") {
          textCity.textContent = "-";
          cityTemp.textContent = `-  C`;
          statusWeather.textContent = "-";

          alert(`Mistake! ${cityNameInput} City, was not found`);
        }
      }
    };

    // call the function
    axiosData();
  };

  const displayResult = (result) => {
    if (result.status == 200) {
      textCity.textContent = result.data.name;
      cityTemp.textContent = `${Math.round(result.data.main.temp)}  C`;
      statusWeather.textContent = result.data.weather[0].description;
    } else {
      alert("Status is not 200.");
    }
  };
}
