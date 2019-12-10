export const addNotification = (payload, type) => {
    return (dispatch) => {
        console.log("payload", payload)
        const action = {
            type,
            payload,
        }
        dispatch(action);
    }
}