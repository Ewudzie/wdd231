/* select HTML elements in the document */
const currentTemp = document.querySelector('#temperature');
const humidityEl = document.querySelector('#humidity');
const windSpeedEl = document.querySelector('#wind-speed');
const conditionsEl = document.querySelector('#conditions');
const descriptionEl = document.querySelector('#description');
const weatherIcon = document.querySelector('#weather-icon');
const forecastContainer = document.querySelector('#forecast');


const apiKey = "94d6f6820b57a888e4c7e78478b30250"; 
const lat = 5.6037;
const lon = -0.1870;

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function apiFetch() {
    if (descriptionEl) {
        descriptionEl.textContent = 'Loading weather description...';
    }
    if (conditionsEl) {
        conditionsEl.textContent = 'Loading...';
    }
    if (forecastContainer) {
        forecastContainer.innerHTML = '<p class="forecast-loading">Loading forecast...</p>';
    }

    try {
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
        ]);

        if (!weatherResponse.ok) {
            throw new Error(`Weather API request failed: ${weatherResponse.status} ${weatherResponse.statusText}`);
        }
        if (!forecastResponse.ok) {
            throw new Error(`Forecast API request failed: ${forecastResponse.status} ${forecastResponse.statusText}`);
        }

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        console.log(weatherData, forecastData);
        displayResults(weatherData, forecastData);
    } catch (error) {
        console.error('Error fetching API data:', error);
        if (descriptionEl) {
            descriptionEl.textContent = 'Weather information is temporarily unavailable.';
        }
        if (conditionsEl) {
            conditionsEl.textContent = 'N/A';
        }
        if (forecastContainer) {
            forecastContainer.innerHTML = '<p>Forecast information is temporarily unavailable.</p>';
        }
    }
}

// Display the JSON data on my web page
function displayResults(weatherData, forecastData) {
    if (!weatherData || !forecastData) return;

    const current = weatherData;
    const forecastList = forecastData.list || [];

    if (currentTemp) {
        currentTemp.innerHTML = `${Math.round(current.main.temp)}&deg;C`;
    }
    if (humidityEl) {
        humidityEl.innerHTML = `${current.main.humidity}%`;
    }
    if (windSpeedEl) {
        const kmh = Math.round(current.wind.speed * 3.6);
        windSpeedEl.innerHTML = `${kmh} km/h`;
    }
    if (conditionsEl) {
        conditionsEl.innerHTML = capitalize(current.weather[0].description);
    }
    if (descriptionEl) {
        descriptionEl.innerHTML = `Current weather: ${capitalize(current.weather[0].description)}`;
    }
    if (weatherIcon) {
        weatherIcon.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
        weatherIcon.alt = current.weather[0].description;
    }

    if (forecastContainer) {
        const daily = getDailyForecast(forecastList);
        forecastContainer.innerHTML = '';

        daily.forEach((day) => {
            const item = document.createElement('div');
            item.className = 'forecast-day';
            item.innerHTML = `
                <strong>${day.label}</strong>
                <p class="forecast-temp">High ${day.max}&deg;C / Low ${day.min}&deg;C</p>
            `;
            forecastContainer.appendChild(item);
        });
    }
}

function getDailyForecast(list) {
    const days = [];
    const seen = new Set();

    list.forEach((entry) => {
        if (!entry.dt_txt || !entry.main) return;
        if (!entry.dt_txt.includes('12:00:00')) return;

        const date = new Date(entry.dt_txt);
        const label = date.toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });

        if (seen.has(label) || days.length >= 3) return;

        days.push({
            label,
            max: Math.round(entry.main.temp_max),
            min: Math.round(entry.main.temp_min)
        });
        seen.add(label);
    });

    return days;
}

function capitalize(text) {
    return typeof text === 'string' && text.length > 0
        ? text.charAt(0).toUpperCase() + text.slice(1)
        : text;
}

apiFetch();