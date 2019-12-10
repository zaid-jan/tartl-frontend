import moment from 'moment'
export const getNotifications = ( appointments, reminders ) => {
    const currDate = moment(new Date())
    const todayReminders = reminders.filter(item => {
        const date = moment(item.rwhen)
        return currDate.isSame(date, 'day')
    })
    const todayAppointments = appointments.filter(item => {
        const date = moment(item.awhen)
        return currDate.isSame(date, 'day')
    })
    console.log("todays Appointments", appointments)
    return [...todayAppointments, ...todayReminders]
}