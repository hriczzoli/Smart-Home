/*
    This is the component for the Indoor module's values
    It gets the values as a prop from it's parent component and renders them
    (there's a bit of conditional rendering as the values of 'Alarm' and 'Color indicator' 
     do not need to be displayed together with the actual sensor values
    )
*/

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