let windSpeed = '';
let s =  windSpeed**0.16;
let button = document.querySelector('#submit');

function calculateWindChill () {
    let t = document.querySelector('.temperature').value;
    let windSpeed = document.querySelector('.wind-speed').value;
    console.log(t, windSpeed);
    if (t <= 50 && windSpeed > 3 ) {
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



button.addEventListener('click', calculateWindChill);


