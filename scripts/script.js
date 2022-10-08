const date = new Date();
let year = date.getFullYear();
document.querySelector('#year').innerHTML = year;

document.querySelector("#modify").innerHTML = document.lastModified;