import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Autocomplete,TextField } from '@mui/material';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { openSnackbar } from 'api/snackbar';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { fetcherPost } from 'utils/axios';

// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister() {
  const { register } = useAuth();
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    fetcherPost(['https://countriesnow.space/api/v0.1/countries/states', { country: 'India' }]).then((res) => {
      setStates(res.data.states.map((state) => state.name));
    });
  }, []);
  const fetchCities = async (state) => {
    console.log(state);
    
    const res = await fetcherPost(['https://countriesnow.space/api/v0.1/countries/state/cities', { country: 'India', state }]);
    console.log(res);
    
    setCities(res.data);
  };
  console.log(states);
  console.log(cities);

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          alternate_email: '',
          phone: '',
          alternate_phone: '',
          address: '',
          state: '',
          city: '',
          parent_name: '',
          job_name: '',
          salary: '',
          image: null
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
          image: Yup.mixed().required('Image is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await register(values);
            console.log(scriptedRef.current);
            
            if (scriptedRef.current) {
              console.log('hel');

              setStatus({ success: true });
              setSubmitting(false);
              openSnackbar({
                open: true,
                message: 'Your registration has been successfully completed.',
                variant: 'alert',

                alert: {
                  color: 'success'
                }
              });

              setTimeout(() => {
                
                navigate('/login', { replace: true });
              }, 1500);
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ setFieldValue, errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name-signup"> Name*</InputLabel>
                  <OutlinedInput
                    id="name-login"
                    type="name"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  />
                </Stack>
                {touched.name && errors.name && (
                  <FormHelperText error id="helper-text-name-signup">
                    {errors.name}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-signup"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Doe"
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="alternate_email-signup">Alt Email*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.alternate_email && errors.alternate_email)}
                    id="alternate_email-signup"
                    type="alternate_email"
                    value={values.alternate_email}
                    name="alternate_email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Doe"
                  />
                </Stack>
                {touched.alternate_email && errors.alternate_email && (
                  <FormHelperText error id="helper-text-alternate_email-signup">
                    {errors.alternate_email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phone-signup">phone*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.phone && errors.phone)}
                    id="phone-signup"
                    value={values.phone}
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Demo Inc."
                  />
                </Stack>
                {touched.phone && errors.phone && (
                  <FormHelperText error id="helper-text-phone-signup">
                    {errors.phone}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="alternate_phone-signup">Alt phone*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.alternate_phone && errors.alternate_phone)}
                    id="alternate_phone-signup"
                    value={values.alternate_phone}
                    name="alternate_phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Demo Inc."
                  />
                </Stack>
                {touched.alternate_phone && errors.alternate_phone && (
                  <FormHelperText error id="helper-text-alternate_phone-signup">
                    {errors.alternate_phone}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  {/* <InputLabel htmlFor="address-signup"> Address*</InputLabel> */}
                  <TextField
                    fullWidth
                    label="Address*"
                    error={Boolean(touched.address && errors.address)}
                    id="address-login"
                    type="address"
                    value={values.address}
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                  />
                </Stack>
                {touched.address && errors.address && (
                  <FormHelperText error id="helper-text-address-signup">
                    {errors.address}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="state-signup">State*</InputLabel>
                  <Autocomplete
                    options={states}
                    value={values.state}
                    onChange={(event, newValue) => {
                      handleChange({ target: { name: 'state', value: newValue } }); 
                      fetchCities(newValue); 
                    }}
                    onBlur={handleBlur}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={Boolean(touched.state && errors.state)}
                        id="state-login"
                        name="state"
                        placeholder="Select a state"
                      />
                    )}
                  />
                </Stack>
                {touched.state && errors.state && (
                  <FormHelperText error id="helper-text-state-signup">
                    {errors.state}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="state-signup">city*</InputLabel>
                  <Autocomplete
                    options={cities}
                    value={values.city}
                    onChange={(event, newValue) => setFieldValue("city", newValue)}
                    onBlur={handleBlur}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={Boolean(touched.city && errors.city)}
                        id="city-login"
                        name="city"
                        placeholder="Select a city"
                      />
                    )}
                  />
                </Stack>
                {touched.state && errors.state && (
                  <FormHelperText error id="helper-text-state-signup">
                    {errors.state}
                  </FormHelperText>
                )}
              </Grid>

             
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="parent_name-signup"> Parent name*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.parent_name && errors.parent_name)}
                    id="parent_name-login"
                    type="parent_name"
                    value={values.parent_name}
                    name="parent_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder=""
                  />
                </Stack>
                {touched.parent_name && errors.parent_name && (
                  <FormHelperText error id="helper-text-parent_name-signup">
                    {errors.parent_name}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="job_name-signup"> job_name*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.job_name && errors.job_name)}
                    id="job_name-login"
                    type="job_name"
                    value={values.job_name}
                    name="job_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder=""
                  />
                </Stack>
                {touched.job_name && errors.job_name && (
                  <FormHelperText error id="helper-text-job_name-signup">
                    {errors.job_name}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="salary-signup"> salary*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.salary && errors.salary)}
                    id="salary-login"
                    type="salary"
                    value={values.salary}
                    name="salary"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder=""
                  />
                </Stack>
                {touched.salary && errors.salary && (
                  <FormHelperText error id="helper-text-salary-signup">
                    {errors.salary}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="image-signup"> Image*</InputLabel>
                  <input
                    type="file"
                    id="image-signup"
                    name="image"
                    accept="image/*"
                    onBlur={handleBlur}
                    onChange={(event) => {
                      setFieldValue('image', event.currentTarget.files[0]); // Handle file manually
                    }}
                  />
                  {touched.image && errors.image && (
                    <FormHelperText error id="helper-text-image-signup">
                      {errors.image}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>authlogi
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Create Account
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
