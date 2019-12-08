import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import env from '../environment'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { redirectHome } from '../lib/redirectHome'
import { connect } from 'react-redux'
import { setUser } from '../actions/setUser'
import { addAppointment } from '../actions/addAppointment'
import { addReminder } from '../actions/addReminder'
import io from 'socket.io-client';

import '../css/Signup.css'

// console.log(redirectHome)

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')  
  let history = useHistory();
  
  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  }
  
  const handleSubmit = async event => {
    event.preventDefault();
    let resUser = await axios.post(`${env.backend}/login`, {username, password})
    console.log(resUser.data)
    props.setUser({username, id: resUser.data.id})
    redirectHome(resUser, history, username, props.addAppointment, props.addReminder)    
  }
    return (
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username" bsSize="large">
            <Form.Control
              autoFocus
              type="username"
              value={username}
              onChange={(e) => {setUsername(e.target.value)}}
              placeholder="username"
            />
          </Form.Group>
          <Form.Group controlId="password" bsSize="large">
            <Form.Control
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
              type="password"
              placeholder="password"
            />
          </Form.Group>
          <Button
            block
            bsSize="large"
            disabled={!validateForm()}
            type="submit"
          >
            Login
          </Button>
          <Link to='/signup'>Signup</Link>
        </Form>
      </div>
    );
}

const mapStateToProps = state => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps, { setUser, addAppointment, addReminder })(Login)