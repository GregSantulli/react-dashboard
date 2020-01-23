
import React from 'react';



 
const weatherIconMap = {
  'clear-day': "wi-day-sunny",
  'clear-night': "wi-night-clear",
  'rain': "wi-rain",
  'snow': "wi-snow",
  'sleet': "wi-sleet",
  'wind': "wi-cloudy-gusts",
  'fog': "wi-fog",
  'cloudy': "wi-cloudy",
  'partly-cloudy-day': "wi-day-cloudy",
  'partly-cloudy-night': "wi-night-alt-cloudy",
}


export default function(icon){
  const file = weatherIconMap[icon] || "wi-day-sunny"
  return <img className="weather-icon" src={`/${file}.svg`}/>
}
