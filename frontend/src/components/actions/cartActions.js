import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,CLEAR_CART,PAYMENT_NAMES, PRODUCTS_NAMES, ORDERS_NAMES,CODE_NAMES, DISCOUNT_NAMES, OPINION_NAMES} from './action-types/cart-actions'
import {productListURL,productDetailURL,createOrderURL,addAddressURL, postOpinionURL, addCodeURL,getOpinionsURL, lastOrderURL,payOrderURL} from "../constants";
import axios from 'axios'

export const fetchProducts = () => {
    return dispatch => {
      dispatch(startFetchProducts());
      axios.get(productListURL)
        .then(res => { 
            dispatch(finishFetchProducts(res.data));        
            return res.data
        })
        .catch(error => dispatch(failFetchProducts(error)));
    };
}

export const fetchProductsID = () => {
    return dispatch => {
        dispatch(startFetchProducts());
        axios.get(productDetailURL(id))
          .then(res => { 
              dispatch(finishFetchProducts(res.data));        
              return res.data
          })
          .catch(error => dispatch(failFetchProducts(error)));
      };
  }


export const orderAdd = (order_items) =>{  
    return dispatch => {
        dispatch(startAddOrder());
        axios.post(createOrderURL,{
            order_items:order_items,            
            },
            {headers: {
                Authorization: `${localStorage.getItem("token")}`}
        }).then(()=>{     
            dispatch(finishAddOrder())
        }).catch(error => dispatch(failAddOrder(error)));
    };
};

export const orderUpdate = (order_items) =>{  
    return dispatch => {
        dispatch(startAddOrder());
        axios.put(createOrderURL,{
            order_items:order_items,            
            },
            {headers: {
                Authorization: `${localStorage.getItem("token")}`}
        }).then(()=>{     
            dispatch(finishAddOrder())
        }).catch(error => dispatch(failAddOrder(error)));
    };
};

export const orderPayed = () =>{  
    return dispatch => {
        dispatch(startPayment());
        axios.put(payOrderURL,
        {},
            {headers: {
                Authorization: `${localStorage.getItem("token")}`}
        }).then(()=>{     
            dispatch(finishPayment())
        }).catch(error => dispatch(failPayment(error)));
    };
};


export const postOpinion = (rating,opinion,productid) => {
    return dispatch => {
        dispatch(startAddOrder());
        axios.post(postOpinionURL(productid),{
            rating: rating,
            opinion : opinion,
            product: productid
        },{headers: {
            Authorization: `${localStorage.getItem("token")}`}
        }).then(()=>{dispatch(finishAddOrder())
        }).catch(error => dispatch(failAddOrder(error)));
    }
}

export const putOpinion = (rating,opinion,productid) => {
    return dispatch => {
        dispatch(startAddOrder());
        axios.put(postOpinionURL(productid),{
            rating: rating,
            opinion : opinion,
            product: productid
        },{headers: {
            Authorization: `${localStorage.getItem("token")}`}
        }).then(()=>{dispatch(finishAddOrder())
        }).catch(error => dispatch(failAddOrder(error)));
    }
}

export const getOpinions = (productId) => {
    return dispatch => {
        dispatch(startFetchOpinions());
        axios.get(getOpinionsURL(productId), {
            headers: {Authorization: `${localStorage.getItem("token")}`}
        }).then(res => {           
            dispatch(finishFetchOpinions(res.data));
            return res.data          
        }).catch(error => dispatch(failFetchOpinions(error)));
    }
}

export const addAddress = (street_address,apartment_address,city,postal_code,delivery_type) => {
    return dispatch => {
        dispatch(startAddOrder());
        axios.post(addAddressURL,{
            street_address : street_address,
            apartment_address : apartment_address,
            city : city,
            postal_code : postal_code,
            delivery_type : delivery_type
        },{headers: {
            Authorization: `${localStorage.getItem("token")}`}
        }).then(()=>{     
            dispatch(finishAddOrder())
        }).catch(error => dispatch(failAddOrder(error)));
    };
};

export const addCode = (e, code) => {
    e.preventDefault();
    return async dispatch => {
        dispatch(startAddCode());
        await axios.post(addCodeURL,{
            code:code
        },{headers: {Authorization: `${localStorage.getItem("token")}`}
    }).then(()=> {    
        dispatch(finishAddCode())
        dispatch(getLastOrder())
    }).catch(error => dispatch(failAddCode(error)));
    };
};

export const getLastOrder =  () => {
     return  dispatch => {
         dispatch(startFetchDiscount());
         axios.get(lastOrderURL,{
            headers: {Authorization: `${localStorage.getItem("token")}`}
        }).then(res => {
            dispatch(finishFetchDiscount(res.data));
            return res.data          
        }).catch(error => dispatch(failFetchDiscount(error)));
    };
} 

export const addToCart = (id) => {
    return{
        type:ADD_TO_CART,
        id
    }
};

export const removeItem = (id) => {
    return{
        type:REMOVE_ITEM,
        id
    }
};

export const subtractQuantity=(id)=>{
    return {
        type: SUB_QUANTITY,
        id
    }
};

export const addQuantity=(id)=>{
    return {
        type: ADD_QUANTITY,
        id
    }
};

export const startFetchProducts = () => ({
    type: PRODUCTS_NAMES.START_FETCH
});
export const failFetchProducts = error => ({
    type: PRODUCTS_NAMES.FAIL_FETCH,
    payload: {error}
});
export const finishFetchProducts = products => ({
    type: PRODUCTS_NAMES.FINISH_FETCH,
    payload:{products}
});

export const startFetchDiscount = () => ({
    type: DISCOUNT_NAMES.START_DISCOUNT
});
export const failFetchDiscount = error => ({
    type: DISCOUNT_NAMES.FAIL_DISCOUNT,
    payload: {error}
});
export const finishFetchDiscount = discount => ({
    type: DISCOUNT_NAMES.FINISH_DISCOUNT,
    payload:{discount}
});

export const startAddOrder = () => ({
    type: ORDERS_NAMES.START_ORDER
})
export const finishAddOrder = () => ({
    type: ORDERS_NAMES.FINISH_ORDER,   
})
export const failAddOrder = error => ({
    type: ORDERS_NAMES.FAIL_ORDER,
    error: error
})

export const startPayment = () => ({
    type: PAYMENT_NAMES.START_PAYMENT
})
export const finishPayment = () => ({
    type: PAYMENT_NAMES.FINISH_PAYMENT  
})
export const failPayment = error => ({
    type: PAYMENT_NAMES.FAIL_PAYMENT,
    error: error
})

export const startAddCode = () => ({
    type: CODE_NAMES.START_CODE
})
export const finishAddCode = () => ({
    type: CODE_NAMES.FINISH_CODE   
})
export const failAddCode = error => ({
    type: CODE_NAMES.FAIL_CODE,
    error: error
})

export const clearCart = () => ({
    type : CLEAR_CART
})

export const startFetchOpinions = () => ({
    type: OPINION_NAMES.START_ADD
})
export const failFetchOpinions = error => ({
    type: OPINION_NAMES.FAIL_ADD,
    error: error
})
export const finishFetchOpinions = () => ({
    type: OPINION_NAMES.FINISH_ADD
})