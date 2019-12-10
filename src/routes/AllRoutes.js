import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import io from 'socket.io-client'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Home from '../screens/Home'
import ViewAppointment from '../screens/ViewAppointment'
import ViewReminder from '../screens/ViewReminder'
import EditReminder from '../screens/EditReminder'
import EditAppointment from '../screens/EditAppointment'
import AddAppointment from '../screens/AddAppointment'
import AddReminder from '../screens/AddReminder'
import Availability from '../screens/Availabilty'
import { addSocket } from '../actions/addSocket'
import { addAppointment } from '../actions/addAppointment'
import { listenerWrapper } from '../listeners/listenerWrapper'
import { addOtherUsers } from '../actions/addOtherUsers'
import axios from 'axios'
import env from '../environment'

const AllRoutes = (props) => {
    let loggedIn = props.user.loggedIn
    let [setUp, setSetUp] = useState(0);
    if(loggedIn && !setUp){
        setSetUp(1);
        console.log("setUp", setUp)
        const socket = io(`${env.backend}?id=${props.user.id}`, {transports: ['websocket']});
        listenerWrapper(socket, props.addAppointment)
        props.addSocket(socket, 'setSocket')
        axios.post(`${env.backend}/getUsers`, {id: props.user.id})
            .then(res => {
                props.addOtherUsers(res.data, 'setOtherUsers')
            })
            .catch(err => console.log(err))
        
    }    
    return (
        <Router>
            <Route path="/"><Redirect to="/home"/></Route>
            <Route path="/login" component={Login} />
            <Route path="/Signup" component={Signup}/>
            <Route path="/home">{!loggedIn ? <Redirect to="/login" /> : <Home />}</Route> 
            <Route path="/viewAppointment/:id">{!loggedIn ? <Redirect to="/login" /> : <ViewAppointment />}</Route> 
            <Route path="/viewReminder/:id">{!loggedIn ? <Redirect to="/login" /> : <ViewReminder />}</Route> 
            <Route path="/editReminder/:id">{!loggedIn ? <Redirect to="/login" /> : <EditReminder />}</Route> 
            <Route path="/editAppointment/:id">{!loggedIn ? <Redirect to="/login" /> : <EditAppointment />}</Route> 
            <Route path="/addAppointment">{!loggedIn ? <Redirect to="/login" /> : <AddAppointment />}</Route> 
            <Route path="/addReminder">{!loggedIn ? <Redirect to="/login" /> : <AddReminder />}</Route> 
            <Route path="/availability/:id">{!loggedIn ? <Redirect to="/login" /> : <Availability />}</Route> 
        </Router>      
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        socket: state.socket,
    }
}

export default connect(mapStateToProps, { addSocket, addAppointment, addOtherUsers })(AllRoutes)