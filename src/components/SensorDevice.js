import React, { useState, useEffect } from 'react'
import SensorValues from '../components/SensorValues'

const SensorDevice = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [values, setValues] = useState([])
    const [percent, setPercent] = useState(0)

    useEffect(() => {
        async function getDevice() {
            await fetch('/smarthome/services/2.0/network/7a8ca0be-3f87-4e8d-ae4f-e4de75323084/device/67965514-5ddd-4e25-a58d-e52295bb09a7')
            .then(response => response.json()).
            then(data => {
                console.log(data)
                setName(data.name)
                setDescription(data.description)
                setValues(data.value)
                    const per = (data.value[0].state[0].data / 5000) * 100
                    setPercent(per)
            })
        }

        getDevice()
    }, [])

    //console.log(values)

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
                        return <SensorValues key={value.name} {...value} />
                    })}
                </div>
                <div className="progress-bar">
                    <div className="filler" style={{ height: `${percent}%` }}/>
                </div>
            </div>
            <div className="card__footer">
                <p>Last updated few seconds ago</p>
            </div>
        </div>
    )
}

export default SensorDevice