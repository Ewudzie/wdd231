// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&appid=fabca6d02e23eb9a1d3ca827963d5047&units=metric';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weather API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        displayResults(data);
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
}

// Display the JSON data on my web page
async function displayResults(data) {
    console.log('hello', data);
    captionDesc.innerHTML = data.weather[0].description;
    currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;C`;
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    weatherIcon.setAttribute('alt', data.weather[0].description);
    weatherIcon.setAttribute('loading', 'lazy');
}

apiFetch();