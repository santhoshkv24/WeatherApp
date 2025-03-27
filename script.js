// Event Listener
document.addEventListener('DOMContentLoaded', function() {

    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherInfo = document.getElementById('weather-info');
    const errorMessage = document.getElementById('error-message');
    const cityName = document.getElementById('city-name');
    const weatherIcon = document.getElementById('weather-icon');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const pressure = document.getElementById('pressure');
    
    searchBtn.addEventListener('click', getWeather);
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            getWeather();
        }
    });
    
    async function getWeather() {
        const city = cityInput.value.trim();
        
        if (!city) {
            return;
        }
        
        weatherInfo.style.display = 'none';
        errorMessage.style.display = 'none';
        
        try {
            const apiUrl = `http://api.weatherapi.com/v1/current.json?key=0500829439084b558e0112645231705&q=${city}&aqi=yes`;
            // API_KEY TO BE REPLACED
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            if (data.cod === '404') {
                throw new Error('City not found');
            }
            // Error Handling
            
            cityName.textContent = `${data.location.name}, ${data.location.country}`;
            weatherIcon.src = `https:${data.current.condition.icon}`;
            temperature.textContent = `${Math.round(data.current.temp_c)}°C`;
            description.textContent = data.current.condition.text;
            humidity.textContent = `Humidity: ${data.current.humidity}%`;
            windSpeed.textContent = `Wind: ${data.current.wind_kph} km/h`;
            pressure.textContent = `Pressure: ${data.current.pressure_mb} hPa`;
            weatherInfo.style.display = 'block';
        } catch (error) {
            errorMessage.style.display = 'block';
            console.error('Error fetching weather data:', error);
        }
    }
});
