import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Navbar from './NavBar';
import ProductList from './ProductList';
import CategoryList from './CategoryList';
import ProductDetail from './ProductDetail';
import Registration from './RegistrationForm';
import LoginForm from './LoginForm';
import Cart from './Cart'
import ProductListByCategory from './ProductListByCategory'
import Checkout from './Checkout'
import Footer from './Footer'
import Payment from './Payment'
import ProductListByType from './ProductListByType'
import ProductListBySearch from './ProductListBySearch'
import Completed from './Completed'
import * as actions from './actions/authActions';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {compose} from 'redux'
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
   App: {
    position: 'relative',
    minHeight: '100vh',
    paddingBottom: 100
   }

})

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Crimson Text',
    ].join(','),   
    h3 : {
      fontSize: '1.2rem',
      '@media (min-width:600px)': {
      fontSize: '1.5rem',
      },
    },
    h7 : {
      fontSize: '1rem',
      '@media (min-width:600px)': {
      fontSize: '4.5rem',
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 760,
    }
  },
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: "#fafafa"
    }
  }
  ,});

if (window.location.origin === "http://127.0.0.1:8000") {
    axios.defaults.baseURL = "http://127.0.0.1:8000";
  } else {
    axios.defaults.baseURL = window.location.origin;
  }

class App extends Component{
    componentDidMount() {
      this.props.onTryAutoSignup();
    }
    
    render(){ 
      const {classes} = this.props;
        return(
          <ThemeProvider theme={theme}>
            <div className={classes.App}>
            <Router>
                  <div>
                    <Navbar/>
                    <CategoryList/>
                    <Grid container direction="row" xs={12} >
                      <Grid item xs={1} md={2}></Grid>             
                      <Grid container xs={10} md={8}>                  
                        <Switch>
                            <Route exact path='/' component={ProductList}/>
                            <Route exact path='/product/:productID' component={ProductDetail}/>
                            <Route exact path='/category/:categoryID' component={ProductListByCategory}/>
                            <Route exact path="/cart" component={Cart}/>
                            <Route exact path='/signup' component={Registration}/>
                            <Route exact path='/login' component={LoginForm}/>
                            <Route exact path='/checkout' component={Checkout}/>
                            <Route exact path='/type/:type' component={ProductListByType}/>
                            <Route exact path='/search/:query' component={ProductListBySearch}/>
                            <Route exact path='/completed' component={Completed}/>
                            <Route exact path='/payment' component={Payment}/>
                        </Switch>
                      </Grid>
                      <Grid item xs={1} md={2}></Grid>     
                    </Grid>
                    <Footer/>                  
                    </div>                                 
            </Router>        
         </div>
         </ThemeProvider>
        );
        }
}
   
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
}
export default compose(connect(mapStateToProps, mapDispatchToProps),withStyles(styles),)(App);




