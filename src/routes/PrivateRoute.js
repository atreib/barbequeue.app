import React from 'react'
import { Route, Redirect } from 'react-router'

import * as CONSTANTS from '../config/constants'

const PrivateRoute = (params) => {
    const apiToken = localStorage.getItem(CONSTANTS.CACHED_TOKEN_KEY)
    if (apiToken) {
        return <Route {...params} />
    } else {
        return <Redirect to="/login" />
    }
    
}

export default PrivateRoute