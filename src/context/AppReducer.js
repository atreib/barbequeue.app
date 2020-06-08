export default (state, action) => {
    switch (action.type) {
        case 'SET_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.payload
            };
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            };
        case 'SET_PAGE_TITLE':
            return {
                ...state,
                pageTitle: action.payload
            };
        default: return state;
    }
}