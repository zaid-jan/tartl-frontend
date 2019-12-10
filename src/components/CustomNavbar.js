import React, { useEffect } from 'react'
import { Navbar, Dropdown } from 'react-bootstrap'
import { connect } from 'react-redux'
import { FaBell } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { addAppointment } from '../actions/addAppointment'
import { getNotifications } from '../lib/getNotifications'
import { addNotification } from '../actions/addNotification'

const CustomNavbar = (props) => { 
    useEffect(() => {
        props.addNotification(getNotifications( props.appointments, props.reminders ), 'setNotifications')
    }, [props.reminders, props.appointments])
    let history = useHistory()
    const handleOtherUsers = (e) => {
        e.preventDefault();
        const id = e.target.id;
        console.log("e.target", e.target)
        history.push(`/availability/${id}`)
    }
    
    
    let notifications = props.notifications.map(item => <Dropdown.Item href="#" >{item.subject}</Dropdown.Item>)
    let otherUsers = props.otherUsers.map(item => <Dropdown.Item href="#" id={item.id} onClick={handleOtherUsers}>{item.username}</Dropdown.Item>)
    return (
        <Navbar>
        <Navbar.Brand onClick={() => {history.push('/home')}}>tartl-task</Navbar.Brand>
        <Navbar.Toggle />
        <Dropdown>
        <Dropdown.Toggle variant="link" id="dropdown-basic">
        <FaBell />
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {notifications.length ? notifications : <Dropdown.Item href="#">No New Notification</Dropdown.Item>}
        </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
            <Dropdown.Toggle variant="link" id="dropdown-basic-2">
            <FaUser />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {otherUsers.length ? otherUsers : <Dropdown.Item href="#">No otherUsers</Dropdown.Item>}
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
        socket: state.socket,
        reminders: state.reminders,
        appointments: state.appointments,
        notifications: state.notifications,
        otherUsers: state.otherUsers,
    }
}

export default connect(mapStateToProps, { addAppointment, addNotification })(CustomNavbar)