const apiKey = "ca78719334904d78e59634320c20232b"; // 👈 paste your key here

const form = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherDiv = document.getElementById("weather");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const details = document.getElementById("details");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = cityInput.value;

    // Show loading
    loading.classList.remove("hidden");
    weatherDiv.classList.add("hidden");
    error.classList.add("hidden");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        // Display data
        cityName.textContent = data.name;
        temp.textContent = `Temperature: ${data.main.temp}°C`;
        description.textContent = `Condition: ${data.weather[0].description}`;
        details.textContent = `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s`;

        weatherDiv.classList.remove("hidden");

    } 
catch (err) {
    console.log(err);
    error.textContent = err.message;
    error.classList.remove("hidden");
    loading.classList.add("hidden");
}
});