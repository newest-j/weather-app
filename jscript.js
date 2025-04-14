const searchBtn = document.getElementById("search");
const inputValue = document.getElementById("input");
const countryName = document.getElementById("countryname");
const date = document.getElementById("date");
const weatherDescription = document.getElementById("weatherdetails");
const weatherImage = document.getElementById("image");
const temperature = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const windSpeed = document.getElementById("wind");
// fetch the weather api
async function getWeather(city) {
    const API_KEY = "a86fcc0d3b6e4a62fb57b5bd6546e50c";
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        console.log(data);
        // console.log(`Weather in ${city}:`);
        // console.log("Temperature:", data.main.temp, "°C");
        // console.log("Description:", data.weather[0].description);
        // console.log("Humidity:", data.main.humidity, "%");

        return data;
    } catch (error) {
        console.error("Error fetching weather:", error);
        return null;
    }
}

// Usage
searchBtn.addEventListener('click', async () => {
    let city = inputValue.value.trim();
    inputValue.value = "";

    if (!city) {
        alert("Please enter a city name!");
        return;
    }
    
    const data = await  getWeather(city);
   
    if (data && data.cod === 200) {
        countryName.innerText = data.name;
        date.innerText = new Date().toDateString();


        const iconCode = data.weather[0].icon;

        if(data.main.temp >= 30){
            weatherImage.src = `https://openweathermap.org/img/wn/${iconCode}.png`
            temperature.innerText = data.main.temp + "°C";
            weatherDescription.innerText = "Sunny Day"
        }
        else if(data.main.temp >= 20 && data.main.temp < 30){
             weatherImage.src = `https://openweathermap.org/img/wn/${iconCode}.png`
             temperature.innerText = data.main.temp + "°C";
            weatherDescription.innerText = data.weather[0].description;
        }

        else if(data.main.temp > 15){
            weatherImage.src = `https://openweathermap.org/img/wn/${iconCode}.png`
            temperature.innerText = data.main.temp + "°C";
            weatherDescription.innerText = data.weather[0].description;
       }
       
        else if(data.main.temp > 5 && data.main.temp < 15){
              weatherImage.src = `https://openweathermap.org/img/wn/${iconCode}.png`
             temperature.innerText = data.main.temp + "°C";
             weatherDescription.innerText = data.weather[0].description
        }
        else{
             weatherImage.src = `https://openweathermap.org/img/wn/${iconCode}.png`
             temperature.innerText = data.main.temp + "°C";
             weatherDescription.innerText = data.weather[0].description
        }


        // the humidity wind speed and pressure output

        humidity.innerText = data.main.humidity + "g/m³";
        pressure.innerText = data.main.pressure + "Pa";
        windSpeed.innerText = data.wind.speed + "m/s";



    }
    else {
        console.error("Not a valid city name")
        alert("Not a city name");
    } 


})