const apiKey = '886705b4c1182eb1c69f28eb8c520e20';
let units = 'metric'; 

function getWeather() {
    const locationInput = document.getElementById('locationInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&units=${units}&appid=${apiKey}`;

    fetchWeather(url);
}

function fetchWeather(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            displayError('Location not found. Please enter a valid location.');
        });
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    const location = document.getElementById('location');
    const weatherInfo = document.getElementById('weatherInfo');
    const information = document.getElementById('information')

    
    const weatherDescription = data.weather[0].description.toLowerCase();
    let weatherImageURL;
    if (weatherDescription.includes('haze')) {
        weatherImageURL = `https://openweathermap.org/img/wn/50d@2x.png`;
    } else if (weatherDescription.includes('clear')) {
        weatherImageURL = `https://openweathermap.org/img/wn/01d@2x.png`; 
    } else if (weatherDescription.includes('snow')) {
        weatherImageURL = `https://openweathermap.org/img/wn/13d@2x.png`;
    } else if (weatherDescription.includes('cloud')) {
        weatherImageURL = `https://openweathermap.org/img/wn/04d@2x.png`;
    } else if (weatherDescription.includes('rain')) {
        weatherImageURL = `https://openweathermap.org/img/wn/09d@2x.png`;
    } else if(weatherDescription.includes('drizzle')) {
        weatherImageURL = `https://openweathermap.org/img/wn/09d@2x.png`;
    }
    
    else {
        weatherImageURL = 'path_to_your_default_image.png';
    }

    location.textContent = `${data.name}`;
    const temperature = units === 'metric' ? data.main.temp : (data.main.temp * 9/5) + 32;
    weatherInfo.innerHTML = `
    <img src= "${weatherImageURL}">
         ${temperature.toFixed(2)} &deg;${units === 'metric' ? 'C' : 'F'}<br>
         ${data.weather[0].description}

    `;
    information.innerHTML=` 
    <img src="icons8-humidity-100.png" alt="Humidity Icon">Humidity: ${data.main.humidity}%
    <img src="icons8-wind-48.png" alt="Humidity Icon" class="wind">Wind: ${data.wind.speed}Km/h<br>`

    weatherDisplay.classList.remove('hidden');
}

function displayError(message) {
    const errorDisplay = document.getElementById('errorDisplay');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorDisplay.classList.remove('hidden');
}

function updateWeather() {
    units = document.querySelector('input[name="units"]:checked').value;
    const locationInput = document.getElementById('locationInput').value;

    if (locationInput !== '') {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&units=${units}&appid=${apiKey}`;
        fetchWeather(url);
    }
}

