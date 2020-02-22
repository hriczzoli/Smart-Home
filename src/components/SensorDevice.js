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

    const wsUri = "wss://www.seluxit.com/smarthome/services/2.0/network/7a8ca0be-3f87-4e8d-ae4f-e4de75323084/websocket";

    useEffect(() => {
        async function getDevice() {
            await fetch('/smarthome/services/2.0/network/7a8ca0be-3f87-4e8d-ae4f-e4de75323084/device/67965514-5ddd-4e25-a58d-e52295bb09a7')
            .then(response => response.json()).
            then(data => {
                //console.log(data)
                setName(data.name)
                setDescription(data.description)
                setUpdatedAt(data.value[0].state[0].timestamp)
                setValues(data.value)
                    const per = (data.value[0].state[0].data / 3000) * 100
                    setPercent(per)
                setColor(data.value[6].state[0].data)
            })
        }

        getDevice()
    }, [])

    useEffect(() => {
        const websocket = new WebSocket(wsUri);
        websocket.onopen = function(evt) { onOpen(evt) };

        const onOpen = (evt) => {
            //console.log(evt)
        }

        //update co2 value
        const updateCO2 = new WebSocket(wsUri)
        updateCO2.onmessage = (e) => {
            console.log(JSON.parse(e.data))

            //refresh sensor values
            fetch('/smarthome/services/2.0/network/7a8ca0be-3f87-4e8d-ae4f-e4de75323084/device/67965514-5ddd-4e25-a58d-e52295bb09a7')
            .then(response => response.json()).
            then(data => {
                setValues(data.value)
                    const per = (data.value[0].state[0].data / 3000) * 100
                    setPercent(per)
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
                        return value.name === 'Alarm' || value.name === 'Color indicator' ? <span key={value.name}></span> :
                            <div className="sensor-value" key={value.name}>
                                {value.name === 'CO2' ? <span className="co2">{value.name} :</span> : <span>{value.name} :</span>}
                                {value.name === 'CO2' ? <span className="co2">{Math.round(value.state[0].data)} {value.number.unit}</span> : <span>{Math.round(value.state[0].data)} {value.number.unit}</span>}
                            </div>
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