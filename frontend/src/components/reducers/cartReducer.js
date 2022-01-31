import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,CLEAR_CART,COMPLETE,PAYMENT_NAMES, PRODUCTS_NAMES, ORDERS_NAMES,CODE_NAMES, DISCOUNT_NAMES, OPINION_NAMES} from '../actions/action-types/cart-actions'

const initState = {
    items: [],
    loading:false,
    error:null,
    addedItems:[],
    total: 0,
    discount: {'discount':0, 'total_after_discount':0},
    ordered: false
}

const cartReducer=(state= initState, action)=>{   
    if(action.type == PRODUCTS_NAMES.START_FETCH){
        return{...state,
        loading:true,
        error: null}
    }
    if(action.type == PRODUCTS_NAMES.FAIL_FETCH){
        return{...state,
        loading:false,
        error:action.payload.error,
        items:[]}
    }
    if(action.type == PRODUCTS_NAMES.FINISH_FETCH){     
        return Object.assign({}, state, {
            items: state.items.concat(action.payload.products),
            loading:false
        });
         
    }

    if(action.type == CLEAR_CART){
        return{...state,
            addedItems:[],
            total:0,
            discount: {'discount':0, 'total_after_discount':0}}
    }

    if(action.type == DISCOUNT_NAMES.START_DISCOUNT){
        return{...state,
        loading:true,
        error: null}
    }
    if(action.type == DISCOUNT_NAMES.FAIL_DISCOUNT){
        return{...state,
        loading:false,
        error:action.error,
        discount:0}
    }
    if(action.type == DISCOUNT_NAMES.FINISH_DISCOUNT){
        return {...state,
            discount: action.payload.discount,
            loading:false
        };      
    }

    if(action.type == ORDERS_NAMES.START_ORDER){
        return { ...state, loading:true,error:null }
    }
    if(action.type == ORDERS_NAMES.FAIL_ORDER){
        return { ...state, loading:false,error:action.error }
    }
    if(action.type == ORDERS_NAMES.FINISH_ORDER){
        return { ...state, loading:false,error:null, ordered:true }
    }

    if(action.type == PAYMENT_NAMES.START_PAYMENT){
        return { ...state, loading:true,error:null }
    }
    if(action.type == PAYMENT_NAMES.FAIL_PAYMENT){
        return { ...state, loading:false,error:action.error }
    }
    if(action.type == PAYMENT_NAMES.FINISH_PAYMENT){
        return { ...state, loading:false,error:null, ordered:false }
    }

    if(action.type == CODE_NAMES.START_CODE){
        return { ...state, loading:true,error:null }
    }
    if(action.type == CODE_NAMES.FAIL_CODE){
        return { ...state, loading:false,error:action.error }
    }
    if(action.type == CODE_NAMES.FINISH_CODE){
        return { ...state, loading:false,error:null }
    }

    if(action.type == OPINION_NAMES.START_ADD){
        return { ...state, loading:true,error:null }
    }
    if(action.type == OPINION_NAMES.FAIL_ADD){
        return { ...state, loading:false,error:action.error }
    }
    if(action.type == OPINION_NAMES.FINISH_ADD){
        return { ...state, loading:false,error:null }
    }

    if(action.type == COMPLETE){
        return {...state,loading:false,error:null, ordered:false}
    }

    if(action.type == ADD_TO_CART){
        let addedItem = state.items.find(item => item.id == action.id)
        let existingItem = state.addedItems.find(item => action.id == item.id)

        if(addedItem.on_discount == true){
            if(existingItem){
                addedItem.quantity += 1
                return{
                    ...state,
                    total: (Number(state.total) + Number(addedItem.discount_price)).toFixed(2)
                }
            }
            else{ 
                addedItem.quantity = 1;    
                let newTotal = Number(state.total) + Number(addedItem.discount_price)       
                return {
                    ...state,
                    addedItems: [...state.addedItems, addedItem],
                    total: newTotal.toFixed(2),
                }
            }
        }
        else{      
        if(existingItem){
            addedItem.quantity += 1
            return{
                ...state,
                total: (Number(state.total) + Number(addedItem.price)).toFixed(2)
            }
        }
        else{ 
            addedItem.quantity = 1;    
            let newTotal = Number(state.total) + Number(addedItem.price)       
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal.toFixed(2),
            }
        }
    }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        let newTotal = 0
        //calculating the total
        if (itemToRemove.on_discount == true){
            newTotal = Number((state.total)) - Number((itemToRemove.discount_price * itemToRemove.quantity))
        }else
        {newTotal = Number((state.total)) - Number((itemToRemove.price * itemToRemove.quantity ))}
        
        return{
            ...state,
            addedItems: new_items,
            total: newTotal.toFixed(2)
        }
    }    
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
        let newTotal = 0
        addedItem.quantity += 1 
        if (addedItem.on_discount == true){newTotal = Number(state.total) + Number(addedItem.discount_price)}
        else{newTotal = Number(state.total) + Number(addedItem.price)}
        return{
            ...state,
            total: newTotal.toFixed(2)
        }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        let newTotal = 0
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            if (addedItem.on_discount == true){newTotal = Number(state.total) - Number(addedItem.discount_price)}
            else{newTotal = Number(state.total) - Number(addedItem.price)}
            return{
                ...state,
                addedItems: new_items,
                total: newTotal.toFixed(2)
            }
        }
        else {
            addedItem.quantity -= 1
            if (addedItem.on_discount == true){newTotal = Number(state.total) - Number(addedItem.discount_price)}
            else{newTotal = Number(state.total) - Number(addedItem.price)}
            return{
                ...state,
                total: newTotal.toFixed(2)
            }
        }       
    }
    else{
        return state
    }
}

export default cartReducer