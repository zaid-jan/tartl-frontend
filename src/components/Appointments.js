import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'
import env from '../environment'
import '../css/box.css'
import { addAppointment } from '../actions/addAppointment'
import { FaPlus } from 'react-icons/fa'
import { useHistory } from "react-router-dom";    

const Appointments = (props) => {
    let history = useHistory();
    const handleNaviagte = (id) => {        
        history.push(`/viewAppointment/${id}`)
    }
    const handleAdd = () => {
        history.push('/addAppointment')
    }    
    // console.log("props.data", props.data)
    let appointments = props.data.map(item => {
        return (
            <div key={`a${item.aid}`} className="reminderUnit" onClick={() => {handleNaviagte(item.aid)}}>
                <div className="list">
                    {item.subject}
                </div>                
                <span className="description">{item.aWith}</span>
            </div>
            
        )
    })
    return (
        <div className="container">
            <div>
                <span>Appointments</span><span className="plusIcon"><FaPlus onClick={handleAdd}/></span>
            </div>
            <div className="box">
                <div className="contents">               
                    {appointments}
                </div>      
            </div>                      
        </div>   
    )
}


const mapStateToProps = (state) => {
    // console.log(state)
    return {
        user: state.user,
        data: state.appointments || []
    }
}

export default connect(mapStateToProps, { addAppointment })(Appointments);