import React from 'react'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import CustomNavbar from '../components/CustomNavbar'
import { findItem } from '../lib/findItem'
import { convertDbTime } from '../lib/convertDbTime'

const ViewReminder = (props) => {
    let history = useHistory()
    const { id } = useParams()  
    const item = findItem(props.data, 'rid', id);
    const date = convertDbTime(item.rwhen);   
    const handleClick = (e) => {
        e.preventDefault()
        history.push(`/editReminder/${id}`)
    }
    return (
        <div align="center">
            <CustomNavbar />
            <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Reminder</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{item.subject}</Card.Subtitle>
                <Card.Text>
                    Description: {item.description} <br />
                    on: {date.format('YYYY-MM-DD')}<br />
                    at: {date.format('hh:mm:ss')} <br />
                </Card.Text>
                <Card.Link href="#" onClick={handleClick}>Edit Reminder</Card.Link>
            </Card.Body>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => {
    // console.log("state", state)
    return {
        data: state.reminders
    }
}

export default connect(mapStateToProps, { })(ViewReminder)