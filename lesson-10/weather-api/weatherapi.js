// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');


// API URL Pieces 

let api = 'https://api.openweathermap.org/data/2.5/weather?q=';
let apiKey = '&APPID=b5d3f766a916d0ac9fd887ea4d16baad';
let unit = '&units=imperial';
let city = 'Fairbanks'
let url = api + city + apiKey + unit;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // this is for testing the call 
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();
// gets data from api and displays on DOM
async function getWeather(url) {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      let main = data.main;
  
      let temp = main.temp;
      let feelsLike = main.feels_like;
      let tempMin = main.temp_min;
      let tempMax = main.temp_max;
      
      let output = [
        {id: '#temp', data: temp},
        {id: '#feels-like', data: feelsLike},
        {id: '#temp-min', data: tempMin},
        {id: '#temp-max', data: tempMax}
      ];
  
      output.forEach(getInfo);
      function getInfo(item){
        let element = item.id
        let temperature = item.data;
        document.querySelector(element).textContent = temperature + ' °F';
        console.log(element, temperature);
      }
    };
  };
function displayResults(weatherData) {
  currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;
  let iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  let desc = weatherData.weather[0].description;

  weatherIcon.setAttribute('src', iconsrc)
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
}
