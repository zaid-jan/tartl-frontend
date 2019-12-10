import React, { useState, useEffect} from 'react'
import { connect } from 'react-redux'
import env from '../environment'
import axios from 'axios'
import { findItem } from '../lib/findItem'
import DatePicker from 'react-datepicker'
import CustomNavbar from '../components/CustomNavbar'
import { Card } from 'react-bootstrap'

import { useParams } from 'react-router-dom'
const Availability = (props) => {
    const params = useParams()
    const id = params.id
    // console.log(id, params.id, id != params.id, id !== params.id)
    const [reservedDates, setReservedDates] = useState([]) 
    useEffect(() => {       
        axios.post(`${env.backend}/getOtherUsersDetails`, {id})
            .then(res => {
                let temp = []
                for(let i of res.data){
                    temp = temp.concat(Date.parse(i.aWhen) || Date.parse(i.rWhen))
                }
                setReservedDates(temp)
            })
            .catch(err => console.log(err))        
    }, [id])
    const [startDate, setStartDate] = useState(new Date())
    const item = findItem(props.otherUsers, 'id', id)
    // console.log("object", item)
    console.log("reservedDates", reservedDates)
    return (
        <div align="center">
            <CustomNavbar />
            <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{item.username}'s Availability</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{item.subject}</Card.Subtitle>
                <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        excludeDates={reservedDates}
                        placeholderText="Busy on These days"
                        readOnly
                        inline
                    />
            </Card.Body>
            </Card>           
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        otherUsers: state.otherUsers
    }
}

export default connect(mapStateToProps, {})(Availability)