// Select the HTML element to manipulate
const date1 = document.querySelector("#date1");
// Try to complete the method with options
try {
	const options = {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	};
	date1.innerHTML = `Today is <span class="highlight">${new Date().toLocaleDateString("en-UK", options)}</span>!`;
} catch (e) {
	alert("Error with code or your browser does not support Locale");
}

// Long hand method ... building day and month names from built-in date methods.

const daynames = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
const d = new Date();
const dayName = daynames[d.getDay()];
const monthName = months[d.getMonth()];
const year = d.getFullYear();
const fulldate = `${dayName}, ${d.getDate()} ${monthName} ${year}`;
document.querySelector("#date2").textContent = fulldate;



alert(document.lastModified);

let oLastModif = new Date(document.lastModified);

let nLastModif = Date.parse(document.lastModified);

const lastVisit = parseFloat(document.cookie.replace(/(?:(?:^|.*;)\s*last_modif\s*=\s*([^;]*).*$)|^.*$/, "$1"));
const lastModif = Date.parse(document.lastModified);

if (isNaN(lastVisit) || lastModif > lastVisit) {
document.cookie = `last_modif=${Date.now()}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=${location.pathname}`;

if (isFinite(lastVisit)) {
    alert("This page has been changed!");
}
}
