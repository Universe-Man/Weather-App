// import React from 'react'
import sunny from "../assets/images/sunny.png";
import cloudy from "../assets/images/cloudy.png";
import rainy from "../assets/images/rainy.png";
import snowy from "../assets/images/snowy.png";
// import loading from "../assets/images/loading.gif";

const WeatherApp = () => {
  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot" />
            <div className="location">London</div>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Enter Location" />
            <i className="fa-solid fa-magnifying-glass" />
          </div>
        </div>
        <div className="weather">
          <img src={sunny} alt="sunny" />
          <div className="weather-type">Clear</div>
          <div className="temp">28°</div>
        </div>
        <div className="weather-date">
          <p>Wed, Nov 13th, 2024</p>
        </div>
        <div className="weather-data">
          <div className="humidity">
            <div className="data-name">Humidity</div>
            <i className="fa-solid fa-droplet" />
            <div className="data">55%</div>
          </div>
          <div className="wind">
            <div className="data-name">Wind</div>
            <i className="fa-solid fa-wind" />
            <div className="data">3 km/h</div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default WeatherApp