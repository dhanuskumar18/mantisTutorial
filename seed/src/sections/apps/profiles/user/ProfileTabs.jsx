import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// project import
import ProfileTab from './ProfileTab';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';

import { facebookColor, linkedInColor, twitterColor, ThemeMode } from 'config';
import { openSnackbar } from 'api/snackbar';
// assets
import FacebookFilled from '@ant-design/icons/FacebookFilled';
import LinkedinFilled from '@ant-design/icons/LinkedinFilled';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import TwitterSquareFilled from '@ant-design/icons/TwitterSquareFilled';
import CameraOutlined from '@ant-design/icons/CameraOutlined';
import axios from 'axios';
import defaultImages from 'assets/images/users/default.png';
import useAuth from 'hooks/useAuth';
import { UPDATE } from 'contexts/auth-reducer/actions';
import Loader from 'components/Loader';
// ==============================|| USER PROFILE - TAB CONTENT ||============================== //

export default function ProfileTabs({ focusInput }) {
  const {user,dispatch}=useAuth();
  
  const [student,setStudent]=useState(null);
  console.log(student);
  // console.log(`http://localhost:8000${user.image_url}`);
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState(null);
  useEffect(()=>{
    if (Array.isArray(user)) {
      setStudent(user[0])
      setAvatar(`http://localhost:8000${user[0].image_url}`)
      console.log("User is an array");
    } else if (typeof user === "object" && user !== null) {
      setStudent(user)
      setAvatar(`http://localhost:8000${user.image_url}`)

      console.log("User is an object");
    } else {
      console.log("User is neither an object nor an array");
    }
  },[])
  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    setSelectedImage(file)
    if (file) {
  
      const formd = new FormData();
      formd.append("image", file); // Append the file properly
      formd.append("name", student.name);
      formd.append("email", student.email);
      formd.append("alternate_email", student.alternate_email);
      formd.append("phone", student.phone);
      formd.append("alternate_phone", student.alternate_phone);
      formd.append("address", student.address);
      formd.append("state", student.state);
      formd.append("city", student.city);
      formd.append("salary", student.salary);
      formd.append("parent_name", student.parent_name);
      formd.append("job_name", student.job_name);
      
      try {
        const response = await axios.put(`http://localhost:8000/api/students/${student.student_id}`, formd,
          {
            headers: { "Content-Type": "multipart/form-data" } // ✅ Required for file upload
          }
        );
  console.log("res:",response.data.details);
  
        if (response.status === 201) {
          dispatch({
                         type: UPDATE,
                         payload:response.data.details
                       });
openSnackbar({
              open: true,
              message: ' profile pic updated successfully.',
              variant: 'alert',

              alert: {
                color: 'success'
              }
            });
        } else {
          console.error("Upload failed:", response.data.message);
        }
      } catch (error) {
        console.error("Error uploading image:", error.response?.data || error.message);
      }
    }
  };
  if (!student) {
    return <Loader />
  }
  return (

    <MainCard>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end">
            <IconButton
              variant="light"
              color="secondary"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreOutlined />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <MenuItem
                component={Link}
                to="/apps/profiles/user/personal"
                onClick={() => {
                  handleClose();
                  setTimeout(() => {
                    focusInput();
                  });
                }}
              >
                Edit
              </MenuItem>
              <MenuItem onClick={handleClose} disabled>
                Delete
              </MenuItem>
            </Menu>
          </Stack>
          <Stack spacing={2.5} alignItems="center">
            <FormLabel
              htmlFor="change-avtar"
              sx={{
                position: 'relative',
                borderRadius: '50%',
                overflow: 'hidden',
                '&:hover .MuiBox-root': { opacity: 1 },
                cursor: 'pointer'
              }}
            >
              <Avatar alt="Avatar 1" src={avatar} sx={{ width: 124, height: 124, border: '1px dashed' }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  background: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Stack spacing={0.5} alignItems="center">
                  <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                  <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                </Stack>
              </Box>
            </FormLabel>
            <TextField
              type="file"
              id="change-avtar"
              placeholder="Outlined"
              variant="outlined"
              name="image"
              sx={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">{student.name}</Typography>
              <Typography color="secondary">{student.role}</Typography>
            </Stack>
            
          </Stack>
        </Grid>
       

      </Grid>
    </MainCard>
  );
}

ProfileTabs.propTypes = { focusInput: PropTypes.func };
