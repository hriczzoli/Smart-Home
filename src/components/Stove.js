/*
    This is the component for the 'Stove'
    When the component mounts, it fethches data from the network and sets values coming back from the response to set initial state
    Also uses moment.js to provide proper time format for 'PATCH request' when modifying device state on the network
*/

import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import Switch from "react-switch";
import moment from 'moment'

const Stove = () => {
    const [name, setName] = useState('')
    const [isOn, setIsOn] = useState('0')
    const [status, setStatus] = useState('')
    const [alarm, setAlarm] = useState('')
    const [heatLevel, setHeatLevel] = useState()
    const [desiredTemperature, setDesiredTemperature] = useState('')
    const [smokeTemperature, setSmokeTemperature] = useState('')
    const [onOff, setOnOff] = useState(false)

    //Stove device URI
    const deviceUri = "/smarthome/services/2.0/network/7a8ca0be-3f87-4e8d-ae4f-e4de75323084/device/bc455c88-ae17-4fd6-a4f1-1deadbeef01e"

    useEffect(() => {
        async function getDevice() {
            //Asynchronously fetching device's data from the network using 'Fetch API'
            await fetch(deviceUri)
            .then(response => response.json())
            .then(data => {
                //Making use of the data coming back from the response -> we set the inital state of the values that the component is using
                setName(data.name)
                setIsOn(data.value[0].state[0].data)
                setStatus(data.value[1].state[0].data)
                setAlarm(data.value[2].state[0].data)
                setHeatLevel(data.value[3].state[1].data)
                setDesiredTemperature(data.value[4].state[1].data)
                setSmokeTemperature(data.value[5].state[0].data)
            })
        }
        getDevice()

        //Cast isOn value to boolean for switch component
        if(isOn === '0') {
            setOnOff(false)
        } else {
            setOnOff(true)
        }

    }, [isOn, heatLevel, desiredTemperature])

    //Turn device on/off
    const handleChange = () => {
        if(isOn === '0') {
            setIsOn('1')
        } else if (isOn === '1') {
            setIsOn('0')
        }

        //Modifying device state with PATH request - to toggle device state on/off
        async function updateDeviceState() {
            await fetch('/smarthome/services/2.0/network/7a8ca0be-3f87-4e8d-ae4f-e4de75323084/device/bc455c88-ae17-4fd6-a4f1-1deadbeef01e/value/ac455c88-ae17-4fd6-a4f1-1deadbeef01e/state/ac455c88-ae17-4fd6-a4f1-1deadbeef01c', {
                method: 'PATCH',
                body: JSON.stringify({
                    "timestamp": moment().format().toString(),
                    "data": isOn === '0' ? '1' : '0',
                    "meta": {
                        "id": "ac455c88-ae17-4fd6-a4f1-1deadbeef01c"
                    }
                    
                })
            })
        }
        updateDeviceState()
    }

    //Decrease heat level of device
    const decreaseHeatLevel = () => {
        let newLevel = parseInt(heatLevel) -1
        setHeatLevel(newLevel)

        async function updateHeatLevel() {
            await fetch('/smarthome/services/2.0/network/7a8ca0be-3f87-4e8d-ae4f-e4de75323084/device/bc455c88-ae17-4fd6-a4f1-1deadbeef01e/value/ac455c88-ae17-4fd6-a4f1-1deadbeef04e/state/ac455c88-ae17-4fd6-a4f1-1deadbeef04c', {
                method: 'PATCH',
                body: JSON.stringify({
                    "timestamp": moment().format().toString(),
                    "data": newLevel,
                    "meta": {
                        "id": "ac455c88-ae17-4fd6-a4f1-1deadbeef04c"
                    }
                    
                })
            })
        }
        updateHeatLevel()
    }

    //Increase heat level of device
    const increaseHeatLevel = () => {
        let newLevel = parseInt(heatLevel) +1
        setHeatLevel(newLevel)

        async function updateHeatLevel() {
            await fetch('/smarthome/services/2.0/network/7a8ca0be-3f87-4e8d-ae4f-e4de75323084/device/bc455c88-ae17-4fd6-a4f1-1deadbeef01e/value/ac455c88-ae17-4fd6-a4f1-1deadbeef04e/state/ac455c88-ae17-4fd6-a4f1-1deadbeef04c', {
                method: 'PATCH',
                body: JSON.stringify({
                    "timestamp": moment().format().toString(),
                    "data": newLevel,
                    "meta": {
                        "id": "ac455c88-ae17-4fd6-a4f1-1deadbeef04c"
                    }
                    
                })
            })
        }
        updateHeatLevel()
    }

    //Decrease temperature of device
    const decreaseTemperature = () => {
        let newTemp = parseInt(desiredTemperature) -1
        setDesiredTemperature(newTemp)

        async function updateTemperature() {
            await fetch('/smarthome/services/2.0/network/7a8ca0be-3f87-4e8d-ae4f-e4de75323084/device/bc455c88-ae17-4fd6-a4f1-1deadbeef01e/value/ac455c88-ae17-4fd6-a4f1-1deadbeef05e/state/ac455c88-ae17-4fd6-a4f1-1deadbeef05c', {
                method: 'PATCH',
                body: JSON.stringify({
                    "timestamp": moment().format().toString(),
                    "data": newTemp,
                    "meta": {
                        "id": "ac455c88-ae17-4fd6-a4f1-1deadbeef05c"
                    }
                    
                })
            })
        }
        updateTemperature()
    }

    //Increase temperature of device
    const increaseTemperature = () => {
        let newTemp = parseInt(desiredTemperature) +1
        setDesiredTemperature(newTemp)

        async function updateTemperature() {
            await fetch('/smarthome/services/2.0/network/7a8ca0be-3f87-4e8d-ae4f-e4de75323084/device/bc455c88-ae17-4fd6-a4f1-1deadbeef01e/value/ac455c88-ae17-4fd6-a4f1-1deadbeef05e/state/ac455c88-ae17-4fd6-a4f1-1deadbeef05c', {
                method: 'PATCH',
                body: JSON.stringify({
                    "timestamp": moment().format().toString(),
                    "data": newTemp,
                    "meta": {
                        "id": "ac455c88-ae17-4fd6-a4f1-1deadbeef05c"
                    }
                    
                })
            })
        }
        updateTemperature()
    }


    return (
        <div className="device-card stove">
            <div className="card__header">
                <div className="card__header__left">
                    <p className="card__header--title">{name}
                        <FontAwesomeIcon 
                            icon={faFire} 
                            size="1x" 
                            className={isOn === '1' ? "active" : "inactive"}
                        />
                    </p>
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
                        <div>
                            <button onClick={decreaseHeatLevel} disabled={!onOff}>-</button>
                            <span>{heatLevel} %</span>
                            <button onClick={increaseHeatLevel} disabled={!onOff}>+</button>
                        </div>
                    </div>
                    <div className="sensor-value">
                        <span>Desired temp: </span>
                        <div>
                            <button onClick={decreaseTemperature} disabled={!onOff}>-</button>
                            <span>{desiredTemperature} &#8451;</span>
                            <button onClick={increaseTemperature} disabled={!onOff}>+</button>
                        </div>
                    </div>
                    <div className="sensor-value">
                        <span>Smoke temp: </span>
                        <span>{smokeTemperature} &#8451;</span>
                    </div>
                </div>
                <div className="card__body--content">
                    {/* 
                        Device's 'STATUS' value (report state) would not update even though 'On/Off value (control state) 
                        can be changed. That is why I am using static text when manipulating state with switch control.
                    */}
                    {isOn === '1' ? <span className="active">On</span> : <span className="inactive">Off</span>}
                    <Switch 
                        onChange={handleChange} 
                        checked={onOff} 
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