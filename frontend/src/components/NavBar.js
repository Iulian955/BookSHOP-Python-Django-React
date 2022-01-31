import React, {Component} from 'react';
import {AppBar, Grid, Toolbar, Typography, TextField, Button, Badge, IconButton} from '@material-ui/core/';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import { Link, } from "react-router-dom";
import {connect} from "react-redux";
import {compose} from 'redux'
import { logout } from './actions/authActions';
import {fade, withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    appBar:{
        height:130,
        [theme.breakpoints.up('sm')]:{
            height:100},
        [theme.breakpoints.up('md')]:{
        height:60},
        
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        }, 
        width:'16rem',
        [theme.breakpoints.up('md')]:{
            width:'17rem'}
      },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {    
        height:'100%', 
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        display:'flex',
        width: '100%',
    },
    iconsbar: {
        display: 'flex',
        padding: theme.spacing(0,2),
        alignItems: 'center',
        justifyContent: 'center'

    },
    largeIcon: {
        width: 36,
        height: 36,
      },
    navbarBackground: {
        width: '100%',
        height: 70,
        backgroundImage: `url('${window.location.origin}/static/images/1.jpg')`,
        backgroundPosition: '60% 55%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        [theme.breakpoints.up('md')]:{
            height:200},
    },
    linkDecoration:{
        textDecoration:"none",
        color:'white'
    },
    title:{
        [theme.breakpoints.up('md')]:{
            marginLeft:'2em',
            flex:1}
    },
    desktopBar:{
        display:'none', 
        [theme.breakpoints.up('sm')]:{
                display:'none'},
        [theme.breakpoints.up('md')]:{
                display:'flex'},
    },
    smBar:{
        display:'none',
        [theme.breakpoints.up('sm')]:{
            display:'flex'},
        [theme.breakpoints.up('md')]:{
            display:'none'},     
    },
    xsBar:{
        display:'flex',
        [theme.breakpoints.up('sm')]:{
            display:'none'},
        [theme.breakpoints.up('md')]:{
            display:'none'},        
    }
});

class NavBar extends Component {

    state= {
        query: ""
    }
    
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render(){
        const {classes, authenticated,items,username, total} = this.props;
        const {query} = this.state;
        return(      
            <div >
                <div className={classes.navbarBackground}>
                </div>                
                <AppBar className={classes.appBar} position="static"> 
                <Toolbar className={classes.desktopBar} variant="dense">             
                        <Typography variant='h3' className={classes.title}>
                            <Link className={classes.linkDecoration} to="/"><Typography variant='h4'>Shop</Typography></Link> 
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <div>
                            <form  className={classes.inputInput} onSubmit={e => { e.preventDefault(); }}>
                                <TextField style={{marginTop: 2}}   
                                name="query"
                                required
                                fullWidth       
                                autoFocus
                                value={query}
                                inputProps={{ maxLength: 50 }}
                                onChange={this.handleChange}
                                />
                                <Button style={{marginLeft: 8}} component={Link} to={`/search/${query}`} type="submit" color="secondary" variant="contained">Search</Button>
                            </form>
                            </div> 
                        </div>
                        <div className={classes.title} />
                        <IconButton className={classes.cartButton} size='medium' >
                        <Link to='/cart'>    
                            <Badge badgeContent={items.length} color="secondary">
                             <ShoppingCartIcon color="secondary" className={classes.largeIcon}/>
                             </Badge>
                          </Link>
                        </IconButton>
                        <Typography className={classes.iconsbar}>{total} lei </Typography>
                        {authenticated ?(             
                            <span>
                            <Typography className={classes.iconsbar}> {username} </Typography>
                            <Typography className={classes.iconsbar} onClick={() => this.props.logout()}> Logout </Typography>
                            </span>
                        ):(
                            <div style={{display:'flex'}}>
                                <Link className={classes.linkDecoration} to='/login'><Typography className={classes.iconsbar}>Login</Typography></Link>
                                <Link className={classes.linkDecoration} to='/signup'><Typography className={classes.iconsbar}>Signup</Typography></Link>
                            </div>
                        )}                                                                                  
                </Toolbar>                                         
                <Toolbar className={classes.smBar} variant='dense'>
                    <Grid container xs={12}>
                        <Grid container xs={8}>
                            <Grid item xs={12}>
                            <Typography variant='h3' className={classes.title}>
                            <Link className={classes.linkDecoration} to="/"><Typography variant='h4'>Shop</Typography></Link> 
                            </Typography>
                            </Grid>
                            <Grid item xs={12}>
                            <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <div>
                            <form  className={classes.inputInput} onSubmit={e => { e.preventDefault(); }}>
                                <TextField style={{marginTop: 2}}   
                                name="query"
                                required
                                fullWidth       
                                autoFocus
                                value={query}
                                inputProps={{ maxLength: 50 }}
                                onChange={this.handleChange}
                                />
                                <Button style={{marginLeft: 8}} component={Link} to={`/search/${query}`} type="submit" color="secondary" variant="contained">Search</Button>
                            </form>
                            </div> 
                        </div>
                            </Grid>
                        </Grid>
                        <Grid container xs={4}>
                            <Grid container xs={12} direction="row" alignItems="center" justify="flex-end">   
                                {authenticated ?(             
                                    <span>
                                        <Typography className={classes.iconsbar}> {username} </Typography>
                                        <Typography className={classes.iconsbar} onClick={() => this.props.logout()}> Logout </Typography>
                                    </span>
                                ):(
                                    <div style={{display:'flex'}}>
                                        <Link className={classes.linkDecoration} to='/login'><Typography variant='h7' className={classes.iconsbar}>Login</Typography></Link>
                                        <Link className={classes.linkDecoration} to='/signup'><Typography variant='h7' className={classes.iconsbar}>Signup</Typography></Link>
                                    </div>
                                )} 
                            </Grid>
                            <Grid container xs={12} direction="row" alignItems="center" justify="flex-end">
                                <div style={{display:'flex'}}>
                                <IconButton className={classes.cartButton} size='medium' >
                                    <Link to='/cart'>    
                                    <Badge badgeContent={items.length} color="secondary">
                                    <ShoppingCartIcon color="secondary" className={classes.largeIcon}/>
                                    </Badge>
                                    </Link>
                                </IconButton>
                                <Typography className={classes.iconsbar}>{total} lei </Typography>
                                </div>
                            </Grid>                     
                        </Grid>
                    </Grid>                
            </Toolbar>
                <Toolbar className={classes.xsBar} variant='dense'>
                <Grid container xs={12} direction="column" display="flex" justify="center">
                    <Grid container xs={8} justify="center">
                        <Grid item xs={12}>
                        <Typography variant='h3'  className={classes.title}>
                        <Link className={classes.linkDecoration} to="/"><Typography align="center" variant='h4'>Shop</Typography></Link> 
                        </Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <div>
                        <form  className={classes.inputInput} onSubmit={e => { e.preventDefault(); }}>
                            <TextField style={{marginTop: 2}}   
                            name="query"
                            required
                            fullWidth       
                            autoFocus
                            value={query}
                            inputProps={{ maxLength: 50 }}
                            onChange={this.handleChange}
                            />
                            <Button style={{marginLeft: 8}} component={Link} to={`/search/${query}`} type="submit" color="secondary" variant="contained">Search</Button>
                        </form>
                        </div> 
                    </div>
                        </Grid>
                    </Grid>
                    <Grid container xs={12} direction="row" alignItems="center" >
                    <Grid container xs={6} justify="flex-start">               
                        <IconButton className={classes.cartButton} size='medium' >
                            <Link to='/cart'>    
                            <Badge badgeContent={items.length} color="secondary">
                            <ShoppingCartIcon color="secondary" className={classes.largeIcon}/>
                            </Badge>
                            </Link>
                        </IconButton>
                        <Typography className={classes.iconsbar}>{total} $</Typography>
                    </Grid>
                    <Grid container xs={6} justify="flex-end">   
                        {authenticated ?(             
                            <span>
                            <Typography className={classes.iconsbar}> {username} </Typography>
                            <Typography className={classes.iconsbar} onClick={() => this.props.logout()}> Logout </Typography>
                            </span>
                        ):(
                            <div style={{display:'flex'}}>
                                <Link className={classes.linkDecoration} to='/login'><Typography variant='h7' className={classes.iconsbar}>Login</Typography></Link>
                                <Link className={classes.linkDecoration} to='/signup'><Typography variant='h7' className={classes.iconsbar}>Signup</Typography></Link>
                            </div>
                        )} 
                    </Grid>
                                         
                </Grid>              
                </Grid>   
            </Toolbar>
            </AppBar>                
    </div>
    );
    };
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        items: state.cart.addedItems,
        username: state.auth.username,
        total: state.cart.total,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    };
};

export default compose(connect(mapStateToProps, mapDispatchToProps),withStyles(styles),)(NavBar);