const initialState =[]

export default (state=initialState, action) => {
    switch (action.type){
        case 'setOtherUsers':
            return [...action.payload]
        default:
            return state;
    }
}