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
document.querySelector('#timeLoaded').innerHTML = fullDate;



/*last modified date: used for footer*/
Time = document.lastModified;
document.querySelector("#modify").innerHTML = document.lastModified;

//const meetingDay = new Date();
const monTues = dateTime.getDate();

function isMonTues(day) {
    if (day === 1){
        return true;
    }
    else if (day === 2) {
        return true;
    }
    else {
        return false; 
    } 
} 
// document.querySelector(".meeting").classList.add("closed"); 

// Lazy load
function isImage() {

}; 
async function ifImage() {
  let images = document.querySelectorAll('[data-src]');

  function preloadImage(img) {
    const src = img.getAttribute('data-src');
    if(!src) {
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
    image.onLoad = () => {image.removeAttribute('data-src');};
  }

  const imgObserver = new IntersectionObserver((items, imgObserver) => {
      items.forEach(item => {
        if (!item.isIntersecting) {
          return;
        } else{
          preloadImage(item.target);
          imgObserver.unobserve(item.target);
        }
      }, imgOptions);
    });

  images.forEach(image => {
    imgObserver.observe(image);
    });

}


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

/*
// Membership Select Function
function showMembership(membership) {
  document.getElementById(membership).classList.add = "selectedMembership";
};
let memberships = document.querySelector(".sbs")
memberships.addEventListener('click', showMembership);

// regex 
let correctBTitle = document.querySelector('#bTitle');
let regex = /[" *"A-Za-z-]{7,99}/;
let testBTitle = regex.test(correctBTitle);
console.log(testBTitle);
*/

/*
// Business Directory JSON 
let jsonBusinessFile = '/Users/samgordon/wdd 230/wdd230/chamber/data.json';

fetch(jsonBusinessFile)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const businesses = jsonObject['businesses'];
    businesses.forEach(displayBusinesses);
  });

  function displayBusinesses(business) {
    let card = document.createElement('section');
    let h2 = document.createElement('h2');
    let logo = document.createElement('img');
    let contact = document.createElement('div');
    let phoneNumber = document.createElement('p');
    let email = document.createElement('p');
    let address = document.createElement('p');

    // Business info
    h2.textContent = (`${business.name}`);
    phoneNumber.textContent = (`${business.phone_nember}`)
    email.textContent = (`${business.email}`)
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
    contact.appendChild(email);
    contact.appendChild(address);

    // append to doc
    document.querySelector('div.cards').appendChild(card);
  }
  */