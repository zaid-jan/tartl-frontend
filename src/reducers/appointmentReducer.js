const initialState =[]

export default (state=initialState, action) => {
    switch (action.type){
        case 'addAppointment':
            return [action.payload, ...state];
        case 'setAppointments':
            return [...action.payload]
        case 'editAppointment':
            return state.map(item => {                
                if(item.aid === action.payload.aid){
                    item.subject = action.payload.subject
                    item.awhen = action.payload.awhen
                    item.awith = action.payload.awith
                }
                return item
            })
        default:
            return state;
    }
}