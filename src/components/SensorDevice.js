/*
    This is the component for the 'Indoor module - with sensors'
    It fetches values of the different sensors of the device from the network
    It also subscribes to changes of the data coming from the sensors through WebSocket - to refresh the displayed values
        (every 1 minute) -> currently 'only' CO2 sensor
        as far as I could tell from the response that's the only value that's being refreshed
    (also uses moment.js to calculate elapsed time from the last update)
*/

import React, { useState, useEffect } from 'react'
import SensorValues from '../components/SensorValues'
import moment from 'moment'

const SensorDevice = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [values, setValues] = useState([])
    const [percent, setPercent] = useState(0)
    const [color, setColor] = useState('')
    const [updatedAt, setUpdatedAt] = useState('')

    //WebSocket URI
    const wsUri = "wss://www.seluxit.com/smarthome/services/2.0/network/7a8ca0be-3f87-4e8d-ae4f-e4de75323084/websocket";
    //Indoor module URI
    const deviceUri = "/smarthome/services/2.0/network/7a8ca0be-3f87-4e8d-ae4f-e4de75323084/device/67965514-5ddd-4e25-a58d-e52295bb09a7"

    useEffect(() => {
        //Asynchronously fetching device's data from the network using 'Fetch API'
        async function getDevice() {
            await fetch(deviceUri)
            .then(response => response.json()).
            then(data => {
                //Making use of the data coming back from the response -> we set the inital state of the values that the component is using
                setName(data.name)
                setDescription(data.description)
                setUpdatedAt(data.value[0].state[0].timestamp)
                setValues(data.value)
                    //We calculate percentage for the animation to display the changing CO2 level
                    //We use 3000PPM as the 'maximum' value since constant exposure to that level of CO2 has
                    //serious consequences to our health
                    const per = (data.value[0].state[0].data / 3000) * 100
                    setPercent(per)
                setColor(data.value[6].state[0].data)
            })
        }

        getDevice()
    }, [])

    useEffect(() => {
        //We initialize WebSocket connection
        const websocket = new WebSocket(wsUri);

        //We update CO2 value with the data coming from 
        websocket.onmessage = (e) => {
            //Could not access attributes from the object coming back with the approach below
            ///////console.log(JSON.parse(e.data.data))
            //Also noticed that CO2 value is the only sensor value coming back
            //So decided to fetch the all the device's values from the network using 'Fetch API'

            //Refresh sensor values by fetching data from network
            fetch(deviceUri)
            .then(response => response.json()).
            then(data => {
                //Updating the state of values' and calculating percentage using the new values
                setValues(data.value)
                    const per = (data.value[0].state[0].data / 3000) * 100
                    setPercent(per)
                //Setting the current color coming from the device's color indicator
                setColor(data.value[6].state[0].data)
            })
        }
    }, [])

    return (
        <div className="device-card sensor-card">
            <div className="card__header">
                <div className="card__header__left">
                    <p className="card__header--title">{name}</p>
                    <p className="card__header--info">{description}</p>
                </div>
                <div className="card__header__right">
                    <span className="circle"></span>
                    <span className="circle"></span>
                    <span className="circle"></span>
                </div>
            </div>
            <div className="sensor-card__body">
                <div className="sensor-value__container">
                    {values.map((value) => {
                        return <SensorValues key={value.name} {...value}/>
                    })}
                </div>
                <div className="progress-bar">
                    <span className="filler-percent">{Math.round(percent)}%</span>
                    <div className="filler" style={{ height: `${percent}%`, background: `#${color}` }}/>
                </div>
            </div>
            <div className="card__footer">
                <p>Last updated {moment().startOf(updatedAt).fromNow()}</p>
            </div>
        </div>
    )
}

export default SensorDevice