import { combineReducers } from 'redux'
import userReducer from './userReducer'
import reminderReducer from './reminderReducer'
import appointmentReducer from './appointmentReducer'
import socketReducer from './socketReducer'

export default combineReducers({
    reminders: reminderReducer,
    appointments: appointmentReducer,
    user: userReducer,
    socket: socketReducer
})