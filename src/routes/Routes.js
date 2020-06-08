import React from 'react'
import { Router, Switch, Route } from 'react-router'
import { history } from '../utils/history'

import Login from '../pages/login'
import Home from '../pages/home'
import { BarbequeDetails, BarbequeForm } from '../pages/barbeque'
import NotFound from './NotFound'
import PrivateRoute from './PrivateRoute.js'

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route component={Login} exact path="/login" />
            <PrivateRoute component={Home} exact path="/" />
            <PrivateRoute component={BarbequeForm} exact path="/barbeque/:id?/form" />
            <PrivateRoute component={BarbequeDetails} exact path="/barbeque/:id?" />
            <PrivateRoute component={NotFound} />
        </Switch>
    </Router>
)

export default Routes