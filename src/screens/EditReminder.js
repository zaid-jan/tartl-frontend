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

const EditReminder = (props) => {
    let history = useHistory();
    const { id } = useParams();
    const item = findItem(props.data, 'rid', id)
    let [rid, setRid] = useState(item.rid)
    let [uid, setUid] = useState(item.uid)
    let [description, setdescription] = useState(item.description)
    let [subject, setSubject] = useState(item.subject)
    let [rWhen, setrWhen] = useState(item.rWhen)
    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await axios.post(`${env.backend}/editReminder`, {rid, uid, description, subject, rWhen})
        if(!res.data.error){
          props.addReminder({rid, uid, description, subject, rWhen}, 'editReminder')
        }
        history.goBack()
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
            <Form.Group controlId="rWhen" bsSize="large">
            <DatePicker
                className="form-control"
                selected={Date.parse(rWhen)}
                onChange={(date) => {setrWhen(moment(date).format('YYYY-MM-DD hh:mm:ss'))}}
                showTimeSelect
                dateFormat="Pp"
            />
            </Form.Group>
            <Button
              block
              bsSize="large"
              type="submit"
            >
              Edit
            </Button>
          </Form>
            </div>
        </div>
      );
}

const mapStateToProps = (state) => {
    // console.log("state", state)
    return {
        data: state.reminders,
        socket: state.socket
    }
}

export default connect(mapStateToProps, { addReminder })(EditReminder)
