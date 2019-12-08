import { addAppointmentListener } from './addAppointmentListener'
import { editAppointmentListener } from './editAppointmentListener'

export const listenerWrapper = (socket, addAppointment) => {
    console.log("wrapper creater")
    addAppointmentListener(socket, addAppointment)
    editAppointmentListener(socket, addAppointment)
}