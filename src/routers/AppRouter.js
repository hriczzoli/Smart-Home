import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import LoginPage from '../components/LoginPage'
import Header from '../components/Header'
import Home from '../components/Home'

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={LoginPage} exact={true}/>
                <Route path="/dashboard" component={Home} exact={true}/>
            </Switch>
        </div>
    </Router>
)

export default AppRouter