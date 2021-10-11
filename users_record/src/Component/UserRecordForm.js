import { React,useEffect,useState } from 'react'
import * as Yup from "yup";
import {Formik,Form, Field, ErrorMessage} from "formik";
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    Grid,
    Typography,
} from "@material-ui/core";
import Textfield from "./FormsUI/Textfield";
import ButtonWrapper from "./FormsUI/ButtonWrapper";
import { useDispatch ,useSelector } from 'react-redux';
import {user_entry} from "../actions/userActions";


function UserRecordForm() {

    const useStyles=makeStyles((theme)=>({
        formWrapper:{
            marginTop:theme.spacing(5),
            marginBottom:theme.spacing(8),
        },
    }));
    const initialValues={
        firstName:"",
        lastName:"",
        email:"",
        phoneno:"",
        addressLine1:"",
        addressLine2:"",
        city:"",
        pincode:"",
        state:"",
        country:"",
    }
    
    const FormValidationSchema=Yup.object().shape({
        firstName:Yup.string().required("Required"),
        lastName:Yup.string().required("Required"),
        email:Yup.string().required("Required").email("Invalid Email"),
        phoneno:Yup.number().integer().typeError("Please Enter  a valid phone number").required("Required"),
        addressLine1:Yup.string().required("Required"),
        addressLine2:Yup.string(),
        city:Yup.string().required("Required"),
        pincode:Yup.number().integer().required("Required"),
        state:Yup.string().required("Required"),
        country:Yup.string().required("Required")
    });
    
    const classes=useStyles();
   const userEntry=useSelector(state=>state.userEntry);

    const { user_entry_loading,user_entry_payload,user_entry_error } = userEntry;
    const dispatch=useDispatch();
    useEffect(() => {
        console.log(user_entry_payload);
    }, [user_entry_payload]);

    return (
        <Grid container>
            <Grid item xs={12}>

            </Grid>
            <Grid item xs={12}>
                <Container maxWidth="md">
                    <div className={classes.formWrapper}>
                        <Formik 
                            initialValues={{...initialValues}}
                            validationSchema={FormValidationSchema}                       
                            onSubmit={(values,{resetForm})=>{
                                console.log(values);
                                const {firstName,lastName,email,phoneno,addressLine1,addressLine2,city,pincode,state,country} = values;
                                const name = firstName + " "+ lastName;
                                const address=addressLine1 +" "+addressLine2 +" "+city+" "+pincode+" "+state+ " "+ country;
                                dispatch(user_entry(name,email,phoneno,address));
                                resetForm({});
                            }}
                        >
                            <Form>
                                <Grid container spacing={2}>
                                    
                                <Grid item xs={12}>
                                    <center><h3>ADD NEW USER</h3></center>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Textfield
                                        name="firstName"
                                        label="First Name"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Textfield
                                        name="lastName"
                                        label="Last Name"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Textfield 
                                        name="email"
                                        label="Email"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Textfield
                                        name="phoneno"
                                        label="Phone No"
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                        <Textfield
                                        name="addressLine1"
                                        label="Address Line 1"
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                        <Textfield
                                        name="addressLine2"
                                        label="Address Line 2"
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={6}>
                                        <Textfield
                                        name="city"
                                        label="City"
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={6}>
                                        <Textfield
                                        name="pincode"
                                        label="Pincode"
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={6}>
                                        <Textfield
                                        name="state"
                                        label="State"
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={6}>
                                        <Textfield
                                        name="country"
                                        label="Country"
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                        <ButtonWrapper>
                                            Add New User Record
                                        </ButtonWrapper>
                                    </Grid>
                                </Grid>
                            </Form>
                        </Formik>
                    </div>
                </Container>
            </Grid>
        </Grid>
    )
}

export default UserRecordForm;
