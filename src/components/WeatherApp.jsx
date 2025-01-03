import { useState, useEffect } from "react";
import sunny from "../assets/images/sunny.png";
import cloudy from "../assets/images/cloudy.png";
import rainy from "../assets/images/rainy.png";
import snowy from "../assets/images/snowy.png";
import loadingImg from "../assets/images/loading.gif";

const WeatherApp = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("");
  const [lastLocation, setLastLocation] = useState("");
  const [units, setUnits] = useState("imperial");
  const [loading, setLoading] = useState(false);
  const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      setLoading(true);
      let defaultLocation = "los angeles";
      if (lastLocation.trim() !== "") {
        defaultLocation = lastLocation;
      };
      const url = `${import.meta.env.VITE_OPEN_WEATHER_CITY_URL}?q=${defaultLocation}&units=${units}&appid=${api_key}`;
      const response = await fetch(url);
      const defaultData = await response.json();
      setData(defaultData);
      setLastLocation(defaultLocation);
      setLoading(false);
    };
    fetchDefaultWeather();
  }, [units]);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };
  
  const search = async () => {
    if (location.trim() !== "") {
      const url = `${import.meta.env.VITE_OPEN_WEATHER_CITY_URL}?q=${location}&units=${units}&appid=${api_key}`;
      const response = await fetch(url);
      const searchData = await response.json();
      if (searchData.cod !== 200) {
        setData({notFound: true});
      } else {
        setData(searchData);
        setLastLocation(location);
        setLocation("");
      };
      setLoading(false);
    };
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      search();
    };
  };

  const toggleUnits = () => {
    if (units === "imperial") {
      setUnits("metric");
    } else if (units === "metric") {
      setUnits("imperial");
    };
  };

  const weatherImages = {
    clear: sunny,
    clouds: cloudy,
    rain: rainy,
    snow: snowy,
    haze: cloudy,
    mist: cloudy,
  };

  const weatherImage = data.weather ? weatherImages[data.weather[0].main.toLowerCase()] : null;

  const backgroundImages = {
    clear: "linear-gradient(to right, #f3b07c, #fcd283)",
    clouds: "linear-gradient(to right, #57d6d4, #71eeec)",
    rain: "linear-gradient(to right, #5bc8fb, #80eaff)",
    snow: "linear-gradient(to right, #aff2ff, #fff)",
    haze: "linear-gradient(to right, #57d6d4, #71eeec)",
    mist: "linear-gradient(to right, #57d6d4, #71eeec)",
  };

  const backgroundImage = data.weather ? backgroundImages[data.weather[0].main.toLowerCase()] : "linear-gradient(to right, #f3b07c, #fcd283)";

  const currentDate = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentDayOfWeek = daysOfWeek[currentDate.getDay()];
  const currentMonth = months[currentDate.getMonth()];
  const currentDayOfMonth = currentDate.getDate();
  const currentYear = currentDate.getFullYear();
  const dateSuffix = (currentDayOfMonth) => {
    if (currentDayOfMonth % 10 === 1 && currentDayOfMonth !== 11) {
      return "st";
    } else if (currentDayOfMonth % 10 === 2 && currentDayOfMonth !== 12) {
      return "nd";
    } else if (currentDayOfMonth % 10 === 3 && currentDayOfMonth !== 13) {
      return "rd";
    } else {
      return "th";
    };
  };
  const formattedDate = `${currentDayOfWeek}, ${currentMonth} ${currentDayOfMonth}${dateSuffix(currentDayOfMonth)}, ${currentYear}`;

  return (
    <>
      <div className="container" style={{backgroundImage}}>
        <div className="weather-app" style={{backgroundImage: backgroundImage && backgroundImage.replace ? backgroundImage.replace("to right", "to top") : null}}>
          <div className="search">
            <div className="search-top">
              <div className="search-location">
                <i className="fa-solid fa-location-dot" />
                <div className="location">{data.name}</div>
              </div>
              <div className="units-toggle" onClick={toggleUnits}>{units === "imperial" ? ("°C") : ("°F")}</div>
            </div>
            <div className="search-bar">
              <input type="text" placeholder="Enter Location" value={location} onChange={handleInputChange} onKeyDown={handleEnterKey} />
              <i className="fa-solid fa-magnifying-glass" onClick={search} />
            </div>
          </div>
          {loading ? (
            <img className="loader" src={loadingImg} alt="loading" />
          ) : data.notFound ? (
            <div className="not-found">Not Found 😵‍💫</div>
          ) : (
            <>
              <div className="weather">
                <img src={weatherImage} alt="weather-image" />
                <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
                <div className="temp">{data.main ? (`${Math.floor(data.main.temp)}°`) : null}{data.main ? (units === "imperial" ? ("F") : ("C")) : null}</div>
              </div>
              <div className="weather-date">
                <p>{formattedDate}</p>
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
            </>
          )}
        </div>
      </div>
      <footer>© {currentYear} | Built by <a href={import.meta.env.VITE_IAN_POLLACK_WEBSITE_URL} target="_blank">Ian Pollack</a></footer>
    </>
  );
};

export default WeatherApp;