import React, { useState, useEffect } from 'react'

const SensorValues = (value) => {
    return (
        <div>
            {value.name === 'Alarm' || value.name === 'Color indicator' ? <span></span> : 
            <div className="sensor-value">
                <span>{value.name} :</span>
                <span>{Math.round(value.state[0].data)}</span>
            </div>}
        </div>
    )
}

export default SensorValues