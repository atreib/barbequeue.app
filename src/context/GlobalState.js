import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import * as CONSTANTS from '../config/constants'

// Loading last state from localStorage
var loggedIn = true;
var cacheUserLoggedIn = localStorage.getItem(CONSTANTS.CACHED_TOKEN_KEY);
if (!cacheUserLoggedIn) loggedIn = false;

// initializing state
const initialState = {
    isLoggedIn: loggedIn,
    isLoading: false
}

// creating our context
export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function setLoggedIn(value) {
        dispatch({
            type: 'SET_LOGGED_IN',
            payload: value
        });
    };

    function setIsLoading(value) {
        dispatch({
            type: 'SET_LOADING',
            payload: value
        });
    };

    return (<GlobalContext.Provider value={{
        isLoggedIn: state.isLoggedIn,
        isLoading: state.isLoading,
        setLoggedIn,
        setIsLoading
    }}>
        {children}
    </GlobalContext.Provider>);
}