/*
    Using React's context API for logging a user in/out, and passing the state of the username around in the application
    Would use Redux for building the application and managing state of the devices,
    however for only managing the login/logout functionality the context API is sufficient enough
*/

import React from 'react';

const UserContext = React.createContext()

export { UserContext as default }