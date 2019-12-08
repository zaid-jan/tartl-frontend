const initialState = {}    

const socketReducer = (state = initialState, action) => {
    switch(action.type){
        case 'setSocket': 
            return action.payload;
        default: return state
    }
}

export default socketReducer