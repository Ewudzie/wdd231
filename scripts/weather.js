// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');



const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&appid=fabca6d02e23eb9a1d3ca827963d5047&units=metric';

async function apiFetch() {     
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
}

apiFetch();
