import React, {Component} from 'react';
import {connect,} from 'react-redux';
import {Button , Grid, Typography} from '@material-ui/core';
import {clearCart}  from './actions/cartActions'

class Completed extends Component {

    constructor(props){
        super(props);
        
    }
    
    componentDidMount(){
        this.props.clearCart();
    }

    render(){    
        const {username} = this.props;
        return(
            <Grid container xs={12} alignItems="center" justify="center" style={{marginTop : 40}}>
                <Typography variant="h4"> Thank you,<b>{username}</b> your order has been completed </Typography>        
            </Grid>               
        )}
}


const mapStateToProps = state => {
    return {
        username: state.auth.username,
    };
};

const mapDispatchToProps = (dispatch) =>{
    return{
        clearCart : () => {dispatch(clearCart())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Completed)