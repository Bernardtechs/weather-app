const apiKey = "86922cd8366b568f110dd50724a47374";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

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