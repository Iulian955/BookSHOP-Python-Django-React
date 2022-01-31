const apiURL = "/api";
const AuthUrl = "/rest-auth"

export const authEndpoint = `${AuthUrl}`;

export const productListURL = `${apiURL}/products/`;
export const productDetailURL = id => `${apiURL}/products/${id}`;
export const categoryListURL =`${apiURL}/category/`;
export const productListByCategoryURL = id =>`${apiURL}/category/${id}`;
export const productListByTypeURL = id =>`${apiURL}/type/${id}`;
export const productListBySearchURL = id => `${apiURL}/search/${id}`;

export const loginUrl = `${authEndpoint}/login/`;
export const signUpUrl = `${authEndpoint}/registration/`;

export const addCodeURL = `${apiURL}/add_code/`;

export const lastOrderURL = `${apiURL}/get_last_order/`;
export const createOrderURL = `${apiURL}/create_order/`;

export const getOpinionsURL = id => `${apiURL}/get_opinions/${id}`;
export const postOpinionURL = id => `${apiURL}/post_opinion/${id}`;

export const stripeURL = `${apiURL}/save-stripe-info/`;
export const awsURL = 'https://cdn.dc5.ro/img-prod/'

export const addAddressURL = `${apiURL}/add_address/`;
export const payOrderURL = `${apiURL}/pay_order/`;