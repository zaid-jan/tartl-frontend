import axios from 'axios'
import env from '../environment'
export const redirectHome = async (res, history, username, addAppointment, addReminder) => {
    if(res.data.error === 0){
        axios.post(`${env.backend}/getAppointments`, {username})
            .then(res => {
                addAppointment(res.data, `setAppointments`)
            } )        
        axios.post(`${env.backend}/getReminders`, {username})
            .then(res => {
                addReminder(res.data, `setReminders`)    
            })        
        history.push("/home");
    } else {
        alert('somwthing went wrong')
    }
}