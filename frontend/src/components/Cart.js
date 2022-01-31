import React , {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Typography, Button, TextField,Input} from '@material-ui/core/';
import {removeItem, addQuantity, subtractQuantity, orderAdd, orderUpdate} from './actions/cartActions'
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {withStyles} from "@material-ui/core/styles";
import {compose} from 'redux'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


const styles = theme => ({
    tableCellImage: {
        width:60,
        height:60,
        display:'none',
        [theme.breakpoints.up('sm')]:{
            display:'block'},
        [theme.breakpoints.up('md')]:{
            display:'block'},
    },
    tableCell: {
        width: 60,
        [theme.breakpoints.up('sm')]:{
            width:160},
        [theme.breakpoints.up('md')]:{
            width:160},
    },
    totalPayTypography:{
        width:'100%',
        marginTop:'15%'
    }
    
});

class Cart extends Component{

    handleRemove = (id) =>{
        this.props.removeItem(id);
    }

    handleAddQuantity = (id)=>{
        this.props.addQuantity(id);
    }
    handleSubtractQuantity = (id)=>{
        this.props.subtractQuantity(id);
    }

    handleMakeOrder = (addedItems)=>{
        const {ordered} = this.props;
        if(ordered == true){
            this.props.updateOrder(addedItems);
            this.props.discount.discount = 0;
            this.props.discount.total_after_discount=0;
        }
        else{
            this.props.addOrder(addedItems);
            this.props.discount.discount = 0;
            this.props.discount.total_after_discount=0;
        }    
    }

    getTotal = (price,quantity)=>{
        return price*quantity
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });      
      };

    render(){         
        const {classes,isAuthenticated} = this.props;
        let addedItems = this.props.items.length ?
            (         
                <TableContainer>
                <TableHead>
                <TableRow>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total price</TableCell>
                        </TableRow>
                     </TableHead>
                    <TableBody>
                        {this.props.items.map(item=> {
                            let price = item.price;
                            if(item.on_discount==true){
                                price = item.discount_price;
                            }
                            return(
                                <TableRow key={item.id}>
                                    <TableCell className={classes.imageCell} ><img className={classes.tableCellImage} src={String(item.image).split('frontend')[1]}/></TableCell>
                                    <TableCell component="th" scope="row"><b>{item.name}</b></TableCell>
                                    <TableCell className={classes.tableCell} align="right">{price} lei</TableCell>
                                    <TableCell className={classes.tableCell} align="right">{item.quantity}</TableCell>
                                    <TableCell className={classes.tableCell} align="right">{ this.getTotal(price,item.quantity).toFixed(2)} lei </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Link to="/cart"><i className="material-icons" onClick={()=>{this.handleAddQuantity(item.id)}}><AddIcon/></i></Link>
                                        <Link to="/cart"><i className="material-icons" onClick={()=>{this.handleSubtractQuantity(item.id)}}><RemoveIcon/></i></Link>
                                        <Button onClick={()=>{this.handleRemove(item.id)}}><DeleteIcon/></Button>
                                    </TableCell>
                                </TableRow> )                 
                        })}
                    </TableBody>
                </TableContainer>             
            ):(
                <p>Nothing.</p>
            )

            return(
                <Grid container xs={12} md={12}>
                    <Grid item xs={12} md={12}>
                        <Typography variant='h3'>You have ordered:</Typography>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <React.Fragment>     
                            {addedItems}
                        </React.Fragment> 
                    </Grid>  
                    <Grid item xs={12} md={3}>
                        <Grid container xs={12} md={12}>
                            <Grid item xs={12} md={12} className={classes.totalPayTypography}>
                            <Typography align='center' variant='h5'>Total to pay: {this.props.total}<b>lei</b></Typography>
                            </Grid>                      
                            <Grid item xs={12} md={12}>
                            <Button style={{width:'100%'}} component={Link} to={'/checkout'} disabled={!isAuthenticated || this.props.items.length < 1} variant="contained" color='primary' onClick={()=>{this.handleMakeOrder(this.props.items)}}>Make Order</Button>
                            {!isAuthenticated ? <div style={{textAlign:'center'}}>
                                <Link to="/login" variant="h6">
                                Please login
                                </Link>
                            </div>
                            :<div></div>}                  
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
        isAuthenticated: state.auth.token !== null,
        discount: state.cart.discount,
        ordered: state.cart.ordered,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        addQuantity: (id)=> {dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))},
        removeItem: (id) => {dispatch(removeItem(id))},
        addOrder: (addedItems) => {dispatch(orderAdd(addedItems))},
        updateOrder: (addedItems) => {dispatch(orderUpdate(addedItems))}
    }
}

export default compose(connect(mapStateToProps,mapDispatchToProps),withStyles(styles),)(Cart);