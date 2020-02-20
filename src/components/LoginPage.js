import React from 'react';
import AppRouter, { history } from '../routers/AppRouter';

const LoginPage = () => {

    const handleOpenApplication = () => {
        if (history.location.pathname === '/') {
            history.push('/dashboard');
        }
    }

    return (
        <div className="box-layout">
            <div className="box-layout__box">
            <h1 className="box-layout__title">Welcome to your Smart Home app</h1>
            <p>Control all your devices from one place</p>
            <button className="button" onClick={handleOpenApplication}>
                OPEN
            </button>
            </div>
        </div>
    )
};

export default LoginPage;
