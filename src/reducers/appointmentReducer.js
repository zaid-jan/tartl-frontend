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
                    item.aWhen = action.payload.aWhen
                    item.aWith = action.payload.aWith
                }
                return item
            })
        default:
            return state;
    }
}