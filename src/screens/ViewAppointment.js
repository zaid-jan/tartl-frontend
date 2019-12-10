import React from 'react'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import CustomNavbar from '../components/CustomNavbar'
import { findItem } from '../lib/findItem'
import { convertDbTime } from '../lib/convertDbTime'

const ViewAppointment = (props) => {
    let history = useHistory()
    const { id } = useParams()  
    const item = findItem(props.data, 'aid', id);
    const date = convertDbTime(item.awhen);   
    const handleClick = (e) => {
        e.preventDefault()
        history.push(`/editAppointment/${id}`)
    }
    return (
        <div align="center">
            <CustomNavbar />
            <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Appointment</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{item.subject}</Card.Subtitle>
                <Card.Text>
                    with: {item.awith} <br />
                    on: {date.format('YYYY-MM-DD')}<br />
                    at: {date.format('hh:mm:ss')} <br />
                </Card.Text>
                { props.user.id === item.uid ? <Card.Link href="#" onClick={handleClick}>Edit Appointment</Card.Link> : <div><hr />Appointment created by someone Else, You dont have edit rights.</div> }
                
            </Card.Body>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.appointments,
        user: state.user
    }
}

export default connect(mapStateToProps, { })(ViewAppointment)