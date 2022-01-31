import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {productDetailURL, getOpinionsURL} from "./constants";
import {connect} from 'react-redux'
import { addToCart } from './actions/cartActions'
import { fetchProductsID } from "./actions/cartActions";
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import RatingStar from './RatingStar';
import axios from 'axios'
import OpinionsForm from './OpinionsForm'
import Rating from '@material-ui/lab/Rating';
import {withStyles} from "@material-ui/core/styles";
import {compose} from 'redux'

const styles = theme => ({
    productItem:{
        position:'relative',
        display:'block',
        padding: '0.75rem 1.25rem 0.75rem 1.25rem',
        border: '1px solid rgba(0,0,0,0.125)',
		borderWidth: '0 0 1px',
    },
    productDetail: {
        width: 300,
        '& h1':{
            fontSize: '3rem',
            textAlign: 'center'
        },
        '& p':{
            fontSize: '1.5rem',
            textAlign: 'center'
        }
    },
    Column1 : {
        order:3,
        [theme.breakpoints.up('md')]:{
            order:2
        },
    },
    Column2 : {
        order:2,
        [theme.breakpoints.up('md')]:{
            order:3
        },
    }
});


class ProductDetail extends Component{
    constructor(props){
        super (props);
        this.state = {
            data:[], 
            opinions_:[],
            opinion_exist:false,  
        }   
    }

    componentDidMount(){
        this.getProductDetails();
        this.getOpinion();         
    }

    handleClick = (id) => {    
        this.props.addToCart(id);
    }

    getOpinion(){
        const { match : {params} } = this.props;
        this.getOpinions(params.productID);      
    }
    
    /*Get product from api */
    getProductDetails() {
        const { match : {params} } = this.props;
        fetch(productDetailURL(params.productID)).then(response => {
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

    getOpinions(productId){
                axios.get(getOpinionsURL(productId), {
                    headers: {Authorization: `${localStorage.getItem("token")}`}
                }).then(res => {           
                    return res.data          
                }).then(data => {
                    this.setState(()=> {
                        return {
                            opinions_:data
                        }
                    })
                })
                .catch(error => console.log(error));
            }

    componentDidUpdate(prevState){     
        if(prevState.opinions_ !== this.state.opinions_){
            if(this.state.opinion_exist == false){
                this.checkExistingOpinion();}
            }
        }

    checkExistingOpinion(){
       const {opinions_ } = this.state;
       const {username} = this.props;
       {opinions_.map((value,index) => {                    
            if(value.user == username){
                this.setState({opinion_exist:true})
            }}
        )}  
    }      

    render(){
        const {data,opinions_,opinion_exist} = this.state; 
        const {classes} = this.props;
        const item = data;
        const { match : {params} } = this.props;
       
        let numberOpinions = opinions_.length;
        let available = item.available ? 'Available' : 'Unavailable' 
        return(  
             <Grid container xs={12} md={12} style={{height:'100%', display:'flex'}}>
                    <Grid item xs={0} md={2}></Grid> 
                    <Grid container xs={12} md={8}>
                        <Grid item xs={12} md={6} className={classes.Column1}>    
                            <div style={{maxWidth:'100%', height:'auto'}}>
                                <img src={String(item.image).split('frontend')[1]} style={{verticalAlign:'middle', width:'100%',border :'4px black solid'}}/>                           
                            </div>
                            <div>
                                <RatingStar opinion_status={opinion_exist} productid = {params.productID}/>
                                <Grid container spacing={2}>        
                                {opinions_.map((value,index) => {                    
                                    return(
                                        <Grid item xs={12} >
                                            <OpinionsForm temp={opinions_[index]}/>
                                        </Grid>) 
                                })} 
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.Column2}>   
                            <div style={{display:'flex', flexDirection:'column', paddingLeft:0 , marginBottom:0}}>
                                <div className={classes.productItem}>
                                    <Typography align='center' variant="h3"><b>{item.name}</b></Typography> 
                                </div>
                                <div className={classes.productItem} >
                                    <Rating value={Number(item.rating)} readOnly='true'></Rating> ({numberOpinions}) Reviews
                                </div>
                                <div className={classes.productItem}>
                                    {item.on_discount ? (<span>
                                    <Typography align='left' variant="h8">Price: {item.price} lei </Typography>
                                    <Typography align='left' variant="h8"><b>Discount price: {item.discount_price} lei </b> </Typography></span> )
                                    : <Typography align='left' variant="h8">Price: {item.price} lei </Typography>}    
                                </div>
                                <div className={classes.productItem}>
                                <Typography align='justify' variant="h4"><b>{available}</b></Typography>
                                </div>
                                <div className={classes.productItem}>
                                <Typography align='justify' variant="h8">{item.description}</Typography>
                                </div>
                                <div id="CartButton" >
                                
                                <Button variant="contained" disabled={!item.available} onClick={()=>{this.handleClick(item.id)}} color='primary'>Add to Cart</Button>
                         
							    </div> 
                            </div>
                        </Grid>                             
                    </Grid>                           
                    <Grid item xs={0} md={2}></Grid>               
            </Grid>      
        );
    }

}
const mapStateToProps = state => ({
    products: state.cart.items,
    loading: state.cart.loading,
    error: state.cart.error,
    total : state.cart.total,
    username: state.auth.username
});

const mapDispatchToProps = (dispatch) => {
    return{
      fetchProductsID: (id) => {
            dispatch(fetchProductsID(id))
      },  
      addToCart: (id) => {
         dispatch(addToCart(id))
      },
    }
}

export default compose(connect(mapStateToProps,mapDispatchToProps),withStyles(styles),)(ProductDetail);
  