const initialState = {
    username: null,
    loggedIn: false,
    id: null,
}

const tagsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'setUser': 
            return action.payload.id ? {username: action.payload.username,loggedIn: true, id: action.payload.id} : state;
        default: return state
    }
}

export default tagsReducer