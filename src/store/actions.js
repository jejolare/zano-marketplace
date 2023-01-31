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

export const updateConfigState = (dispatch, state) => {
    return dispatch({
        type: "CONFIG_UPDATED",
        payload: state,
    });
}

export const updateSearchState = (dispatch, state) => {
    return dispatch({
        type: "SEARCH_UPDATED",
        payload: state,
    });
}