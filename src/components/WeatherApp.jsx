import { useState } from "react";
import sunny from "../assets/images/sunny.png";
import cloudy from "../assets/images/cloudy.png";
import rainy from "../assets/images/rainy.png";
import snowy from "../assets/images/snowy.png";
// import loading from "../assets/images/loading.gif";

const WeatherApp = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("");
  const [units, setUnits] = useState("imperial");

  const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };
  
  const search = async () => {
    const url = `${import.meta.env.VITE_OPEN_WEATHER_CITY_URL}?q=${location}&units=${units}&appid=${api_key}`;
    const response = await fetch(url);
    const searchData = await response.json();
    console.log(searchData);
    setData(searchData);
    setLocation("");
  }

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      search();
    };
  };

  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot" />
            <div className="location">{data.name}</div>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Enter Location" value={location} onChange={handleInputChange} onKeyDown={handleEnterKey} />
            <i className="fa-solid fa-magnifying-glass" onClick={search} />
          </div>
        </div>
        <div className="weather">
          <img src={sunny} alt="sunny" />
          <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
          <div className="temp">{data.main ? (`${Math.floor(data.main.temp)}°`) : null}{data.main ? (units === "imperial" ? ("F") : ("C")) : null}</div>
        </div>
        <div className="weather-date">
          <p>Wed, Nov 13th, 2024</p>
        </div>
        <div className="weather-data">
          <div className="humidity">
            <div className="data-name">Humidity</div>
            <i className="fa-solid fa-droplet" />
            <div className="data">{data.main ? `${data.main.humidity}%` : null}</div>
          </div>
          <div className="wind">
            <div className="data-name">Wind</div>
            <i className="fa-solid fa-wind" />
            <div className="data">{data.wind ? data.wind.speed : null} {data.main ? (units === "imperial" ? ("mph") : ("km/h")) : null}</div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default WeatherApp