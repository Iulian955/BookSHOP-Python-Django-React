import { ADD_ADDRESS, FAIL_ADDRESS, FINISH_ADDRESS } from "../actions/action-types/address-actions"


const initState = {
    data : {'streetAddress': '', 'apartamentAddress': '','city': '',
     'postalCode': '', 'deliveryType': '', 'totalCost': 0},
    loading: false,
    error: null
}

const addressReducer=(state= initState, action)=>{
    if(action.type == ADD_ADDRESS){
        return{...state,
        loading:true,
        error:null}
    }
    if(action.type == FAIL_ADDRESS){
        return{...state,
        loading:false,
        error:action.payload.error,
        }
    }
    if(action.type == FINISH_ADDRESS){
        return{...state,
        loading:false,
        data: action.payload.data
        }
    }
    else{
        return state
    }
   }

export default addressReducer