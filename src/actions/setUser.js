export const setUser = (payload) => {
    return (dispatch) => {
        console.log("payload", payload)
        const action = {
            type: 'setUser',
            payload,
        }
        dispatch(action);
    }
}