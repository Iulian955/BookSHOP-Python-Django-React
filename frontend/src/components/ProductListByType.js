import React, {Component} from 'react';
import ProductDiv from './ProductDiv';
import Grid from '@material-ui/core/Grid';
import {productListByTypeURL} from "./constants";
import {connect} from 'react-redux'
import axios from 'axios'

class ProductListByType extends Component{
    constructor(props){
        super (props);
        this.state = {
         data:[],
        };      
    }

    getProducts = () => {
            const { match : {params} } = this.props;
            axios.get(productListByTypeURL(params.type),{
                params: {type:params.type}
                }).then(res => {
                this.setState({
                    data: res.data})          
        })
    }
             
    componentDidMount(){
        this.getProducts();
    }

    componentDidUpdate(prevProps){
        if(this.props.location !== prevProps.location){             
            this.getProducts()
        }
    }

    render(){   
        const {data} = this.state;    
        return(   
            <Grid container spacing={1} style={{marginTop:10,display :'flex' , justifyContent:'space-around'}}>
                {data.map((value,index) => {                    
                return(
                    <Grid item align='center'> <ProductDiv temp={data[index]}/></Grid>
                    )          
                })}
            </Grid>);
    }};

const mapStateToProps = state => ({
        products: state.items,
        loading: state.loading,
        error: state.error
});

 
export default connect(mapStateToProps)(ProductListByType);    