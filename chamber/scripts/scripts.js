/*toggle menu function*/
function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
}

const x = document.getElementById('hamburgerBtn')
x.onclick = toggleMenu;



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
//document.querySelector(".meeting").classList.add("closed"); 

// Lazy load
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

// display elements & get the stored value
const todayDisplay = document.querySelector(".today");
const visitsDisplay = document.querySelector(".visits");
let numVisits = Number(window.localStorage.getItem("visits-ls"));

// first time check
if (numVisits !== 0) {
	visitsDisplay.textContent = numVisits;
} else {
	visitsDisplay.textContent = `This is your first visit!`;
}

// number of visits by +1 & store new number
numVisits++;
localStorage.setItem("visits-ls", numVisits);
