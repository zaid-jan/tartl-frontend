import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addAppointment } from '../actions/addAppointment'
import DatePicker from "react-datepicker";
import moment from 'moment'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CustomNavbar from '../components/CustomNavbar'
import { Typeahead } from 'react-bootstrap-typeahead'

import "react-datepicker/dist/react-datepicker.css";

const AddAppointment = (props) => {
    let history = useHistory();
    let [uid, setUid] = useState(props.user.id)
    let [aWith, setAWith] = useState('')
    let [subject, setSubject] = useState('')
    let [aWhen, setAWhen] = useState(moment)
    let [isNew, setIsNew] = useState(0)
    const validateForm = () => {
        return aWith.length > 0 && subject.length > 0;
    }
    const handleNew = (input) => {
      console.log("inpit", input)
      if(input.length){
        if(input[0].hasOwnProperty("label")){
          setIsNew(1)
          setAWith(input[0].label)
        } else {
          setIsNew(0)
          setAWith(input[0])
        }
      } else {
        setAWith("")
        setIsNew(0)
      }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateForm()){
          let auid = "";
          if(!isNew){
            auid = props.otherUsers.find(item => item.username === aWith).id
          }
          props.socket.emit('addAppointment',{uid, aWith, subject, aWhen, auid})
          history.goBack();
        } else {
          alert("fill all values")
        }
        
    }
    let suggestions = props.otherUsers.map(item => item.username)
    console.log("suggestions", suggestions)
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
              <Typeahead
                allowNew
                onChange={input => handleNew(input)}
                options={suggestions}
                placeholder={"Set Appointment With"}
              />
            </Form.Group>
            <Form.Group controlId="aWhen" bsSize="large">
            <DatePicker
                className="form-control"
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
              Add Appointment
            </Button>
          </Form>
            </div>
        </div>
      );
}

const mapStateToProps = (state) => {
    return {
        data: state.appointments,
        user: state.user,
        socket: state.socket,
        otherUsers: state.otherUsers
    }
}

export default connect(mapStateToProps, { addAppointment })(AddAppointment)
