import React, { Component} from 'react'
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {stripeURL} from './constants'
import {CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import axios from 'axios'
import {connect} from 'react-redux';
import {Button, Grid,Typography,TextField, List, ListItem, ListItemText, Divider,  } from '@material-ui/core';
import {Redirect} from "react-router-dom"
import {orderPayed} from './actions/cartActions'

class PaymentForm extends Component {
      
    constructor(props){
        super(props);
        this.state = {
            error:null, 
            email:"",
            success: ""
        };
    }
         
    handleChange = (event) => {
          if (event.error){
              this.setState({error: event.error.message});
          } else {
            this.setState({error: null});
          }
    }

    saveStripeInfo = (email , payment_method, total) => {
        axios.post(stripeURL,{
            email: email,
            payment_method_id : payment_method,
            amount: total
        }).then(response => {
            this.setState({success: response.data.message});
        }).catch(error => {
            console.log(error)
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {stripe, elements, total} = this.props;
        const {email} = this.state;
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),});
        this.saveStripeInfo(email,paymentMethod.id,total)
    };

    render() {
         const {email,error,success} = this.state;   
         const {stripe, items , total, address} = this.props;
         if(success == "Success"){
            this.props.orderPayed();
            return <Redirect to="/completed"></Redirect>
         }
         return(
            <Grid container xs={12}>
                <Grid item xs={12} md={6}>
                    <form onSubmit={this.handleSubmit} style={{width:290}}>
                        <Grid container spacing={1} textAlign="center" style={{height:"100%"}}
                        verticalAlign="middle">
                            <Grid item xs={12}>
                            <Typography variant='h6'>Payment</Typography>
                            </Grid>
                            <Grid item xs={12}>        
                            <TextField
                                autoComplete='email'
                                name="email"
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoFocus
                                value={email}
                                onChange={(event) => { this.setState({email: event.target.value})}}/> 
                            </Grid>
                            <Grid item xs={12}>      
                                <Typography variant='h6'>Card Number</Typography>
                                <CardElement id="card-element" onChange={this.handleChange} />
                                <div className="card-errors" role="alert">{error}</div>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant='contained' color='primary'>Submit Payment</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container xs={12}>
                    <Grid item xs={12}>
                        <Typography variant='h4'>Order</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <List>
                            <ListItemText disableTypography primary={<Typography variant='h7'>Street address: <b>{address.street_address}</b> </Typography>}/>
                            <ListItemText disableTypography primary={<Typography variant='h7'>Apartament address: <b>{address.apartment_address}</b></Typography>}/>
                            <ListItemText disableTypography primary={<Typography variant='h7'>City: <b>{address.city}</b></Typography>}/>
                            <ListItemText disableTypography primary={<Typography variant='h7'>Postal code: <b>{address.postal_code}</b></Typography>}/>
                            <ListItemText disableTypography primary={<Typography variant='h7'>Delivery type: <b>{address.delivery_type}</b></Typography>}/>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <List>
                        {items.map((value,index) => {                   
                            return(                                                                            
                                <ListItem>
                                    <ListItemText disableTypography primary={<Typography variant='h9'>{value.quantity} x <b>{value.name}</b></Typography>}/>                                    
                                </ListItem>                                                                                                                
                            )          
                        })}
                        <Divider/>
                        <ListItem>
                            <ListItemText disableTypography primary={<Typography variant='h9'>Total cost: <b>{total} lei </b></Typography>}/> 
                        </ListItem>
                        </List>
                        </Grid>             
                    </Grid>
                </Grid>
            </Grid>    
         )
      }
}
const mapStateToProps = (state) => {
    return{
        items: state.cart.addedItems,
        total :state.cart.total,
        discount: state.cart.discount,
        address: state.address.data
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        orderPayed: () => {dispatch(orderPayed())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm)




