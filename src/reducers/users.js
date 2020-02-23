/*
    This is the reducer functionality that the context API is making use of
    to manage our state withing the application. 
*/

const usersReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {
                user: action.userName
            }
        case 'REMOVE_USER':
            return {
                user: action.userName
            }
        default:
            return state
    }
}

export { usersReducer as default }