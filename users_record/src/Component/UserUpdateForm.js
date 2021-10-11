import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react'
import ButtonWrapper from './FormsUI/ButtonWrapper';
import * as Yup from "yup";
import Textfield from './FormsUI/Textfield';
import { useDispatch } from 'react-redux';
import { user_update } from '../actions/userActions';
import "./UserUpdateForm.css";
import { Link ,useHistory} from 'react-router-dom';

const useStyles=makeStyles((theme)=>({
    btn:{
        borderRadius:20,
        margin:'10px 10px',
        backgroundColor:"#674ea7",
        
    },
    custom: {
        color: "white",
        fontWeight:'bold',
        borderRadius:5,
        fontFamily: "sans-serif",
        textAlign:"center",
        margin:'10px 10px',
        backgroundColor:"#683697",
        color:theme.palette.getContrastText(theme.palette.primary.light)
      }
}))
function UserUpdateForm(props) {
    const classes=useStyles();
    const {data} =props.location;
    const history=useHistory();
        console.log(data);
        const initialValues={
            name:data.name,
            email:data.email,
            phoneno:data.phoneno,
            address:data.address
        }
        
        const FormValidationSchema=Yup.object().shape({
            name:Yup.string().required("Required"),
            email:Yup.string().required("Required").email("Invalid Email"),
            phoneno:Yup.number().integer().typeError("Please Enter  a valid phone number").required("Required"),
            address:Yup.string().required("Required"),
        });
        const dispatch=useDispatch();
    
    return (
        <div className="updateFormDiv">
            <div>
            <Formik 
            initialValues={{...initialValues}}
            validationSchema={FormValidationSchema}                       
            onSubmit={(values)=>{
                values.id=data._id;
                console.log(values);
                dispatch(user_update(values));
                history.push("./");
            }}
        >
            <Form>
                <Grid container spacing={2}>
                    
                <Grid item xs={12} className={classes.custom}>
                        <Typography fontSize={40}>
                            Update User Record Details
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Textfield
                        name="name"
                        label="Name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Textfield 
                        name="email"
                        label="Email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Textfield
                        name="phoneno"
                        label="Phone No"
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Textfield
                        name="address"
                        label="Address"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonWrapper className={classes.btn}>
                            Update User Record
                        </ButtonWrapper>
                    </Grid>
                    <Grid item xs={12}>
                        <Link to="/">
                            Back to Home Page  
                          </Link>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    
            </div>
    </div>

    )
}

export default UserUpdateForm;