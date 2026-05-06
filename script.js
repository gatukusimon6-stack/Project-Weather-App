const apiKey = "ca78719334904d78e59634320c20232b";

const form = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const details = document.getElementById("details");
const weatherDiv = document.getElementById("weather");
const error = document.getElementById("error");
const loading = document.getElementById("loading");
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = cityInput.value.trim();

    // Validation
    if (!city) {
        error.textContent = "Please enter a city name";
        error.classList.remove("hidden");
        return;
    }

    // Show loading
    loading.classList.remove("hidden");
    weatherDiv.classList.add("hidden");
    error.classList.add("hidden");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Display data
        cityName.textContent = data.name;
        temp.textContent = `Temperature: ${data.main.temp}°C`;
        description.textContent = `Condition: ${data.weather[0].description}`;
        details.textContent = `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s`;

        weatherDiv.classList.remove("hidden");

    } catch (err) {
        error.textContent = err.message;
        error.classList.remove("hidden");
    } finally {
        // Always hide loading
        loading.classList.add("hidden");
    }
});