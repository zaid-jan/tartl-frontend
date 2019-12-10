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
import { Typeahead } from 'react-bootstrap-typeahead'

import "react-datepicker/dist/react-datepicker.css";

const EditAppointment = (props) => {
    let history = useHistory();
    const { id } = useParams();
    const item = findItem(props.data, 'aid', id)
    let [aid, setAid] = useState(item.aid)
    let [uid, setUid] = useState(item.uid)
    let [awith, setawith] = useState(item.awith)
    let [subject, setSubject] = useState(item.subject)
    let [awhen, setAWhen] = useState(item.awhen)
    let [isNew, setIsNew] = useState(0)
    console.log("awhen", Date.parse(awhen))
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let auid = '';
        if(!isNew){
          auid = props.otherUsers.find(item => item.username === awith).id
        }
        props.socket.emit(`editAppointment`, {aid, uid, awith, subject, awhen, auid})
        history.goBack()     
    }
    const handleNew = (input) => {
      console.log("inpit", input)
      if(input.length){
        if(input[0].hasOwnProperty("label")){
          setIsNew(1)
          setawith(input[0].label)
        } else {
          setIsNew(0)
          setawith(input[0])
        }
      } else {
        setawith("")
        setIsNew(0)
      }
    }
    let suggestions = props.otherUsers.map(item => item.username)
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
            <Form.Group controlId="awith" bsSize="large">
            <Typeahead
                allowNew
                onChange={input => handleNew(input)}
                options={suggestions}
                placeholder={"Set Appointment With"}
                selected={[awith]}
              />
            </Form.Group>
            <Form.Group controlId="awhen" bsSize="large">
            <DatePicker
                className="form-control"
                selected={Date.parse(awhen)}
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
        socket: state.socket,
        otherUsers: state.otherUsers
    }
}

export default connect(mapStateToProps, { addAppointment })(EditAppointment)
