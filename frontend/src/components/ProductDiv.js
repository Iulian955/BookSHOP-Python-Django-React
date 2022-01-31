import React, {Component} from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {addToCart} from './actions/cartActions'
import CartModal from './CartModal'
import {awsURL} from './constants'
import {withStyles} from "@material-ui/core/styles";
import {compose} from 'redux'

const styles = theme => ({
    ProductDiv:{
        height: 430,
        width: 200,
        transition: 'transform 1s',
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
        position: 'relative',
        zIndex: 0, 
		backgroundColor:'white',
		border : '1px black solid' ,
        '& h1, h2':{
            textAlign: 'center',
			fontFamily: "'Crimson Text', sans-serif",
			fontSize: 20
        },
        '&:hover':{
           //transition: 'all 0.7s',
           //backgroundColor: 'rgba(77,77,77,0.5)',         
        },
        '&:hover $ProductImg':{
            //opacity: 0
        },
        '&:hover $ProductInfo':{
            //opacity: 1
        },
        '&:hover $ProductContent':{
           // opacity: 1
        },
        '&:hover $CardDescription':{
            //opacity: 0
        },      
    },
    ProductInfo:{
        opacity:1
    },  
    ProductContent:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    
    },
    ProductImg: {
	   height: 230,
	   width : 200,
	   objectFit: 'fill',
	   borderBottom: '5px solid black',
		   
        "& img":{
		
		   
        }
    },
    CardDescription: {
        margin: '10% 5% 5% 5%',
        textIndent: '1.5em',
        position:'absolute',
        height:'100%',
        opacity: '0',
        "& p": {
            color: 'red',
            textAlign: 'center'
        }
    },
    CardContent: {
        position:'absolute',
        top: 0,
        left: 0,
        width:'100%',
        height:'100%',
    },
    
});

class ProductDiv extends Component {
    constructor(props){
        super (props);
        this.state = {
            hover: false,
            showModal: false
        }       
    }

    showModal = () => {
        this.setState({
            showModal: !this.state.showModal })
    }

    handleHoverOn = () => {
        this.setState({
            hover:true        
        });
    }

    handleHoveroff = () => {
        this.setState({
            hover:false           
        });
    }

    handleClick = (id) => {    
        this.props.addToCart(id);
        //this.showModal();
    }
    componentDidMount(){
        this.setState()
    }

    
    render() { 
        const {classes} = this.props
        let image=""    
        if(window.location.origin === "https://cdn.dc5.ro/img-prod/"){
            let image_end_url = String(this.props.temp.image).split('static')[1]
            let next_part = image_end_url.split('_')[0]
            image = String(`${awsURL}${image_end_url}` +'.jpg')         
        }
        else{
            let image_end_url = String(this.props.temp.image).split('static')[1]
            image = String(`${awsURL}${image_end_url}`)
        }
        let available = String(this.props.temp.available) ? 'Dostępny' : 'Niedostępny'  
        return(
        <div>  
        <div className={classes.ProductDiv} onMouseEnter={this.handleHoverOn} onMouseLeave={this.handleHoveroff}> 
            <div className={classes.CardDescription}>  
                <Typography variant='body' color='textSecondary' component={"p"}>
                    {this.props.temp.description}
                </Typography>
             </div>
             <div className={classes.CardContent}>         
                <div>
                    <CardMedia className={classes.ProductImg} component={'img'}
                    alt="Product"
                    height="50"
					width ="50"
                    image={image}
                    title={this.props.temp.name}
                    />
                </div>
                <CardContent className={classes.ProductInfo}>
                <Link style={{textDecoration:'none'}} to={`/product/${this.props.temp.id}`}>
                    <Typography color="primary" gutterBottom varian='h5' component='h2'>
                        <b>{this.props.temp.name}</b>     
                    </Typography>
                    </Link>  
                    <div >
                        <Typography variant="body2" color="textSecondary" component="h2">
                            {this.props.temp.author}
                        </Typography>
                        {this.props.temp.on_discount ? (
                            <div style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
                            <Typography style={{color:'grey', textDecorationLine: 'line-through'}} gutterBottom component='h1'>{this.props.temp.price} lei   </Typography>
                            <Typography style={{color:'red'}} gutterBottom variant='h5' component='h6'>{this.props.temp.discount_price} lei</Typography></div>)
                             : <Typography gutterBottom variant='h6' component='h1'>
                            {this.props.temp.price} lei
                        </Typography>
                        }                      
                    </div>                 
                <div className={classes.ProductContent}>                            
                    <Button disabled={!this.props.temp.available} onClick={() => {this.handleClick(this.props.temp.id)}} style={{position:'absolute',top:385,height:30, width:150}} variant="contained"  color='primary'>
                      <b> Add to cart </b>                 
                    </Button>                   
                </div>       
                </CardContent>                                
            </div>         
        </div>
        <CartModal onClose={() =>{this.showModal()}} temp={this.props.temp} show={this.state.showModal}></CartModal> 
        </div>
    );
}
}

const mapDispatchToProps = (dispatch) => {
    return{  
      addToCart: (id) => {dispatch(addToCart(id))
      }
    }
}

export default compose(connect(null,mapDispatchToProps),withStyles(styles),)(ProductDiv);    
