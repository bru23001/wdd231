const currentTemp = document.getElementById("current-temp");
const currentDesc = document.getElementById("current-desc");
const iconDesc = document.getElementById("icon-desc");
const day1 = document.getElementById("day1");
const day2 = document.getElementById("day2");
const day3 = document.getElementById("day3");

const apiKey = "f607026953e9f7aeea76a8332d4cefce";
const lat = 37.3891; 
const lon = -5.9845; 
const units = "metric";
const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
const weatherIcon = document.querySelector(".weather-icon img");

async function apiFetch() {
    try {
        const response = await fetch(url);
        console.log("Fetching data...");
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function displayWeather(data) {
    // Current weather
    currentTemp.textContent = `${data.current.temp.toFixed(1)}°C`;
    currentDesc.textContent = data.current.weather[0].description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.current.weather[0].description;
    iconDesc.textContent = data.current.weather[0].description;


    // 3-day forecast
    day1.textContent = `Day 1: ${data.daily[1].temp.day.toFixed(1)}°C (High: ${data.daily[1].temp.max.toFixed(1)}°C, Low: ${data.daily[1].temp.min.toFixed(1)}°C)`;
    day2.textContent = `Day 2: ${data.daily[2].temp.day.toFixed(1)}°C (High: ${data.daily[2].temp.max.toFixed(1)}°C, Low: ${data.daily[2].temp.min.toFixed(1)}°C)`;
    day3.textContent = `Day 3: ${data.daily[3].temp.day.toFixed(1)}°C (High: ${data.daily[3].temp.max.toFixed(1)}°C, Low: ${data.daily[3].temp.min.toFixed(1)}°C)`;
}
// Call the API fetch function
apiFetch();

function renderCalendar() {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = date.getDate();
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Set header
    document.querySelector('.calendar-header').textContent = `${months[month]} ${year}`;
    
    // Set weekdays
    const weekdaysHTML = weekdays.map(day => `<div>${day}</div>`).join('');
    document.querySelector('.weekdays').innerHTML = weekdaysHTML;
    
    // Set days
    let daysHTML = '';
    for (let i = 0; i < firstDay; i++) {
      daysHTML += '<div></div>';
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today ? 'today' : '';
      daysHTML += `<div class="${isToday}">${day}</div>`;
    }
    
    document.querySelector('.days').innerHTML = daysHTML;
  }
  
  document.addEventListener('DOMContentLoaded', renderCalendar); 