import { displayError, capitalizeWords } from './utils.js';

class WeatherManager {
    constructor() {
        this.config = {
            lat: 37.3891,
            lon: -5.9845,
            url: 'https://api.open-meteo.com/v1/forecast',
            updateInterval: 30 * 60 * 1000 // 30 minutes
        };

        this.elements = {
            currentTemp: document.getElementById('current-temp'),
            currentDesc: document.getElementById('current-desc'),
            iconDesc: document.getElementById('icon-desc'),
            weatherIcon: document.querySelector('.weather-icon img'),
            weatherForecast: document.getElementById('weather-forecast')
        };

        this.weatherCodes = {
            0: { description: "Clear sky", icon: "01d.png" },
            1: { description: "Mainly clear", icon: "02d.png" },
            2: { description: "Partly cloudy", icon: "03d.png" },
            3: { description: "Overcast", icon: "04d.png" },
            45: { description: "Foggy", icon: "50d.png" },
            48: { description: "Depositing rime fog", icon: "50d.png" },
            51: { description: "Light drizzle", icon: "09d.png" },
            53: { description: "Moderate drizzle", icon: "09d.png" },
            55: { description: "Dense drizzle", icon: "09d.png" },
            61: { description: "Light rain", icon: "10d.png" },
            63: { description: "Moderate rain", icon: "10d.png" },
            65: { description: "Heavy rain", icon: "10d.png" },
            71: { description: "Light snow", icon: "13d.png" },
            73: { description: "Moderate snow", icon: "13d.png" },
            75: { description: "Heavy snow", icon: "13d.png" },
            95: { description: "Thunderstorm", icon: "11d.png" }
        };

        this.init();
    }

    async init() {
        await this.fetchWeather();
        this.startWeatherUpdates();
    }

    getWeatherUrl() {
        const params = new URLSearchParams({
            latitude: this.config.lat,
            longitude: this.config.lon,
            current: 'temperature_2m,relative_humidity_2m,weather_code',
            daily: 'temperature_2m_max,temperature_2m_min,weather_code',
            timezone: 'auto',
            forecast_days: '3'
        });
        return `${this.config.url}?${params}`;
    }

    async fetchWeather() {
        try {
            const response = await fetch(this.getWeatherUrl());
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            this.displayWeather(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            this.handleError();
        }
    }

    displayWeather(data) {
        this.displayCurrentWeather(data.current);
        this.displayForecast(data.daily);
    }

    displayCurrentWeather(current) {
        const weather = this.weatherCodes[current.weather_code] || 
                       { description: "Unknown", icon: "unknown.png" };

        this.elements.currentTemp.textContent = `${Math.round(current.temperature_2m)}°C`;
        this.elements.currentDesc.textContent = capitalizeWords(weather.description);
        this.elements.weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}`;
        this.elements.weatherIcon.alt = weather.description;
        this.elements.iconDesc.textContent = weather.description;
    }

    displayForecast(daily) {
        const forecastHTML = Array.from({ length: 3 }, (_, i) => {
            const weather = this.weatherCodes[daily.weather_code[i]] || 
                          { description: "Unknown", icon: "unknown.png" };
            
            return `
                <p class="forecast-day">
                    <strong>Day ${i + 1}:</strong> ${capitalizeWords(weather.description)}<br>
                    High: ${Math.round(daily.temperature_2m_max[i])}°C 
                    Low: ${Math.round(daily.temperature_2m_min[i])}°C
                    <img src="https://openweathermap.org/img/wn/${weather.icon}" 
                         alt="${weather.description}" 
                         class="forecast-icon">
                </p>
            `;
        }).join('');

        this.elements.weatherForecast.innerHTML = forecastHTML;
    }

    handleError() {
        displayError(this.elements.weatherForecast, 'Weather data unavailable');
    }

    startWeatherUpdates() {
        setInterval(() => this.fetchWeather(), this.config.updateInterval);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new WeatherManager();
});

export { WeatherManager };


// API Configuration
/* const apiKey = "f607026953e9f7aeea76a8332d4cefce";
const lat = 37.3891;
const lon = -5.9845;
const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=3`;
const units = "metric";

// Weather code mapping
const weatherCodes = {
    0: { description: "Clear sky", icon: "01d.png" },
    1: { description: "Mainly clear", icon: "02d.png" },
    2: { description: "Partly cloudy", icon: "03d.png" },
    3: { description: "Overcast", icon: "04d.png" },
    45: { description: "Foggy", icon: "50d.png" },
    48: { description: "Depositing rime fog", icon: "50d.png" },
    51: { description: "Light drizzle", icon: "09d.png" },
    53: { description: "Moderate drizzle", icon: "09d.png" },
    55: { description: "Dense drizzle", icon: "09d.png" },
    61: { description: "Light rain", icon: "10d.png" },
    63: { description: "Moderate rain", icon: "10d.png" },
    65: { description: "Heavy rain", icon: "10d.png" },
    71: { description: "Light snow", icon: "13d.png" },
    73: { description: "Moderate snow", icon: "13d.png" },
    75: { description: "Heavy snow", icon: "13d.png" },
    95: { description: "Thunderstorm", icon: "11d.png" }
};



// Helper function to format temperature
function formatTemp(temp) {
    return Math.round(temp);
}

async function fetchWeather() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        displayError();
    }
}

function displayWeather(data) {
    // Current weather
    const currentWeatherCode = data.current.weather_code;
    const weather = weatherCodes[currentWeatherCode] || 
                   { description: "Unknown", icon: "unknown.png" };

    currentTemp.textContent = `${formatTemp(data.current.temperature_2m)}°C`;
    currentDesc.textContent = capitalizeWords(weather.description);
    weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}`;
    weatherIcon.alt = weather.description;
    iconDesc.textContent = weather.description;

    // 3-day forecast
    let forecastHTML = '';
    for (let i = 0; i < 3; i++) {
        const dayWeather = weatherCodes[data.daily.weather_code[i]] || 
                          { description: "Unknown", icon: "unknown.png" };
        
        forecastHTML += `
            <p class="forecast-day">
                <strong>Day ${i + 1}:</strong> ${capitalizeWords(dayWeather.description)}<br>
                High: ${formatTemp(data.daily.temperature_2m_max[i])}°C 
                Low: ${formatTemp(data.daily.temperature_2m_min[i])}°C
                <img src="https://openweathermap.org/img/wn/${dayWeather.icon}" 
                     alt="${dayWeather.description}" 
                     class="forecast-icon">
            </p>
        `;
    }
    weatherForecast.innerHTML = forecastHTML;
}



// Initialize weather data
fetchWeather();

// Update weather every 30 minutes
setInterval(fetchWeather, 30 * 60 * 1000);

 */