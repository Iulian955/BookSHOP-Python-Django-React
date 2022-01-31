import React, { Component} from 'react'
import axios from 'axios';
import {Button, Grid, TextField , Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {getOpinions} from './actions/cartActions'
import Rating from '@material-ui/lab/Rating';
class OpinionsForm extends Component {
 
    constructor(props){
        super(props);
    }   

    render(){
        return(
            <Grid container xs={12}>
                <Grid item xs={4}>
                    <Typography align='left' variant="h6">{this.props.temp.user}</Typography>
                    <Typography align='left' variant="h5"><Rating value={Number(this.props.temp.rating)} readOnly='true'/></Typography>                 
                </Grid>
                <Grid item xs={8}>
                    <Typography align='justify' variant="h6">{this.props.temp.opinion}</Typography>
                </Grid>
            </Grid>)
    }
}

export default (OpinionsForm)