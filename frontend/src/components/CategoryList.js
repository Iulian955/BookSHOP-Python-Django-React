import React, {Component} from 'react';
import {categoryListURL} from "./constants";
import {Link, BrowserRouter as Router, Switch} from 'react-router-dom';
import {List, ListItem, ListItemText, Button,Typography, Paper,Divider} from "@material-ui/core/"
import {withStyles} from "@material-ui/core/styles";


const styles = theme => ({
    linkItem: {
        textDecoration: 'none',
        flexGrow:1,
    },
    listItem: {    
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        height:'60',
    },
    listDiv: {
        [theme.breakpoints.up('md')]:{
            display: 'flex'
        },
            display: 'none'

    },
    categoryList:{      
        top:0,
        zIndex: 2,
        backgroundColor: 'white',
        fontSize: '0.8rem',
        fontWeight:600,
        letterSpacing: '0.15em', 
        border: '1px solid rgba(0,0,0,0.125)',
        borderWidth: '0 0 1px',
        [theme.breakpoints.up('md')]:{
            fontSize:'1rem',
            position:'sticky',
        }
    },
    listP: {
        display:'block',
        height:45,
        backgroundColor:'#212121',
        color:'white',
        justifyContent:'center',
        alignItems: 'center',
        [theme.breakpoints.up('md')]:{
            display:'none'
        },
        
        
    },
});

class CategoryList extends Component{

    constructor(props){
        super (props)
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading",
            clicked:false,
         }; 
        this.updateDimensions = this.updateDimensions.bind(this);
        }  

    async componentDidMount(){
        window.addEventListener("resize", this.updateDimensions);
        fetch(categoryListURL).then(response => {
            if (response.status > 400) {
                return this.setState(() => {
                    console.log('error')
                    return { placeholder: "Something went wrong"};
                });
            }
            return response.json();
        }).then(data => {
             this.setState(() => {
                 return { 
                     data,
                     loaded:true
                 };
             });
         });       
        }  

        openDiv(){          
            this.setState({clicked : !this.state.clicked});
        }

        updateDimensions() {
            if (window.innerWidth > 900) {
            this.setState({
              clicked: false
            });
        }
        }

        render(){
            const {classes} = this.props;
            const {data} = this.state;
            let newType = 'new';
            let discountType = 'discount';
            const isClicked = this.state.clicked ? 'divClicked' : '';
            if (this.state.loaded == true){
                let item = data;     
            return(          
                    <List className={classes.categoryList}>
                    <div className={classes.listP}  onClick={() => this.openDiv()} onChange={() => this.listener()}>
                        <Typography variant="h4" align='center' >Category</Typography>
                    </div>
                    <div className={[classes.listDiv, isClicked].join('')}>               
                        <Link className={classes.linkItem} to={'/'}>
                            <ListItem  className={classes.listItem} button onClick={() => this.setState({clicked:false})}>
                                    <ListItemText disableTypography primary={<Typography variant='h9'>All</Typography>}/> 
                            </ListItem> 
                        </Link>  
                        <Link className={classes.linkItem} to={`/type/${discountType}`}>
                            <ListItem  className={classes.listItem} button onClick={() => this.setState({clicked:false})}>
                                    <ListItemText disableTypography primary={<Typography style={{color:'red'}} variant='h9'>On Discount</Typography>}/> 
                            </ListItem> 
                        </Link> 
                        <Link className={classes.linkItem} to={`/type/${newType}`}>
                            <ListItem  className={classes.listItem} button onClick={() => this.setState({clicked:false})}>
                                    <ListItemText disableTypography primary={<Typography style={{color:'red'}} variant='h9'>New</Typography>}/> 
                            </ListItem> 
                        </Link>                                 
                        {item.map((value,index) => {                   
                            return(                                                         
                                <Link className={classes.linkItem} to={`/category/${value.slug}`}>  
                                    <ListItem className={classes.listItem} button onClick={() => this.setState({clicked:false})}>
                                        <ListItemText disableTypography primary={<Typography style={{color:'#212121'}} variant='h9'>{value.name}</Typography>}/> 
                                    </ListItem> 
                                </Link>                                                                                                                  
                            )          
                        })}
                        </div>
                    </List>                      
            )
            }
            else{return(<h1></h1>)}
        }
}
export default withStyles(styles)(CategoryList);

