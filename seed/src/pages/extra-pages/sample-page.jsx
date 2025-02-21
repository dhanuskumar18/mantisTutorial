// material-ui
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,Dialog, DialogActions, DialogContent, DialogTitle,
  Step
} from "@mui/material";
import WelcomeBanner from "sections/extra-pages/sample-page/WelcomeBanner";
import { Link } from "react-router-dom";
// project import
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
// ==============================|| SAMPLE PAGE ||============================== //

export default  function  SamplePage() {
  const {user}=  useAuth()
  console.log(user);
  
  const [student,setStudent]=useState(null);
  useEffect(()=>{
    if (Array.isArray(user)) {
      setStudent(user[0].name)
      console.log("User is an array");
    } else if (typeof user === "object" && user !== null) {
      setStudent(user.name)
      console.log("User is an object");
    } else {
      console.log("User is neither an object nor an array");
    }
  },[])
console.log(student);

  
  return (
    <>
    <WelcomeBanner props={student}/>
   
    </>
  );
}
