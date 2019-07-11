let locationTimeZone_h1 = document.querySelector('.location-timezone');
let temperatureDegree_h2 = document.querySelector('.temperature-degree');
let temperatureDec_div = document.querySelector('.temperature-description');
let degreeSction_div = document.querySelector('.degree-section');
let degreeUnit_span = document.querySelector('.degree-section > span');
var _temperatureInC = null;
var _temperatureInF = null;

initializeEvent();

function initializeEvent() {
    degreeSction_div.addEventListener('click', () => {
        switchDegreeUnit();
    });
}

function switchDegreeUnit() {
    switch (degreeUnit_span.textContent) {
        case 'F':
            degreeUnit_span.textContent = 'C';
            temperatureDegree_h2.textContent = _temperatureInC;
            break;
        default:
            degreeUnit_span.textContent = 'F';
            temperatureDegree_h2.textContent = _temperatureInF;
            break;
    }
}

window.addEventListener('load', () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(position => {
        let long = position.coords.longitude;
        let lat = position.coords.latitude;

        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const api = `${proxy}https://api.darksky.net/forecast/32fc5d155206a8732335b05cc52a23e6/${lat},${long}`;

        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                updateIndication(data);
            });
    });
});

function updateIndication(data) {
    const { temperature, summary, icon } = data.currently;
    temperatureDegree_h2.textContent = temperature;
    temperatureDec_div.textContent = summary;
    locationTimeZone_h1.textContent = data.timezone;
    setIcon(icon, document.querySelector('.icon'));

    _temperatureInC = (((temperature - 32) * 5) / 9).toFixed(2);
    _temperatureInF = temperature;
}

function setIcon(icon, iconId) {
    const skyCons = new Skycons({ color: 'white' });
    const currIcon = icon.replace(/-/g, '_').toUpperCase();
    skyCons.play();
    return skyCons.set(iconId, Skycons[currIcon]);
}
