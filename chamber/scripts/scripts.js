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


/* join us page form time capture*/
async function timeLoaded() {
  try {
    document.querySelector('#timeLoaded').innerHTML = fullDate;
  } catch (error) {
    console.log(error);
  }
};
timeLoaded();




/*last modified date: used for footer*/
Time = document.lastModified;
document.querySelector("#modify").innerHTML = document.lastModified;

//const meetingDay = new Date();
async function meetingAnnouncement() {
  try {
    const monTues = dateTime.getDate();

    function isMonTues(day) {
      if (day === 1) {
        return true;
      }
      else if (day === 2) {
        return true;
      }
      else {
        return false;
      }
    }
    isMonTues(monTues);

    document.querySelector(".meeting").classList.add("closed");
  } catch (error) {
    console.log(error);
  }
}
meetingAnnouncement();



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

// Lazy load
async function ifImage() {
  let images = document.querySelectorAll('[data-src]');

  function preloadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) {
      return;
    }
    img.src = src;
    img.classList.add('clear');
  }

  let imgOptions = {
    threshold: 0,
    rootMargin: '0px 0px -500px 0px'
  };

  const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onLoad = () => { image.removeAttribute('data-src'); };
  }

  const imgObserver = new IntersectionObserver((items, imgObserver) => {
    items.forEach(item => {
      if (!item.isIntersecting) {
        return;
      } else {
        preloadImage(item.target);
        imgObserver.unobserve(item.target);
      }
    }, imgOptions);
  });

  images.forEach(image => {
    imgObserver.observe(image);
  });

}

ifImage();
// display elements & get the stored value
const todayDisplay = document.querySelector(".today");
const visitsDisplay = document.querySelector(".visits");
let numVisits = Number(window.localStorage.getItem("visits-ls"));

/*
// first time check
if (numVisits !== 0) {
  visitsDisplay.textContent = numVisits;
} else {
  visitsDisplay.textContent = `This is your first visit!`;
}
*/
// number of visits by +1 & store new number
numVisits++;
localStorage.setItem("visits-ls", numVisits);

// Business Directory JSON 
async function buisnessCards() {
  try {
    let jsonBusinessFile = 'https://raw.githubusercontent.com/samgo23/wdd230/main/chamber/data.json';

    const response = await fetch(jsonBusinessFile);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // this is for testing the call 

      const businesses = data['businesses'];
      businesses.forEach(displayBusinesses);



    } else {
      throw Error(await response.text());
    };
    function displayBusinesses(business) {
      let card = document.createElement('section');
      let h2 = document.createElement('h2');
      let logo = document.createElement('img');
      let contact = document.createElement('div');
      let phoneNumber = document.createElement('p');
      let address = document.createElement('p');


      // Business info
      h2.textContent = (`${business.name}`);
      phoneNumber.textContent = (`${business.phone_number}`)
      address.textContent = (`${business.address}`)

      //Business logo
      logo.setAttribute('src', business.imageurl);
      logo.setAttribute('alt', (`${business.name} logo`))
      logo.setAttribute('loading', 'lazy')

      // append to card
      card.appendChild(h2);
      card.appendChild(logo);
      card.appendChild(contact);
      contact.appendChild(phoneNumber);
      contact.appendChild(address);

      // append to doc
      document.querySelector('section.cards').appendChild(card);
    };
  } catch (error) {
    console.log(error);
  }
};

buisnessCards();

async function spotLights() {
  try {
    let jsonBusinessFile = 'https://raw.githubusercontent.com/samgo23/wdd230/main/chamber/data.json';

    const response = await fetch(jsonBusinessFile);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // this is for testing the call 

      const businesses = data['businesses'];
      businesses.forEach(spotLight);


    } else {
      throw Error(await response.text());
    };

    function spotLight(business) {
      if (business.memership_level >= 2) {
        console.log('works')
        let div = document.createElement('div');
        let card = document.createElement('section');
        let h2 = document.createElement('h2');
        let logo = document.createElement('img');
        let contact = document.createElement('div');
        let phoneNumber = document.createElement('p');
        let address = document.createElement('p');


        // Business info
        h2.textContent = (`${business.name}`);
        phoneNumber.textContent = (`${business.phone_number}`)
        address.textContent = (`${business.address}`)

        //Buisness logo
        logo.setAttribute('src', business.imageurl);
        logo.setAttribute('alt', (`${business.name} logo`))
        logo.setAttribute('loading', 'lazy')

        // append to card
        card.appendChild(h2);
        card.appendChild(logo);
        card.appendChild(contact);
        contact.appendChild(phoneNumber);
        contact.appendChild(address);


        // append to doc
        document.querySelector('.spotlight').appendChild(card);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
spotLights();

// toggle menu view

async function changeLayout() {
  try {
    const gridbutton = document.getElementById("grid");
    const listbutton = document.getElementById("list");
    const display = document.querySelector(".cards");

    gridbutton.addEventListener("click", () => {
      display.classList.add("grid");
      display.classList.remove("list");
    });

    listbutton.addEventListener("click", () => {
      display.classList.add("list");
      display.classList.remove("grid");
    });

  } catch (error) {
    console.log(error);
  };
};
changeLayout();




