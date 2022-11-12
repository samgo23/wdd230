// Business Directory JSON 
let jsonBusinessFile = 'https://raw.githubusercontent.com/samgo23/wdd230/main/chamber/data.json';

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
  }

// toggle menu view

const gridbutton = document.getElementById("grid");
const listbutton = document.getElementById("list");
const display = document.querySelector(".cards");


gridbutton.addEventListener("click", () => {
	display.classList.add("grid");
	display.classList.remove("list");
});


listbutton.addEventListener("click", () =>{
  display.classList.add("list");
	display.classList.remove("grid");
}); 


