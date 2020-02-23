/*
    This is the component for the 'Weather forecast'
    It fetches data from the Weatherstack API using the 'Fetch API' to display actual weather data
     (would have used OpenWeatherMap - but ran out of requests allocated for the free tier)
    Also using moment.js here to display the current day of the week
*/

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

const Weather = () => {
    const [location, setLocation] = useState('City')
    const [temperature, setTemperature] = useState(0)
    const [feelsLike, setFeelsLike] = useState(0)
    const [precip, setPrecip] = useState(0)
    const [humidity, setHumidity] = useState(0)
    const [wind, setWind] = useState(0)

    useEffect(() => {
        //Asynchronously fetching weather data using 'Fetch API'
        async function fetchData() {
          await fetch("http://api.weatherstack.com/current?access_key=b13f21dddfcbe0473a284618c6e3e069&query=Aalborg")
          .then(response => response.json())
          .then(response => {
              //Using the data coming back from the response we are setting values for the initial state of the component
              setLocation(response.location.name)
              setTemperature(response.current.temperature)
              setFeelsLike(response.current.feelslike)
              setPrecip(response.current.precip)
              setHumidity(response.current.humidity)
              setWind(response.current.wind_speed)
          })
          
        }
    
        fetchData();
    }, []);

    return (
        <div className="device-card">
            <div className="card__header">
                <div className="card__header__left">
                    <p className="card__header--title">{location.toUpperCase()}</p>
                    <p className="card__header--info">{moment().format('dddd')}</p>
                </div>
                <div className="card__header__right">
                    <span className="circle"></span>
                    <span className="circle"></span>
                    <span className="circle"></span>
                </div>
            </div>
            <div className="card__body">
                <div className="">
                    <FontAwesomeIcon icon={faCloud} size="6x" className="card__body--cloudIcon"/>
                </div>
                <div className="card__body--content">
                    <span>{Math.round(temperature)}<sup>&#8451;</sup></span>
                    <p>Feels like: {feelsLike}<sup>&#8451;</sup></p>
                </div>
                <div className="card__body--details">
                    <p>Precip: {precip} %</p>
                    <p>Humidity: {humidity} %</p>
                    <p>Wind: {wind} m/s</p>
                </div>
            </div>
            <div className="card__footer">
                <span className="card__footer--indicator"></span>
                <p>Last updated few hours ago</p>
            </div>
        </div>
    )
}

export default Weather