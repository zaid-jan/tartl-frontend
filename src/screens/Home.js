import React from 'react'
import CustomNavbar from '../components/CustomNavbar'
import Reminders from '../components/Reminders'
import Appointments from '../components/Appointments'
import '../css/app.css'

const Home = (props) => {
    return (
        <div className="app">
            <CustomNavbar />
            <div className="outerContainer">
                <Appointments/>        
                <Reminders/>                        
            </div>
        </div>        
    )
}

export default Home