import { combineReducers } from 'redux'
import userReducer from './userReducer'
import reminderReducer from './reminderReducer'
import appointmentReducer from './appointmentReducer'
import socketReducer from './socketReducer'
import notificationReducer from './notificationReducer'
import otherUsersReducers from './otherUsersReducers'

export default combineReducers({
    reminders: reminderReducer,
    appointments: appointmentReducer,
    user: userReducer,
    socket: socketReducer,
    notifications: notificationReducer,
    otherUsers: otherUsersReducers
})