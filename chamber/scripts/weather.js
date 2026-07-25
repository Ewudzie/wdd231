

    document.addEventListener('DOMContentLoaded', function () {
        const key = typeof OPENWEATHER_API_KEY !== 'undefined' ? OPENWEATHER_API_KEY : null;
        if (!key || key === 'REPLACE_WITH_YOUR_KEY') {
            console.warn('OpenWeather API key missing in scripts/config.js; live weather disabled.');
            return;
        }

        const lat = 5.58;
        const lon = -0.19;
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${key}`;

        fetch(url)
            .then((resp) => {
                if (!resp.ok) throw new Error('Weather API request failed');
                return resp.json();
            })
            .then((data) => {
                const tempEl = document.getElementById('temperature');
                const humidityEl = document.getElementById('humidity');
                const windEl = document.getElementById('wind-speed');
                const condEl = document.getElementById('conditions');

                if (tempEl) tempEl.textContent = `${Math.round(data.current.temp)}°C`;
                if (humidityEl) humidityEl.textContent = `${data.current.humidity}%`;
                if (windEl) {
                    const kmh = Math.round(data.current.wind_speed * 3.6);
                    windEl.textContent = `${kmh} km/h`;
                }
                if (condEl) condEl.textContent = capitalize(data.current.weather[0].description);

                renderForecast(data.daily);
            })
            .catch((err) => {
                console.error(err);
            });

        function renderForecast(daily) {
            const container = document.getElementById('forecast');
            if (!container || !Array.isArray(daily)) return;
            container.innerHTML = '';

            for (let i = 1; i <= 3; i++) {
                const day = daily[i];
                if (!day) continue;
                const date = new Date(day.dt * 1000);
                const label = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
                const min = Math.round(day.temp.min);
                const max = Math.round(day.temp.max);

                const item = document.createElement('div');
                item.className = 'forecast-day';
                item.innerHTML = `<strong>${label}</strong><p class="forecast-temp">${max}°C / ${min}°C</p>`;
                container.appendChild(item);
            }
        }

        function capitalize(s) {
            return s && typeof s === 'string' ? s.charAt(0).toUpperCase() + s.slice(1) : s;
        }
    });
