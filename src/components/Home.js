/*
    This is the component for the 'Main 'Screen'
    It displays the different 'devices' - essentially the content of the application underneath the header
    It is a presentational component with no functionality
*/

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