/*toggle menu function*/
function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
}

const x = document.getElementById('hamburgerBtn')
x.onclick = toggleMenu;



/* current date and time on the top of the page */
const dateTime = new Date();
const fullDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' }).format(dateTime);
document.getElementById("dateTime").innerHTML = fullDate;
/* current year used for copyright */
const date = new Date();
let year = date.getFullYear();
document.querySelector('#year').innerHTML = year;


/*last modified date: used for footer*/
Time = document.lastModified;
document.querySelector("#modify").innerHTML = document.lastModified;

