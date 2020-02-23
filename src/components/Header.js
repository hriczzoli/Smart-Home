/*
    This is the component for the header
    It consumes values from the context and displays username, also uses 'history' from the router to change screens
    Also conditionally renders the username and a user icon
        (if user is 'logged in' -> 
         there's a dropdown menu displayed after clicking on the user icon -> 
         to 'log out' the user and return to 'Login Page'
        )
*/

import React, { useContext, useState } from 'react';
import UsersContext from '../context/user-context'
import { history } from '../routers/AppRouter';

const Header = () => {
    const { users, dispatch } = useContext(UsersContext)
    const [isActive, setIsActive] = useState('')

    const handleClick = () => {
        setIsActive(!isActive)
    }

    const handleLogOut = () => {
        dispatch({
            type: 'REMOVE_USER',
            user: false
        })
        setIsActive(!isActive)
        history.push('/');
    }

    return (
        <header className="page-header">
            <p className="header-title">Smart Home</p>
            <div className="user-info">
            <span className="userName">{users.user}</span>
                {users && <div className="userCircle" onClick={handleClick}>
                    <div className="face-circle"></div>
                    <div className="body"></div>
                    </div>
                }
                <div className={isActive ? 'dd-menu active' : 'dd-menu'}>
                    <ul>
                        <li onClick={handleLogOut}>Log out</li>
                    </ul>
                </div>
            </div>
        </header>
        
    )
};

export default Header;