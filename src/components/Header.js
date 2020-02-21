import React, { useContext } from 'react';
import UsersContext from '../context/user-context'

const Header = () => {
    const { users } = useContext(UsersContext)

    return (
        <header className="page-header">
            <p className="header-title">Smart Home</p>
            <div className="user-info">
            <span className="userName">{users.user}</span>
                {users ? <div className="userCircle">
                    <div className="face-circle"></div>
                    <div className="body"></div>
                    </div> : <span></span>
                }
                
            </div>
        </header>
        
    )
};

export default Header;