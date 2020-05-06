import { resetLoginForm } from './loginForm.js';
import { resetSignupForm } from './signupForm.js';
import { getMyChars } from './characters'

//stateless component1
//synchronous action creators
export const setCurrentUser = user => {
    return {
        type: 'SET_CURRENT_USER',
        user
    }
}

export const clearCurrentUser = () => {
    return {
        type: "CLEAR_CURRENT_USER",
    }
}



//asynchronous action creators
export const signup = signupData => {
    return async dispatch => {
        const res = await fetch("http://localhost:3001/api/v1/signup", {
            credentials: "include",
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupData)
        })
        const user = await res.json()
        if (user.error) {
            alert(user.error)
        }
        else {
            dispatch(setCurrentUser(user.data))
            dispatch(getMyChars())
            dispatch(resetSignupForm())
        }
    }
}

export const currentUserLogin = loginData => {
    return async dispatch => {
        const res = await fetch("http://localhost:3001/api/v1/login", {
            credentials: "include",
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
        const user = await res.json()
        if (user.error) {
            alert(user.error)
        }
        else {
            dispatch(setCurrentUser(user.data))
            dispatch(getMyChars())
            dispatch(resetLoginForm())
        }
    }
}

export const getCurrentUser = () => {
    return  dispatch => {
        return fetch("http://localhost:3001/api/v1/get_current_user", {
            credentials: "include",
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then(user => {
            if (user.notice) {
                alert(user.notice)
            } else {
                dispatch(setCurrentUser(user.data))
                dispatch(getMyChars())
            }
        })
        
    }
}

export const logout = () => {
    return dispatch => {
        dispatch(clearCurrentUser())
        return fetch('http://localhost:3001/api/v1/logout', {
            credentials: "include",
            method: "DELETE"
        })
        .then(res => res.json())
        .then(user => {
            alert(user.notice)
        })
    }
}