import {useState} from 'react';

const api = {
  baseUrl:"https://api.openweathermap.org/data/2.5/weather"
}
export default function App() {
  let [location,setLocation] = useState('');
  let [weather, setWeather] = useState({});

  function onInputChange(e) {
    setLocation(e.target.value);
  }

  const dateBuilder =(d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }

  const triggerSearch =(e) =>{
    if(e.key == "Enter") {
      fetch(`${api.baseUrl}?q=${location}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
      .then(res => res.json())
      .then(res=>{
        setWeather(res);
        setLocation('');
      });
    }
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search.." value={location} onChange={onInputChange} onKeyPress={triggerSearch}/>
        </div>
        {(typeof weather.main != "undefined") ?
        (<div className="info"><div className="location-box">
          <div className="location">
            {weather.name} , {weather.sys.country}
          </div>
          <div className="date">
            {dateBuilder(new Date())}
          </div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {weather.main.temp}°C
          </div>
          <div className="weather">
            {weather.weather[0].main}
          </div>
        </div> </div>): ''}
      </main>
    </div>
  ); 

}
