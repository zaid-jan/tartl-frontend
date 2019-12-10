const initialState =[]

export default (state=initialState, action) => {
    switch (action.type){
        case 'addNotification':
            return [action.payload, ...state];
        case 'setNotifications':
            return [...action.payload]
        default:
            return state;
    }
}