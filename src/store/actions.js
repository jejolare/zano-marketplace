export const updateMarketState = (dispatch, state) => {
    return dispatch({
        type: "MARKET__STATE_UPDATED",
        payload: state,
    });
}
export const updateAdminState = (dispatch, state) => {
    return dispatch({
        type: "ADMIN__STATE_UPDATED",
        payload: state,
    });
}