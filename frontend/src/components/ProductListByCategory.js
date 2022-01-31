import React, {Component} from 'react';
import ProductDiv from './ProductDiv';
import Grid from '@material-ui/core/Grid';
import {productListByCategoryURL} from "./constants";
import {connect} from 'react-redux'
import { fetchProducts } from "./actions/cartActions";
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
class ProductListByCategory extends Component{
    constructor(props){
        super (props);
        this.state = {
         data:[],
        };      
    }
        getProductDetails() {         
            const { match : {params} } = this.props;
            fetch(productListByCategoryURL(params.categoryID)).then(response => {
                   if (response.status > 400) {
                       return this.setState(() => {
                           console.log('error')
                           return { placeholder: "Something went wrong"};
                       });
                   }
                   return response.json();
               })
             .then(data => {
                 this.setState(() => {
                     return { 
                         data,
                     };
                 });
                
             });       
            }

    componentDidMount(){
        this.getProductDetails()
    }

    componentDidUpdate(prevProps){
        if(this.props.location !== prevProps.location){             
            this.getProductDetails()
        }
    }

    render(){   
        const {data} = this.state;    
        return(   
            <Grid container spacing={1} style={{marginTop:10, display :'flex' , justifyContent:'space-around'}}>
                {data.map((value,index) => {                    
                return(
                    <Grid item > <ProductDiv temp={data[index]}/></Grid>
                    )          
                })}
            </Grid>);
    }};

const mapStateToProps = state => ({
        products: state.items,
        loading: state.loading,
        error: state.error
});

 
export default connect(mapStateToProps)(ProductListByCategory);    