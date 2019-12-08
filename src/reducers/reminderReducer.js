const initialState =[]

export default (state=initialState, action) => {
    switch (action.type){
        case 'addReminder':
            return [action.payload, ...state];
        case 'setReminders':
            return [...action.payload]
        case 'editReminder':
            return state.map(item => {                
                if(item.rid === action.payload.rid){
                    item.subject = action.payload.subject
                    item.rWhen = action.payload.rWhen
                    item.description = action.payload.description
                }
                return item
            })
        default:
            return state;
    }
}