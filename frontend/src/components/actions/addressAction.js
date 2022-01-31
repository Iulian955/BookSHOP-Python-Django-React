import {ADD_ADDRESS, FAIL_ADDRESS, FINISH_ADDRESS} from './action-types/address-actions';
import {COMPLETE} from './action-types/cart-actions';
import {addAddressURL} from "../constants";
import axios from 'axios'


export const addAddress = (street_address,apartment_address,city,postal_code,delivery_type) => {
    const data_ = {'streetAddress': street_address, 'apartamentAddress': apartment_address,
     'city': city, 'postalCode': postal_code, 'deliveryType': delivery_type, 'totalCost': 0}
    return dispatch => {
        dispatch(AddAddress());
        axios.post(addAddressURL,{
            street_address : street_address,
            apartment_address : apartment_address,
            city : city,
            postal_code : postal_code,
            delivery_type : delivery_type
        },{headers: {
            Authorization: `${localStorage.getItem("token")}`}
        }).then(res=>{    
            dispatch(Complete()) 
            dispatch(FinishAddress(res.data))         
        }).catch(error => dispatch(FailAddress(error)));
    };
};

export const AddAddress = () => ({
    type: ADD_ADDRESS
});
export const FailAddress = error => ({
    type: FAIL_ADDRESS,
    payload: {error}
});
export const FinishAddress =data=> ({
    type: FINISH_ADDRESS,
    payload:{data}
});

export const Complete = () => ({
    type: COMPLETE
})