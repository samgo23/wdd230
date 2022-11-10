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