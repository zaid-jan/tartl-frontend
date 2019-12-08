import React, { useState } from 'react'
import { Navbar, Dropdown } from 'react-bootstrap'
import { connect } from 'react-redux'
import { FaBell } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { listenerWrapper } from '../listeners/listenerWrapper'
import { addAppointment } from '../actions/addAppointment'

const CustomNavbar = (props) => {    
    let history = useHistory()
    // listenerWrapper(props.socket, props.addAppointment)
    // const [socketInstance, setSocketInstance] = useState(0)
    // if(!socketInstance){
    //     listenerWrapper(props.socket, props.addAppointment)
    //     setSocketInstance(1)
    //     console.log("craeted socket instance")
    // }    
    return (
        <Navbar>
        <Navbar.Brand onClick={() => {history.push('/home')}}>tartl-task</Navbar.Brand>
        <Navbar.Toggle />
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        <FaBell />
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
            Signed in as:{props.user.username}
            </Navbar.Text>
        </Navbar.Collapse>
        </Navbar>
    )
}


const mapStateToProps = state => {
    return {
        user: state.user,
        socket: state.socket
    }
}

export default connect(mapStateToProps, { addAppointment })(CustomNavbar)