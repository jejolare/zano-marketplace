export const updateMarketState = (dispatch, state) => {
    return dispatch({
        type: "MARKET__STATE_UPDATED",
        payload: state,
    });
}