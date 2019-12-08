import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'
import { addReminder } from '../actions/addReminder'
import { FaPlus } from 'react-icons/fa'
import { useHistory } from "react-router-dom";
import env from '../environment'

import '../css/box.css'

const Reminders = (props) => {
    let history = useHistory();
    const handleNaviagte = (id) => {        
        history.push(`/viewReminder/${id}`)        
    }
    const handleAdd = () => {
        history.push('/addReminder')
    }
    let reminders = props.data.map(item => {
        return (
            <div key={`r${item.rid}`} className="reminderUnit"  onClick={() => {handleNaviagte(item.rid)}}>
                <div className="list">
                    {item.subject}
                </div>                
                <span className="description">{item.description}</span>
            </div>
            
        )
    })
    return (
        <div className="container">
            <div>
                <span>Reminders</span><span className="plusIcon"><FaPlus onClick={handleAdd}/></span>
            </div>
            <div className="box">
                <div className="contents">               
                    {reminders}
                </div>      
            </div>                      
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        data: state.reminders
    }
}

export default connect(mapStateToProps, { addReminder })(Reminders);