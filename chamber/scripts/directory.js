// Business Directory JSON 
async function buisnessCards() {
  try {
    let jsonBusinessFile = 'https://raw.githubusercontent.com/samgo23/wdd230/main/chamber/data.json';

    const response = await fetch(jsonBusinessFile);
      if (response.ok) {
          const data = await response.json();
          console.log(data); // this is for testing the call 
          

          const businesses = data['businesses'];
          businesses.forEach(displayBusinesses('section.cards'));

          if (businesses.membership_level >= 2) {
            let spotLight = document.querySelector('.spotlight')
            forEach(displayBusinesses(spotLight));
          };

          
      }else {
        throw Error(await response.text());
        };

      function displayBusinesses(business, location) {
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
        document.querySelector(location).appendChild(card);
      };
  } catch (error) {
    console.log(error);
  }
};

buisnessCards();




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
    
    listbutton.addEventListener("click", () =>{
      display.classList.add("list");
      display.classList.remove("grid");
    }); 

  } catch (error){
    console.log(error);
  };
};
changeLayout();




