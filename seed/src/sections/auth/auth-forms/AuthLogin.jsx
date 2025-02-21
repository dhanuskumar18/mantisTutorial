import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { preload } from 'swr';
// project import
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { fetcher } from 'utils/axios';
// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
// ============================|| JWT - LOGIN ||============================ //
export default function AuthLogin({ isDemo = false }) {
  const [checked, setChecked] = React.useState(false);
  const [showOtpField, setShowOtpField] = React.useState(false); // State to show OTP field after email is entered
  const [email, setEmail] = React.useState('');
  const { login ,sendOtp} = useAuth();
  const scriptedRef = useScriptRef();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Formik
        initialValues={{
          email: email,
          otp: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          otp: showOtpField ? Yup.string().length(6, 'OTP must be 6 digits').required('OTP is required') : Yup.string()})}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (!showOtpField) {
              await sendOtp(values.email);
              setShowOtpField(true);
              setEmail(values.email); 
              setStatus({ success: true });
              setSubmitting(false);
            }
            else{
              await login(values.email, values.otp,checked);
              if (scriptedRef.current) {
                setStatus({ success: true });
                setSubmitting(false);
                preload('api/menu/dashboard', fetcher); // load menu on login success
              }
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
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              {showOtpField && (
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="otp-login">OTP</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.otp && errors.otp)}
                      id="otp-login"
                      type="text"
                      value={values.otp}
                      name="otp"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter OTP"
                      startAdornment={
                        <InputAdornment position="start">
                          <Typography variant="body2">OTP</Typography>
                        </InputAdornment>
                      }
                    />
                  </Stack>
                  {touched.otp && errors.otp && (
                    <FormHelperText error id="standard-weight-helper-text-otp-login">
                      {errors.otp}
                    </FormHelperText>
                  )}
                </Grid>
              )}
              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                  <Link variant="h6" component={RouterLink} to={isDemo ? '/auth/forgot-password' : '/forgot-password'} color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Login
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
AuthLogin.propTypes = { isDemo: PropTypes.bool };






