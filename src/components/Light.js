import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
import Switch from "react-switch";

const Light = () => {
    const [isOn, setIsOn] = useState(false)

    const handleChange = () => {
        setIsOn(!isOn)
    }

    return (
        <div className="device-card light-card">
            <div className="card__header">
                <div className="card__header__left">
                    <p className="card__header--title">Lights</p>
                    <p className="card__header--info">Home</p>
                </div>
                <div className="card__header__right">
                    <span className="circle"></span>
                    <span className="circle"></span>
                    <span className="circle"></span>
                </div>
            </div>
            <div className="card__body">
                <div className="card__body--lightIcon">
                    <FontAwesomeIcon 
                        icon={faLightbulb} 
                        size="6x" 
                        className={isOn ? "active" : "inactive"}
                    />
                </div>
                <div className="card__body--content">
                    {isOn ? <span className="active">On</span> : <span className="inactive">Off</span>}
                    <Switch 
                        onChange={handleChange} 
                        checked={isOn} 
                        uncheckedIcon={false} 
                        checkedIcon={false}
                        offColor={'#3c3c3c'} 
                        onColor={'#103875'}/>
                </div>
            </div>
            <div className="card__footer">
                <p>Last updated few seconds ago</p>
            </div>
        </div>
    )
}

export default Light