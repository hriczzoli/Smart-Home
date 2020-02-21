import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import UserContext from './context/user-context'
import usersReducer from './reducers/users'
import './styles/styles.scss';
import * as serviceWorker from './serviceWorker';
import AppRouter from './routers/AppRouter';

const SmartHome = () => {
    const [users, dispatch] = useReducer(usersReducer, '');

    return (
        <UserContext.Provider value={{ users, dispatch }}>
            <AppRouter />
        </UserContext.Provider>
    )
} 


ReactDOM.render(<SmartHome />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
