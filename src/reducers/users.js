const usersReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {
                user: action.userName
            }
        default:
            return state
    }
}

export { usersReducer as default }