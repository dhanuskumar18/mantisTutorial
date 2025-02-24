import { useOutletContext } from 'react-router';

// material-ui
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { UPDATE } from 'contexts/auth-reducer/actions';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useParams } from "react-router-dom";
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import { openSnackbar } from 'api/snackbar';
import countries from 'data/countries';
import MainCard from 'components/MainCard';
import Loader from 'components/Loader';
// assets
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import useAuth from 'hooks/useAuth';
import { fetcherPost } from 'utils/axios';
import { useState,useEffect } from 'react';

// styles & constant
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

function useInputRef() {
  return useOutletContext();
}

// ==============================|| TAB - PERSONAL ||============================== //

export default function TabPersonal() {
  const {user,dispatch}=useAuth();
  const { id } = useParams();
  // console.log(user);
  const [student,setStudent]=useState(null);
  const inputRef = useInputRef();
 useEffect(()=>{
    fetchStudents()
  },[])
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/students/${id}`);
      setStudent(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  console.log(student);
  if (!student) {
      return <Loader />
    }
  
  return (
    <MainCard content={false} title="Personal Information" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
      <Formik
      initialValues={{
        name: student.name,
        email: student.email,
        alternate_email: student.alternate_email,
        phone: student.phone,
        alternate_phone: student.alternate_phone,
        address: student.address,
        state: student.state,
        city: student.city,
        parent_name: student.parent_name,
        job_name: student.job_name,
        salary: student.salary,
      }}
         validationSchema={Yup.object({
          name: Yup.string().required('Name is required'),
          email: Yup.string().email('Invalid email').required('Email is required'),
          alternate_email: Yup.string()
            .email('Invalid alternate email')
            .required('Alternate email is required')
            .notOneOf([Yup.ref('email')], 'Alternate email should be different'),
          phone: Yup.string().required('Phone number is required'),
          alternate_phone: Yup.string()
            .required('Alternate phone number is required')
            .notOneOf([Yup.ref('phone')], 'Alternate phone should be different'),
          address: Yup.string().required('Address is required'),
          state: Yup.string().required('State is required'),
          city: Yup.string().required('City is required'),
          parent_name: Yup.string().required("Parent's name is required"),
          job_name: Yup.string().required('Job name is required'),
          salary: Yup.number().positive('Salary must be positive').required('Salary is required'),
        })}
        onSubmit={async(values, { setErrors, setStatus, setSubmitting  }) => {
          try {
            console.log("clciked");
            
            const res=await axios.put(`http://localhost:8000/api/students/${student.student_id}`,values).then((res) => {
              console.log(res.data.details);
              setStudent(res.data.details)
              dispatch({
                type: UPDATE,
                payload:res.data.details
              });
            });
            
            openSnackbar({
              open: true,
              message: 'Personal profile updated successfully.',
              variant: 'alert',

              alert: {
                color: 'success'
              }
            });
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue, touched, values ,resetForm }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-name"> Name</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-name"
                      value={values.name}
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder=" Name"
                      autoFocus
                      inputRef={inputRef}
                    />
                  </Stack>
                  {touched.name && errors.name && (
                    <FormHelperText error id="personal-name-helper">
                      {errors.name}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-email">Email Address</InputLabel>
                    <TextField
                      type="email"
                      fullWidth
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="personal-email"
                      placeholder="Email Address"
                    />
                  </Stack>
                  {touched.email && errors.email && (
                    <FormHelperText error id="personal-email-helper">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-alternate_email">alternate_email</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-alternate_email"
                      value={values.alternate_email}
                      name="alternate_email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="alternate_email"
                    />
                  </Stack>
                  {touched.alternate_email && errors.alternate_email && (
                    <FormHelperText error id="personal-alternate_email-helper">
                      {errors.alternate_email}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-phone">Phone Number</InputLabel>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <TextField
                        fullWidth
                        id="personal-phone"
                        value={values.phone}
                        name="phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="phone Number"
                      />
                    </Stack>
                  </Stack>
                  {touched.phone && errors.phone && (
                    <FormHelperText error id="personal-phone-helper">
                      {errors.phone}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-alternate_phone">Alternate alternate_phone Number</InputLabel>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <TextField
                        fullWidth
                        id="personal-alternate_phone"
                        value={values.alternate_phone}
                        name="alternate_phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="alternate_phone Number"
                      />
                    </Stack>
                  </Stack>
                  {touched.alternate_phone && errors.alternate_phone && (
                    <FormHelperText error id="personal-alternate_phone-helper">
                      {errors.alternate_phone}
                    </FormHelperText>
                  )}
                </Grid>
                
              </Grid>
            </Box>
            <CardHeader title="Address" />
            <Divider />
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-addrees">Address </InputLabel>
                    <TextField
                      multiline
                      rows={3}
                      fullWidth
                      id="personal-addrees"
                      value={values.address}
                      name="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Address"
                    />
                  </Stack>
                  {touched.address && errors.address && (
                    <FormHelperText error id="personal-address-helper">
                      {errors.address}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-city">city</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-city"
                      value={values.city}
                      name="city"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="city"
                    />
                  </Stack>
                  {touched.city && errors.city && (
                    <FormHelperText error id="personal-city-helper">
                      {errors.city}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-state">State</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-state"
                      value={values.state}
                      name="state"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="State"
                    />
                  </Stack>
                  {touched.state && errors.state && (
                    <FormHelperText error id="personal-state-helper">
                      {errors.state}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </Box>
            <Divider />
           
            <CardHeader title="Note" />
            <Divider />
            <Box sx={{ p: 2.5 }}>
            <Grid container spacing={3}>

            <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-parent_name">parent name</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-parent_name"
                      value={values.parent_name}
                      name="parent_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="parent_name"
                    />
                  </Stack>
                  {touched.parent_name && errors.parent_name && (
                    <FormHelperText error id="personal-parent_name-helper">
                      {errors.parent_name}
                    </FormHelperText>
                  )}
                </Grid>
            <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-job_name">Job name</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-job_name"
                      value={values.job_name}
                      name="job_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="job_name"
                    />
                  </Stack>
                  {touched.job_name && errors.job_name && (
                    <FormHelperText error id="personal-job_name-helper">
                      {errors.job_name}
                    </FormHelperText>
                  )}
                </Grid>
            <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-salary">Salary </InputLabel>
                    <TextField
                      fullWidth
                      id="personal-salary"
                      value={values.salary}
                      name="salary"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="salary"
                    />
                  </Stack>
                  {touched.salary && errors.salary && (
                    <FormHelperText error id="personal-salary-helper">
                      {errors.salary}
                    </FormHelperText>
                  )}
                </Grid>
                </Grid>
                </Box>
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                <Button variant="outlined" color="secondary" onClick={() => resetForm()}>
                  Cancel
                </Button>
                <Button disabled={isSubmitting} type="submit" variant="contained">
                  Save
                </Button>
              </Stack>
          </form>
        )}
      </Formik>
    </MainCard>
  );
}
