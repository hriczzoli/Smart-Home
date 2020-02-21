import React, { useState, useContext } from 'react';
import { history } from '../routers/AppRouter';
import UsersContext from '../context/user-context'

const LoginPage = () => {
    const { dispatch } = useContext(UsersContext);
    const [userName, setUserName] = useState('')

    const handleChange = (e) => {
        e.preventDefault();
        dispatch({
            type: 'ADD_USER',
            userName
        })
        setUserName(userName)
        history.push('/dashboard');
    }

    const handleOpenApplication = () => {
        if (history.location.pathname === '/') {
            history.push('/dashboard');
        }
    }

    return (
        <div className="box-layout">
            <div className="box-layout__box">
            <h1 className="box-layout__title">Welcome to your Smart Home app</h1>
            <p>Control all your devices <br /> from one place</p>
            <input 
                type="text"
                placeholder="Who's using the app?"
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                className="box-layout__input"/>
            <button className="button" onClick={handleChange}>
                OPEN
            </button>
            </div>
        </div>
    )
};

export default LoginPage;
