import React, { Component} from 'react'
import {Button, Grid, TextField , Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {postOpinion ,putOpinion} from './actions/cartActions'
import Rating from '@material-ui/lab/Rating';


class RatingStar extends Component {
 
    constructor(props){
        super(props);
        this.state = {
            selectedValue: 0,
            opinion: "",
            productId: 0,
            opinion_exist: false
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const {selectedValue,opinion,productId} = this.state;
        let sel = Number(selectedValue)
        this.props.putOpinion(sel,opinion,productId)
        window.location.reload(); 
    }
    
    handleChange = event => {
        this.setState({ selectedValue: event.target.value});
    };

    handleChangeName = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
    componentDidMount(){
        this.setState({ productId : this.props.productid})
    }
      
    componentDidUpdate(prevPros){
        if(prevPros.opinion_status !== this.props.opinion_status){
            this.setState({opinion_exist: this.props.opinion_status})
        }
    }
    
    render(){
        const {selectedValue,opinion,opinion_exist } = this.state;
        const {isAuthenticated} = this.props;
        return (
        <div>
            <Typography style={{padding:10 ,marginTop:10, textAlign:'center'}} variant="h6">User Rating</Typography>
            <form onSubmit={this.handleSubmit}>
                <Grid container spacing={2} textAlign="center"
                verticalAlign="middle">
                    <Grid item xs={12}>
                        <TextField
                            autoComplete='opinion'
                            name="opinion"
                            variant="outlined"
                            fullWidth
                            multiline={true}
                            rows={4}
                            id="opinion"
                            label="Opinion"
                            autoFocus
                            value={opinion}
                            inputProps={{ maxLength: 250 }}
                            onChange={this.handleChangeName}
                            />
                    </Grid>
                    
                    <Grid item xs={8}>
                    <Typography variant='h6'>Give Rating:</Typography>
                    <Rating value={selectedValue} onChange={this.handleChange}></Rating>              
                    </Grid>
                    <Grid item xs={4}>
                        {opinion_exist ? (<Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary">                  
                            Update opinion
                        </Button>):<Button
                        type="submit"
                        disabled={!isAuthenticated}
                        fullWidth
                        variant="contained"
                        color="primary">                  
                        Send opinion
                    </Button>}                       
                    </Grid>
                    </Grid>
                </form>          
            </div>)
    }
}

const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        postOpinion : (rating,opinion,productid) => {dispatch(postOpinion(rating,opinion,productid))},
        putOpinion : (rating,opinion,productid) => {dispatch(putOpinion(rating,opinion,productid))}
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(RatingStar)