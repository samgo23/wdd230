/*toggle menu function*/
function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
  }
  
  const x = document.getElementById('hamburgerBtn')
  x.onclick = toggleMenu;
  
  
  /* DATE TIME FUNCTIONS*/
  /* current date and time on the top of the page */
  let dateTime = new Date();
  const fullDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' }).format(dateTime);
  document.getElementById("dateTime").innerHTML = fullDate;
  /* current year used for copyright */
  const date = new Date();
  let year = date.getFullYear();
  document.querySelector('#year').innerHTML = year;

  /*last modified date: used for footer*/
Time = document.lastModified;
document.querySelector("#modify").innerHTML = document.lastModified;

async function weatherApi() {
    try {
      // select HTML elements in the document
      const currentTemp = document.querySelector('#current-temp');
      const windSpeed = document.querySelector('#wind-speed');
      const weatherIcon = document.querySelector('#weather-icon');
      const captionDesc = document.querySelector('figcaption');
  
  
      // API URL Pieces 
  
      let api = 'https://api.openweathermap.org/data/2.5/weather?q=';
      let apiKey = '&APPID=b5d3f766a916d0ac9fd887ea4d16baad';
      let unit = '&units=imperial';
      let city = 'Issaquah'
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
  
          // gets data from api and displays on DOM
          function displayResults(weatherData) {
            currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;
            windSpeed.innerHTML = `<strong>${weatherData.wind.speed.toFixed(0)}</strong>`;
            let iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
            let desc = weatherData.weather[0].description;
  
            weatherIcon.setAttribute('src', iconsrc)
            weatherIcon.setAttribute('alt', desc);
            captionDesc.textContent = desc;
          }
  
  
        } catch (error) {
          console.log(error);
        }
      };
      apiFetch();
  
      // windchill calulations 
      let s = windSpeed ** 0.16;
  
  
      async function calculateWindChill(url) {
        const response = await fetch(url)
        if (response.ok) {
  
          let t = document.querySelector('#current-temp').value;
          let windSpeed = document.querySelector('#wind-speed').value;
          console.log(t, windSpeed);
          if (t <= 50 && windSpeed > 3) {
            let f = 35.74 + (0.6215 * t) - (35.75 * s) + (0.4275 * t * s);
            console.log(f);
            let windFactor = f.toString();
            console.log(windFactor);
            document.querySelector('#windChill').textContent = windFactor;
          }
          else {
            document.querySelector('#windChill').textContent = 'n/a';
          };
        };
      };
  
  
      calculateWindChill(url);
  
    } catch (error) {
      console.log(error);
    };
  };
  
  weatherApi();