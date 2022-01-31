import React, {Component} from 'react';
import {Button, Typography, Grid} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

class CartModal extends Component {
    
    onClose = () => {this.props.onClose && this.props.onClose();};

    render() {
        if(!this.props.show){
            return null;
        }
        let total_items = 0;
        for (let item of this.props.items){
            total_items += item.quantity
        }
        return (
            <div className={"ModalDiv center"}>
            <Grid container xs={12}>
                <Grid item xs={12}><Typography style={{textAlign:'center', backgroundColor:'rgb(25, 118, 210)', color:'white'}} variant='h6'>Added to Cart</Typography></Grid>
                <Grid item xs={7}>
                    <Grid container xs={12} style={{ marginTop:20 }}>
                        <Grid item xs={7} >
                            <div id="productDetailImg">
                                <img src={String(this.props.temp.image).split('frontend')[1]} width="200" height="200"/>
                            </div>
                        </Grid>
                        <Grid item xs={5} style={{ marginTop: '3em' }}>
                        <Typography variant='h6' style={{ borderRight: '0.1em solid black', padding: '0.5em' }}>{this.props.temp.name}</Typography>
                        {this.props.temp.on_discount ? (
                            <Typography style={{ borderRight: '0.1em solid black', padding: '0.5em' }} variant="h6">Discount price: {this.props.temp.discount_price}$ </Typography>)
                            : <Typography style={{ borderRight: '0.1em solid black', padding: '0.5em' }} variant="h6">Price: {this.props.temp.price}$ </Typography>}    
                        </Grid>
                    </Grid>
                </Grid>
                    <Grid item xs={4} style={{marginTop:'4em'}} >
                    <Typography variant='h6' style={{padding:'0.5em'}}>Items in cart:{total_items}</Typography>
                    <Typography variant='h6' style={{padding:'0.5em'}}>Total cost in cart: {this.props.total}$</Typography>           
                    </Grid>
            <Grid item xs={12}>
                <Grid container xs={12} style={{position:'absolute',bottom:10}}>
                    <Grid item xs={6} style={{position:'absolute',right:50,bottom:0}}><Link to='/cart'><Button onClick={this.onClose} variant="contained"  color='primary'>To cart</Button></Link></Grid>
                    <Grid item xs={6} style={{position:'absolute',left:50,bottom:0}}><Button variant="contained" color='primary' onClick={this.onClose}>Continue shopping</Button></Grid>              
                </Grid>           
            </Grid>
            </Grid>          
            </div>
        )
    }
}

const mapStateToProps = state => ({
    items: state.cart.addedItems,
    total : state.cart.total,

});

export default connect(mapStateToProps)(CartModal);    