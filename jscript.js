const searchBtn = document.getElementById("search");
const inputValue = document.getElementById("input");
const countryName = document.getElementById("countryname");
const date = document.getElementById("date");
const weatherDescription = document.getElementById("weatherdetails");
const weatherImage = document.getElementById("image");
const temperature = document.getElementById("temp");
const feelTemp = document.getElementById("feeltemp");
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

// sunrise and sunset function function
function updateSunProgress(sunriseUnix, sunsetUnix) {
    const now = Math.floor(Date.now() / 1000); // current time in UNIX
    const totalDuration = sunsetUnix - sunriseUnix;
    const currentProgress = now - sunriseUnix;
    const percentage = Math.min(Math.max((currentProgress / totalDuration) * 100, 0), 100);

    const sunProgressBar = document.getElementById("sunProgress");
    sunProgressBar.style.width = `${percentage}%`;

    // Format and display times
    document.getElementById("sunriseTime").innerText =   formatTime(sunriseUnix);
    document.getElementById("sunsetTime").innerText =  formatTime(sunsetUnix);
}

function formatTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}




// Usage
searchBtn.addEventListener('click', async () => {
    let city = inputValue.value.trim();
    inputValue.value = "";

    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const data = await getWeather(city);

    if (data && data.cod === 200) {
        countryName.innerText = data.name;
        date.innerText = new Date().toDateString();


        const iconCode = data.weather[0].icon;

        if (data.main.temp >= 30) {
            weatherImage.src = `https://openweathermap.org/img/wn/${iconCode}.png`
            temperature.innerText = data.main.temp + "°C";
            feelTemp.innerText = "feels-like " + data.main.feels_like + "°C";
            weatherDescription.innerText = data.weather[0].description;
        }
        else if (data.main.temp >= 20 && data.main.temp < 30) {
            weatherImage.src = `https://openweathermap.org/img/wn/${iconCode}.png`
            temperature.innerText = data.main.temp + "°C";
            feelTemp.innerText = "feels-like " + data.main.feels_like + "°C";
            weatherDescription.innerText = data.weather[0].description;
        }

        else if (data.main.temp > 15) {
            weatherImage.src = `https://openweathermap.org/img/wn/${iconCode}.png`
            temperature.innerText = data.main.temp + "°C";
            feelTemp.innerText = "feels-like " + data.main.feels_like + "°C";
            weatherDescription.innerText = data.weather[0].description;
        }

        else if (data.main.temp > 5 && data.main.temp < 15) {
            weatherImage.src = `https://openweathermap.org/img/wn/${iconCode}.png`
            temperature.innerText = data.main.temp + "°C";
            feelTemp.innerText = "feels-like " + data.main.feels_like + "°C";
            weatherDescription.innerText = data.weather[0].description
        }
        else {
            weatherImage.src = `https://openweathermap.org/img/wn/${iconCode}.png`
            temperature.innerText = data.main.temp + "°C";
            feelTemp.innerText = "feels-like " + data.main.feels_like + "°C";
            weatherDescription.innerText = data.weather[0].description
        }


        // the humidity wind speed and pressure output

        humidity.innerText = data.main.humidity + "g/m³";
        pressure.innerText = data.main.pressure + "Pa";
        windSpeed.innerText = data.wind.speed + "m/s";



        updateSunProgress(data.sys.sunrise, data.sys.sunset);





    }
    else {
        console.error("Not a valid city name")
        alert("Not a city name");
    }


})

// to get my location using the lat and lon

async function getCountryFromLatLng(lat, lon) {
    try {
        //Reverse geocode lat/lon to get country name
        const reverseRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        const reverseData = await reverseRes.json();

        const countryName = reverseData.address.country;
        console.log("You are in:", countryName);

        //Fetch country details from restcountries using the name
        const countryRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=a86fcc0d3b6e4a62fb57b5bd6546e50c&units=metric`);
        const countryData = await countryRes.json();

        console.log("Country details:", countryData);
        console.log(reverseData)
        return countryData;
    } catch (error) {
        console.error("Error fetching country by lat/lon:", error);
        return null;
    }
}

// get the lat and log from here
navigator.geolocation.getCurrentPosition(
    async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const countryData = await getCountryFromLatLng(lat, lon);
        if (countryData) {
            // do something with countryData, like display card  
            countryName.innerText = countryData.name;

            date.innerText = new Date().toDateString();


            const iconCode = countryData.weather[0].icon;

            if (countryData.main.temp >= 30) {
                weatherImage.src = `https://openweathermap.org/img/wn/${iconCode}.png`
                temperature.innerText = countryData.main.temp + "°C";
                feelTemp.innerText = "feels-like " + countryData.main.feels_like + "°C";
                weatherDescription.innerText = countryData.weather[0].description;
            }
            else if (countryData.main.temp >= 20 && countryData.main.temp < 30) {
                weatherImage.src = `https://openweathermap.org/img/wn/${iconCode}.png`
                temperature.innerText = countryData.main.temp + "°C";
                feelTemp.innerText = "feels-like " + countryData.main.feels_like + "°C";
                weatherDescription.innerText = countryData.weather[0].description;
            }

            else if (countryData.main.temp > 15) {
                weatherImage.src = `https://openweathermap.org/img/wn/${iconCode}.png`
                temperature.innerText = countryData.main.temp + "°C";
                feelTemp.innerText = "feels-like " + countryData.main.feels_like + "°C";
                weatherDescription.innerText = countryData.weather[0].description;
            }

            else if (countryData.main.temp > 5 && countryData.main.temp < 15) {
                weatherImage.src = `https://openweathermap.org/img/wn/${iconCode}.png`
                temperature.innerText = countryData.main.temp + "°C";
                feelTemp.innerText = "feels-like " + countryData.main.feels_like + "°C";
                weatherDescription.innerText = countryData.weather[0].description
            }
            else {
                weatherImage.src = `https://openweathermap.org/img/wn/${iconCode}.png`
                temperature.innerText = countryData.main.temp + "°C";
                feelTemp.innerText = "feels-like " + countryData.main.feels_like + "°C";
                weatherDescription.innerText = countryData.weather[0].description
            }


            // the humidity wind speed and pressure output

            humidity.innerText = countryData.main.humidity + "g/m³";
            pressure.innerText = countryData.main.pressure + "Pa";
            windSpeed.innerText = countryData.wind.speed + "m/s";


            updateSunProgress(countryData.sys.sunrise, countryData.sys.sunset);



            // console.log("Country name:", countryData.name);
        }
    },
    (err) => {
        console.error("Geolocation error:", err);
    }
);

