import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { addAppointment } from '../actions/addAppointment'
import DatePicker from "react-datepicker";
import moment from 'moment'
import env from '../environment'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CustomNavbar from '../components/CustomNavbar'
import { findItem } from '../lib/findItem'


import "react-datepicker/dist/react-datepicker.css";

const EditAppointment = (props) => {
    let history = useHistory();
    const { id } = useParams();
    const item = findItem(props.data, 'aid', id)
    let [aid, setAid] = useState(item.aid)
    let [uid, setUid] = useState(item.uid)
    let [aWith, setAWith] = useState(item.aWith)
    let [subject, setSubject] = useState(item.subject)
    let [aWhen, setAWhen] = useState(item.aWhen)

    const handleSubmit = async (e) => {
        e.preventDefault();
        props.socket.emit(`editAppointment`, {aid, uid, aWith, subject, aWhen})
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
            <Form.Group controlId="aWith" bsSize="large">
              <Form.Control
                value={aWith}
                onChange={(e) => {setAWith(e.target.value)}}
                type="aWith"
                placeholder="Appointment With?"
              />
            </Form.Group>
            <Form.Group controlId="aWhen" bsSize="large">
            <DatePicker
                selected={Date.parse(aWhen)}
                onChange={(date) => {setAWhen(moment(date).format('YYYY-MM-DD hh:mm:ss'))}}
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
    return {
        data: state.appointments,
        socket: state.socket
    }
}

export default connect(mapStateToProps, { addAppointment })(EditAppointment)
