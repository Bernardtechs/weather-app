const apiKey = "86922cd8366b568f110dd50724a47374";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const loading=document.getElementById("loading");

async function getWeather(city){

    try{
       loading.textContent="loading...";
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();
        const mainWeather=data.weather[0].main;
        if(mainWeather === "Clouds"){
    document.body.style.background =
    "linear-gradient(135deg, #757F9A, #D7DDE8)";
}

else if(mainWeather === "Clear"){
    document.body.style.background =
    "linear-gradient(135deg, #56CCF2, #2F80ED)";
}

else if(mainWeather === "Rain"){
    document.body.style.background =
    "linear-gradient(135deg, #373B44, #4286f4)";
}

else{
    document.body.style.background =
    "linear-gradient(135deg, #4facfe, #00f2fe)";
}
        console.log(data);

        cityName.textContent = data.name;

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        description.textContent =
            data.weather[0].description;

        humidity.textContent =
            `Humidity: ${data.main.humidity}%`;

        wind.textContent =
            `Wind: ${data.wind.speed} km/h`;

        const iconCode = data.weather[0].icon;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            loading.textContent="";

    }
    catch(error){
        loading.textContent="";
        alert(error.message);


    }

}

searchBtn.addEventListener("click", () => {

    const city = cityInput.value;

    if(city){
        getWeather(city);
    }

});
cityInput.addEventListener("keypress",(event)=>{
if(event.key ==="Enter")
{const city = cityInput.value.trim();
    if(city){
        getWeather(city);
    }
}
});
getWeather("nyeri");
locationBtn.addEventListener("click", () => {

    navigator.geolocation.getCurrentPosition(

        (position) => {

            alert("Location accessed!");

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
         getWeatherByLocation(latitude,longitude);
        getForecast(latitude,longitude);
        },

        (error) => {

            alert(error.message);

            console.log(error);

        }

    );

});
async function getWeatherByLocation(lat, lon){

    try{

        loading.style.display = "block";

        const response = await fetch(

            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

        );

        const data = await response.json();

        cityName.textContent = data.name;

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        description.textContent =
            data.weather[0].description;

        humidity.textContent =
            `Humidity: ${data.main.humidity}%`;

        wind.textContent =
            `Wind: ${data.wind.speed} km/h`;

        const iconCode =
            data.weather[0].icon;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        loading.style.display = "none";

    }

    catch(error){

        loading.style.display="none";

        alert(error.message);

    }

}
async function getForecast(lat, lon) {

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        const forecastContainer = document.getElementById("forecast");

        forecastContainer.innerHTML = "";

        // We pick every 8th item (24h intervals)
        const dailyData = data.list.filter((item, index) => index % 8 === 0);

        dailyData.slice(0, 5).forEach(day => {

            const div = document.createElement("div");
            div.classList.add("forecast-day");

            div.innerHTML = `
                <p>${new Date(day.dt * 1000).toDateString().slice(0, 10)}</p>
                <p>🌡 ${Math.round(day.main.temp)}°C</p>
                <p>${day.weather[0].main}</p>
            `;

            forecastContainer.appendChild(div);
        });

    } catch (error) {
        console.log(error);
    }
}
