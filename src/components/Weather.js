import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud } from '@fortawesome/free-solid-svg-icons'

const Weather = () => {
    const [temperature, setTemperature] = useState(0)
    const [feelsLike, setFeelsLike] = useState(0)
    const [precip, setPrecip] = useState(0)
    const [humidity, setHumidity] = useState(0)
    const [wind, setWind] = useState(0)

    useEffect(() => {
        // async function fetchData() {
        //   await fetch("http://api.weatherstack.com/current?access_key=b13f21dddfcbe0473a284618c6e3e069&query=Aalborg")
        //   .then(response => response.json())
        //   .then(response => {
        //       console.log(response)
        //       setTemperature(response.current.temperature)
        //       setFeelsLike(response.current.feelslike)
        //       setPrecip(response.current.precip)
        //       setHumidity(response.current.humidity)
        //       setWind(response.current.wind_speed)
        //   })
          
        // }
    
        // fetchData();
    }, []);

    return (
        <div className="device-card">
            <div className="card__header">
                <div className="card__header__left">
                    <p className="card__header--title">Aalborg</p>
                    <p className="card__header--info">Monday</p>
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