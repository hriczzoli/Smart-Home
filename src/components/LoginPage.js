/*
    This is the 'Login Page'
    It uses the context API to manage the state of the 'logged in' user, also uses 'history' from the router to change screens
*/

import React, { useState, useContext } from 'react';
import { history } from '../routers/AppRouter';
import UsersContext from '../context/user-context'

const LoginPage = () => {
    const { dispatch } = useContext(UsersContext);
    const [userName, setUserName] = useState('')
    const [error, setError] = useState('')

    const handleLogin = (e) => {
        //prevent the browser from a full page reload
        e.preventDefault();

        //if username field is empty, display error message
        if(!userName) {
            setError('Please enter a name')
        } else {
            //if username is provided, add username to context
            dispatch({
                type: 'ADD_USER',
                userName
            })
            //set username state to input field's value
            setUserName(userName)
            //navigate to dashboard page to view devices' current state
            history.push('/dashboard');
        }
    }


    return (
        <div className="box-layout">
            <div className="box-layout__box">
            <h1 className="box-layout__title">Welcome to your Smart Home app</h1>
            <p>Control all your devices <br /> from one place</p>
            <form onSubmit={handleLogin}>
                {error && <p className="error">{error}</p>}
                <input 
                    type="text"
                    placeholder="Who's using the app?"
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)} 
                    className="box-layout__input"/>
                <button className="button">
                    OPEN
                </button>
            </form>
            </div>
        </div>
    )
};

export default LoginPage;
