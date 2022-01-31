import React, {Component} from 'react';
import ProductDiv from './ProductDiv';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux'
import { fetchProducts } from "./actions/cartActions"

class ProductList extends Component{
    constructor(props){
        super (props);
        this.state = {
        };
    }

    render(){
        const {error, loading, products} = this.props;

        if (error){
            return<div>Error! {error.message}</div>
        }
        if (loading){
            return <div>Loading...</div>
        }
        return(   
            <Grid container spacing={1} style={{marginTop:10,display :'flex' , justifyContent:'space-around'}}>
                {products.map((value,index) => {
                return(                    
                        <Grid item>
                            <ProductDiv temp={products[index]}/>
                        </Grid>) 
                })}
            </Grid>);                       
        }
    };
        
const mapStateToProps = state => ({
        products: state.cart.items,
        loading: state.cart.loading,
        error: state.cart.error
});


export default connect(mapStateToProps)(ProductList);    