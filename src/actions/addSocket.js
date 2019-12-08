export const addSocket = (payload, type) => {
    return (dispatch) => {
        console.log("payload", payload)
        const action = {
            type,
            payload,
        }
        dispatch(action);
    }
}