import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Autocomplete, Dialog } from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import { Box, Button, TextField ,Typography} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as yup from "yup";
import {findById,saveProduct,updateProduct} from '../../api/products';


import { MenuItem } from '@mui/material';
import { toast } from "react-toastify";



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));
  
function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'red',
            }}
          >
            <CloseIcon />
          </IconButton>
      </DialogTitle>
    );
  }

const ProductInfoForm = props => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const params = useParams();
    const [state, setState] = useState({
        id: params.id,
        operationType: params.operationType
     });

     const [record, setRecord] = useState({
        id:null,
        productName:'',
        productPrice:'',
        quantity:0
    })

     
    const loadById = (id) => {
        //setRecord(props.state.selectedRow);
      findById(id)
      .then(response => {
          debugger;
          //console.log(response);
          setRecord(response.data, () => console.log(record));
      })
      .catch(error => {
          console.log(error);
      });
    }

 

  useEffect(() => {
    if(props.operationType === 'EDIT'){
      loadById(props.id);
    }else{
      setRecord(initialValues);
    }
    return () => console.log('unmounting...');
  }, []) 

  
  const handleClose = () => {
    props.setState({...props.state, showForm: false});
    props.loadProductsData();
  }

  const performProductSave = function(values,actions){
      saveProduct(values, actions)
      .then(response => {
        toast("Product Added Successfully");
        actions.resetForm();
        handleClose();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  const performProductUpdate = (values, actions) =>{
    updateProduct(values, actions)
    .then(response => {
      toast("Product Updated Successfully");
      actions.resetForm();
      handleClose();
    })
    .catch(error => {
      console.log(error.response);
    });
  }
  

  const submitForm = (values, actions) => {
    
    if(!values.id){
      const products = [...props.state.data]; 
      const nextId = Math.max(...products.map(ele => ele.id))+1;
      values.id = nextId;
      performProductSave(values,actions);
     }else{
      performProductUpdate(values,actions);
     }
     actions.setSubmitting(false);
  };

  //console.log(1);
  return (
     <BootstrapDialog
          fullWidth
          maxWidth="md"
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={props.showFormWin}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Product Info
          </BootstrapDialogTitle>
          <DialogContent dividers>
           <Formik 
           enableReinitialize
           onSubmit={submitForm}
           initialValues={record}
           validationSchema={checkoutSchema}
           >
           {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <Form>
              <Field type="hidden" className="form-control" name="id"/>
            
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                  <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  border="solid #a9a4a4c9"
                  padding ="6px"
                  sx={{
                      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                  >
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.productName}
                      name="productName"
                      error={!!touched.productName && !!errors.productName}
                      helperText={touched.productName && errors.productName}
                      sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Price"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.productPrice}
                      name="productPrice"
                      error={!!touched.productPrice && !!errors.productPrice}
                      helperText={touched.productPrice && errors.productPrice}
                      sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Quantity"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.quantity}
                      name="quantity"
                      error={!!touched.quantity && !!errors.quantity}
                      helperText={touched.quantity && errors.quantity}
                      sx={{ gridColumn: "span 4" }}
                  />

                  </Box>
                  
                  </Grid>
              </Grid>
             
               <Box display="flex" justifyContent="end" mt="20px">
                <Box sx={{ flexGrow: 1 }}>
                  <Button type="submit" color="primary" variant="contained" sx={{ backgroundColor: '#007bff' }}>
                    Submit
                  </Button>
                </Box>
                
          
                <Button variant="contained" onClick={handleClose} sx={{ backgroundColor: '#e99592' }}>Close</Button>
              </Box>
            </Form>
          )}
              
            </Formik>
          </DialogContent>
          
        </BootstrapDialog>

  )
}

const checkoutSchema = yup.object().shape({
    productName: yup.string().required("Product Name is required"),
    productPrice: yup.number().min(1,'Minumum Price is 1$').required("required"),
    quantity: yup.number().min(0,'Minmum Quantity is 0')

});

const initialValues = {
    id:null,
    productName:'',
    productPrice:'',
    quantity:0
};

  

export default ProductInfoForm
