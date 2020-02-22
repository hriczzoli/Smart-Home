import React from 'react'

const SensorValues = (value) => {
    return (
        <div>
            {value.name === 'Alarm' || value.name === 'Color indicator' ? <span></span> : 
            <div className="sensor-value">
                {value.name === 'CO2' ? <span className="co2">{value.name} :</span> : <span>{value.name}</span>}
                {value.name === 'CO2' ? <span className="co2">{Math.round(value.state[0].data)} {value.number.unit}</span> : <span>{Math.round(value.state[0].data)} {value.number.unit}</span>}
            </div>}
        </div>
    )
}

export default SensorValues