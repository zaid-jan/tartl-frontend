export const editAppointmentListener = (socket, addAppointment) => {
    console.log("editAppointmentListenre", socket)
    if(Object.entries(socket).length === 0 && socket.constructor === Object){
        console.log("socket not loaded yet")
    } else {
        socket.on('editAppointment', (data) => {
            console.log("from socket edit appoihnrmwn", data);
            if(!data.error ){
                console.log("no err", data)
                addAppointment({aid: data.aid, uid:data.uid, awith:data.awith, subject:data.subject, awhen:data.awhen}, 'editAppointment')
            } else {
                alert("something went wrong")
            }
        })
        console.log("socket loaded")
    }
    
}