export const addAppointmentListener = (socket, addAppointment) => {
    // console.log("addAppointmentListenre", socket)
    if(Object.entries(socket).length === 0 && socket.constructor === Object){
        console.log("socket not loaded yet")
    }
    else {
        socket.on('addAppointment', (data) => {        
            if(!data.error ){
                console.log("no error from add appointmny", data);
                addAppointment({aid:data.insertId, uid: data.uid, awith:data.awith, subject:data.subject, awhen:data.awhen}, 'addAppointment')
            } else {
                alert("something went wrong")
            }
        })
        console.log("socket loaded")
    }
    
}

