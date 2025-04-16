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
const nextDay = document.getElementById("tommorrow");
const nextWeather = document.getElementById("next");
const nextDescription = document.getElementById("desc1")
const nextTemp = document.getElementById("temp1");
const nextAddOne = document.getElementById("tommorrow1")
const nextWeatherAddOne = document.getElementById("next1");
const nextTempAddOne = document.getElementById("temp2");
const nextDescriptionAddOne = document.getElementById("desc2");
const nextAddTwo = document.getElementById("tommorrow2");
const nextDescriptionAddTwo = document.getElementById("desc3");
const nextWeatherAddTwo = document.getElementById("next2");
const nextTempAddTwo = document.getElementById("temp3");

// fetch the weather api
async function getWeather(city) {
    const API_KEY = "a86fcc0d3b6e4a62fb57b5bd6546e50c";
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        // console.log(data);
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
function updateSunProgress(sunriseUnit, sunsetUnit) {
    const now = Math.floor(Date.now() / 1000);
    // console.log(now) 
    const totalDuration = sunsetUnit - sunriseUnit;
    const currentProgress = now - sunriseUnit;
    const percentage = Math.min(Math.max((currentProgress / totalDuration) * 100, 0), 100);

    const sunProgressBar = document.getElementById("sunProgress");
    sunProgressBar.style.width = `${percentage}%`;

    // Format and display times
    document.getElementById("sunriseTime").innerText = formatTime(sunriseUnit);
    document.getElementById("sunsetTime").innerText = formatTime(sunsetUnit);
}

function formatTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}



// this is to get the next weather
async function getNextWeather(city) {
    try {
        const response = await fetch(

            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a86fcc0d3b6e4a62fb57b5bd6546e50c&units=metric`
        );
        const data = await response.json();
        // console.log(data);
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

    const data = await getWeather(city);
    const weatherData = await getNextWeather(city);
    console.log(weatherData);

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

    // next weatherdata output
    if (weatherData.cod) {

        // this is to fetch for tommorrow 
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDate = tomorrow.getDate();
        const tomorrowMonth = tomorrow.getMonth();
        const tomorrowYear = tomorrow.getFullYear();

        // this is to fetch for day after tommorrow
        const tomorrowAddOne = new Date();
        tomorrowAddOne.setDate(tomorrowAddOne.getDate() + 2);
        const tomorrowDateAddOne = tomorrowAddOne.getDate();
        const tomorrowMonthAddOne = tomorrowAddOne.getMonth();
        const tomorrowYearAddOne = tomorrowAddOne.getFullYear();

        // this is to fetch for two days later
        const tomorrowAddTwo = new Date();
        tomorrowAddTwo.setDate(tomorrowAddTwo.getDate() + 3);
        const tomorrowDateAddTwo = tomorrowAddTwo.getDate();
        const tomorrowMonthAddTwo = tomorrowAddTwo.getMonth();
        const tomorrowYearAddTwo = tomorrowAddTwo.getFullYear();

        // loop through the weatherdata list
        weatherData.list.forEach(countryWeather => {
            const weatherDate = new Date(countryWeather.dt_txt);
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const weatherIcon = countryWeather.weather[0].icon;
            // next
            if (
                weatherDate.getDate() === tomorrowDate &&
                weatherDate.getMonth() === tomorrowMonth &&
                weatherDate.getFullYear() === tomorrowYear
            ) {
                nextDay.innerText = days[weatherDate.getDay()]
                nextWeather.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
                nextTemp.innerText = countryWeather.main.temp + "°C";
                nextDescription.innerText = countryWeather.weather[0].description;
            }
            // day after tomorrow
            else if(
                weatherDate.getDate() === tomorrowDateAddOne &&
                weatherDate.getMonth() === tomorrowMonthAddOne &&
                weatherDate.getFullYear() === tomorrowYearAddOne
            ){
                nextAddOne.innerText = days[weatherDate.getDay()];
                nextWeatherAddOne.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
                nextTempAddOne.innerText = countryWeather.main.temp + "°C";
                nextDescriptionAddOne.innerText = countryWeather.weather[0].description;
            }

            // two days after
            else if(
                weatherDate.getDate() === tomorrowDateAddTwo &&
                weatherDate.getMonth() === tomorrowMonthAddTwo &&
                weatherDate.getFullYear() === tomorrowYearAddTwo
            ){
                nextAddTwo.innerText = days[weatherDate.getDay()];
                nextWeatherAddTwo.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
                nextTempAddTwo.innerText = countryWeather.main.temp + "°C";
                nextDescriptionAddTwo.innerText = countryWeather.weather[0].description;
            }




        });
    }


    else {
        console.error("Could not fetch")
    }




})

// to get my location using the lat and lon

async function getCountryFromLatLng(lat, lon) {
    try {
        //Reverse geocode lat/lon to get country name
        const reverseRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        const reverseData = await reverseRes.json();
        // console.log(reverseData)

        const countryName = reverseData.address.country;
        // console.log("You are in:", countryName);

        //Fetch country details from restcountries using the name
        const countryRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=a86fcc0d3b6e4a62fb57b5bd6546e50c&units=metric`);
        const countryData = await countryRes.json();


        // const weatherNext = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${countryName}&appid=a86fcc0d3b6e4a62fb57b5bd6546e50c&units=metric`)
        // const weatherNextData = await weatherNext.json();

        // console.log("Country details:", countryData);
        // console.log(reverseData)
        // console.log(weatherNextData)
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
