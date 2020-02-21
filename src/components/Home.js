import React from 'react'
import Weather from '../components/Weather'
import Light from '../components/Light'
import SensorDevice from './SensorDevice'
import Stove from './Stove'

const Home = () => (
    <div className="content-container">
        <Weather />
        <Light />
        <SensorDevice />
        <Stove />
    </div>
)

export default Home