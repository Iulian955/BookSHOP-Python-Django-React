import { AUTH_START ,AUTH_SUCCESS, AUTH_FAIL,AUTH_LOGOUT, RESET_PASS} from '../actions/action-types/auth-actions'

const initialState = {
    token: null,
    error: null,
    loading: false,
    username: null
}

const authReducer = (state= initialState, action) => {
   
    if(action.type == AUTH_START){
       return{...state,
        error: null,
        loading: true}
    }
    if(action.type == AUTH_SUCCESS){
        return{...state,
         token: action.token,
         error: null,
         loading: false,
         username: action.username}
     }
     if(action.type == AUTH_FAIL){
        return{...state,
         error: action.error,
         loading: false}
     }
     if(action.type == AUTH_LOGOUT){
        return{...state,
         token:null,
         loading:false}
     }
     if(action.type == RESET_PASS){
        return{...state,   
         error: null,
         loading: false,
        }
     }
     else{
         return state
     }
}

export default authReducer;