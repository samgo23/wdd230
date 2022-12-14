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

/* lazy load*/
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

async function weatherApi() {
    try {
      // select HTML elements in the document
      const currentTemp = document.querySelector('#current-temp');
      const condition = document.querySelector('#condition');
      const weatherIcon = document.querySelector('#weather-icon');
      const captionDesc = document.querySelector('figcaption');
      const humidity = document.querySelector('#humidity');
  
      // API URL Pieces 
  
      let api = 'https://api.openweathermap.org/data/2.5/weather?q=';
      let apiKey = '&APPID=b5d3f766a916d0ac9fd887ea4d16baad';
      let unit = '&units=imperial';
      let city = 'Carlsbad'
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
            condition.innerHTML = `<strong>${weatherData.weather[0].description}</strong>`;
            humidity.innerHTML = `<strong>${weatherData.main.humidity}%</strong>`;
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
  
    } catch (error) {
      console.log(error);
    };
  };

weatherApi();

let submitBtn = document.querySelector('.submitBtn');

async function displayCart() {
  try {
    let drinkHistory = document.querySelector("#drink-history")

    let drinks = localStorage.getItem("cart");
    let p = document.createElement("p")
    p.textContent = drinks
    drinkHistory.appendChild(p);

  } catch (error) {
    console.log(`displayCart ${error}`)
  };
};
displayCart();

async function drinkCart(basket) {
  try {
      localStorage.clear()
      let order = [];
      // initialize display elements
      const cartItems = document.querySelector("#drink-history");
      
      // get the stored value in localStorage
      let drink = window.localStorage.getItem("cart");

      // determine what is in the cart
      

      // increment the number of visits.
      order.push(basket);
      // store the new number of visits value
      localStorage.setItem("cart", order);
  } catch (error) {
    
    console.log(error);
  };
};


let arrName = [];
let arrFat = [];
let arrCarb = [];
let arrProtien = [];
let arrCalories = [];
let arrSuagr = [];

async function getFruit() {
  try {
    let jsonFruitFile = 'https://brotherblazzard.github.io/canvas-content/fruit.json';

    const response = await fetch(jsonFruitFile);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const fruit = data[x];
      console.log(fruit);
      
      for (let i = 0; i < data.length; i++) {
        displayFruits(data[i]);
      }
      
    } else {
      throw Error(await response.text());
    };
    

    function displayFruits(fruitDrink) {
      let card = document.createElement('section');
      let h2 = document.createElement('h2');
      let nutritions = document.createElement('div');
      let carbohydrates = document.createElement('p');
      let protein = document.createElement('p');
      let fat = document.createElement('p');
      let calories = document.createElement('p');
      let sugar = document.createElement('p');
      let checkbox = document.createElement('input');
      

      checkbox.setAttribute('type', 'button');
      checkbox.setAttribute('class', 'cart');
      checkbox.setAttribute('id', `${fruitDrink.name}`)

      // fruitDrink info
      //checkbox.innerHTML = (`<input type="checkbox" name="audience" value="#">`)
      h2.textContent = (`${fruitDrink.name}`);
      carbohydrates.textContent = (`Carbohydrates: ${fruitDrink.nutritions.carbohydrates}`);
      protein.textContent = (`Protein: ${fruitDrink.nutritions.protein}`);
      fat.textContent = (`Fat: ${fruitDrink.nutritions.fat}`);
      calories.textContent = (`Calories: ${fruitDrink.nutritions.calories}`);
      sugar.textContent = (`Sugar: ${fruitDrink.nutritions.sugar}`)
      
      // append to card
      card.appendChild(checkbox);
      card.appendChild(h2);
      // card.appendChild(nutritions);
      nutritions.appendChild(carbohydrates);
      nutritions.appendChild(protein);
      nutritions.appendChild(fat);
      nutritions.appendChild(calories);
      nutritions.appendChild(sugar);

      // append to doc
      document.querySelector('.cards').appendChild(card);

      let cart = document.querySelector(`#${fruitDrink.name}`);

      cart.addEventListener('click', addToCart);
      let basket = document.createElement('div');
      

      function addToCart() {
        card.removeChild(checkbox)
        arrName.push(fruitDrink.name)
        console.log(arrName);
        let fname = document.querySelector("#fname").value;
        let email = document.querySelector("#email").value;
        let phone = document.querySelector("#phone").value;
        let special = document.querySelector("#special").value;
        
        let orderName = document.querySelector("#order-name");
        let orderEmail = document.querySelector("#order-email");
        let orderPhone = document.querySelector("#order-phone");
        let orderRequest = document.querySelector("#order-request");
        orderName.innerHTML = fname;
        orderEmail.innerHTML = email;
        orderPhone.innerHTML = phone;
        orderRequest.innerHTML = special;




        document.querySelector('#shopping-cart').appendChild(basket);
        
        let calcCarbohydrates = (`${fruitDrink.nutritions.carbohydrates}`)
        let calcProtein = (`${fruitDrink.nutritions.protein}`)
        arrFat.push(`${fruitDrink.nutritions.fat}`)
        let calcCalories = (`${fruitDrink.nutritions.calories}`)
        let calcSugar = (`${fruitDrink.nutritions.sugar}`)

        
        
        basket.appendChild(h2);
        basket.appendChild(nutritions);
        nutritions.appendChild(carbohydrates);
        nutritions.appendChild(protein);
        nutritions.appendChild(fat);
        nutritions.appendChild(calories);
        nutritions.appendChild(sugar);
        submitBtn.addEventListener("click", drinkCart(arrName));
      
      };
      
      
      
      


    };
  } catch (error) {
    console.log(error);
  };
};
getFruit();

async function forecast() {
  try {
    // select HTML elements in the document
    const currentForeCast = document.querySelector('#3-day-forecast');
    

    // API URL Pieces 

    let api = 'https://api.openweathermap.org/data/2.5/weather?q=';
    let apiKey = '&APPID=b5d3f766a916d0ac9fd887ea4d16baad';
    let unit = '&units=imperial';
    let lat = 'let=33.1581';
    let lon = 'lon=117.3506';
    let url = api + city + apiKey + unit;
    let urlThree = 'https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=33.1581&lon=117.3506&APPID=b5d3f766a916d0ac9fd887ea4d16baad'
    let threeDayAPI = 'https://pro.openweathermap.org/data/2.5/forecast/hourly?q=';

    

    async function apiThree() {
      try {

        const response = await fetch(urlThree);

        if (response.ok) {
          const data = await response.json();
          console.log("working")
          console.log(data); // this is for testing the call 
          displayResults(data);
        } else {
          throw Error(await response.text());
        }

        // gets data from api and displays on DOM
        function displayResults(weatherData) {
          currentForeCast.innerHTML = `<strong>${weatherData.list.main.temp};`
  
        }
  
      } catch (error) {
        console.log(`not working ${error}`);
      }
    };
    apiThree();

  } catch (error) {
    console.log(error);
  };
}
