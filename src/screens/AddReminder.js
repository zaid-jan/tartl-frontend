import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { addReminder } from '../actions/addReminder'
import DatePicker from "react-datepicker";
import moment from 'moment'
import env from '../environment'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CustomNavbar from '../components/CustomNavbar'
import { findItem } from '../lib/findItem'

import "react-datepicker/dist/react-datepicker.css";

const AddReminder = (props) => {
    let history = useHistory();
    const { id } = useParams();
    const item = findItem(props.data, 'rid', id)
    let [uid, setUid] = useState(props.user.id)
    let [description, setdescription] = useState('')
    let [subject, setSubject] = useState('')
    let [rwhen, setrwhen] = useState(moment)
    
    const validateForm = () => {
        return description.length > 0 && subject.length > 0;
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateForm()){
            let res = await axios.post(`${env.backend}/addReminder`, {uid, description, subject, rwhen})
            let data = res.data;
            if(!data.error){
                props.addReminder({rid:res.data.insertId, uid, description, subject, rwhen}, 'addReminder')
                history.goBack()
            } else {
                alert("something went wrong")
            }
        }
        else {
            alert("fill all values")
        }
    }
    return (
        <div>
            <CustomNavbar />
            <div className="Login">
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="subject" bsSize="large">
              <Form.Control
                autoFocus
                type="subject"
                value={subject}
                onChange={(e) => {setSubject(e.target.value)}}
                placeholder="subject"
              />
            </Form.Group>
            <Form.Group controlId="description" bsSize="large">
              <Form.Control
                value={description}
                onChange={(e) => {setdescription(e.target.value)}}
                type="description"
                placeholder="Reminder With?"
              />
            </Form.Group>
            <Form.Group controlId="rwhen" bsSize="large">
            <DatePicker
                className="form-control"
                selected={Date.parse(rwhen)}
                onChange={(date) => {setrwhen(moment(date).format('YYYY-MM-DD hh:mm:ss'))}}
                showTimeSelect
                dateFormat="Pp"
            />
            </Form.Group>
            <Button
              block
              bsSize="large"
              type="submit"
            >
              Add Reminder
            </Button>
          </Form>
            </div>
        </div>
      );
}

const mapStateToProps = (state) => {
    console.log("state", state)
    return {
        data: state.reminders,
        user: state.user
    }
}

export default connect(mapStateToProps, { addReminder })(AddReminder)
