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
            type: 'ADD_USER',
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
                {users ? <div className="userCircle" onClick={handleClick}>
                    <div className="face-circle"></div>
                    <div className="body"></div>
                    </div> : <span></span>
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