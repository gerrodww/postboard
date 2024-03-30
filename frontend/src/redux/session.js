import { csrfFetch } from './csrf';

//Constants
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER
});




export const thunkAuthenticate = () => async (dispatch) => {
    try{
        const response = await csrfFetch("/api/restore-user");
        if (response.ok) {
            const data = await response.json();
            dispatch(setUser(data));
        }
    } catch (e){
        return e
    }
};

export const thunkLogin = (credentials) => async dispatch => {
    
    
    try {
        const {email, password} = credentials
        const response = await csrfFetch("/api/session", {
            method: "POST",
            body: JSON.stringify({credential: email, password})
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(setUser(data.user));
            return data
        } else if (response.status !== 200) {
            throw response
        }
        } catch (error) {
        const errorMessages = await error.json();
        return errorMessages
    }
};

export const thunkSignup = (user) => async (dispatch) => {
    
    try {
        const response = await csrfFetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
    
        if (response.ok) {
            const data = await response.json();
            dispatch(setUser(data.user));
        } else if (response.status !== 200) {
            throw response
        } 
        
    } catch (error) {
        const errorMessages = await error.json();
        return errorMessages
    }
};

export const thunkLogout = () => async (dispatch) => {
    await csrfFetch("/api/session", {
        method: "DELETE",
    });
    dispatch(removeUser());
};


const initialState = { user: null };

function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            return { ...state, user: null };
        default:
            return state;
    }
}

export default sessionReducer;
