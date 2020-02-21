import React, { useState, useEffect } from 'react'
import Switch from "react-switch";

const Stove = () => {
    const [name, setName] = useState('')
    const [isOn, setIsOn] = useState(false)
    const [status, setStatus] = useState('')
    const [alarm, setAlarm] = useState('')
    const [heatLevel, setHeatLevel] = useState()
    const [desiredTemperature, setDesiredTemperature] = useState('')
    const [smokeTemperature, setSmokeTemperature] = useState('')

    useEffect(() => {
        async function getDevice() {
            await fetch('/smarthome/services/2.0/network/7a8ca0be-3f87-4e8d-ae4f-e4de75323084/device/bc455c88-ae17-4fd6-a4f1-1deadbeef01e')
            .then(response => response.json()).
            then(data => {
                console.log(data)
                setName(data.name)
                const onOff = parseInt(data.value[0].state[0].data)
                //cast value of 'isOn' to boolean for the switch component
                switch (onOff){
                    case '0':
                        setIsOn(false)
                    case '1':
                        setIsOn(true)
                }
                setStatus(data.value[1].state[0].data)
                setAlarm(data.value[2].state[0].data)
                setHeatLevel(data.value[3].state[1].data)
                setDesiredTemperature(data.value[4].state[1].data)
                setSmokeTemperature(data.value[5].state[0].data)
            })
        }

        getDevice()
    }, [])

    const handleChange = () => {
        setIsOn(!isOn)
    }


    return (
        <div className="device-card stove">
            <div className="card__header">
                <div className="card__header__left">
                    <p className="card__header--title">{name}</p>
                    <p className="card__header--info">Home</p>
                </div>
                <div className="card__header__right">
                    <span className="circle"></span>
                    <span className="circle"></span>
                    <span className="circle"></span>
                </div>
            </div>
            <div className="card__body">
                <div className="sensor-value__container">
                    <div className="sensor-value">
                        <span>Heat level: </span>
                        <span>{heatLevel}</span>
                    </div>
                    <div className="sensor-value">
                        <span>Desired temp: </span>
                        <span>{desiredTemperature}</span>
                    </div>
                    <div className="sensor-value">
                        <span>Smoke temp: </span>
                        <span>{smokeTemperature}</span>
                    </div>
                </div>
                <div className="card__body--content">
                    {isOn ? <span className="active">{status}</span> : <span className="inactive">{status}</span>}
                    <Switch 
                        onChange={handleChange} 
                        checked={isOn} 
                        uncheckedIcon={false} 
                        checkedIcon={false}
                        offColor={'#3c3c3c'} 
                        onColor={'#103875'}
                    />
                </div>
            </div>
            <div className="card__footer">
                <p>Last updated few seconds ago</p>
            </div>
        </div>
    )
}

export default Stove