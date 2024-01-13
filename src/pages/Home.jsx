import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userinfo } from './Slices/userSlice';
import Grid from '@mui/material/Grid';
import Grouplist from '../components/Grouplist';
import FriendList from '../components/FriendList';
import UserList from '../components/UserList';
import FriendRequest from '../components/FriendRequest';
import MyGroup from '../components/MyGroup';
import { BlockUser } from '../components/BlockUser';


const Home = () => {
  const auth = getAuth();

  let userinformation = useSelector(state=>state.activeUser.value)
   let dispatch =useDispatch()

  let navigate = useNavigate()

  let handleLogout = ()=>{
    signOut(auth).then(() => {
      navigate("/login")
      dispatch(userinfo(null))
      localStorage.setItem("user" , null)
    })
  }

  // useEffect (()=>{
  //   if (userinformation == null){
  //     navigate("/login")
  //   }
  // } ,[])
  return (

    <>
    <Grid container spacing={2}>
    <Grid item xs={4}>
    
      <Grouplist/>
      
    </Grid>
    <Grid item xs={4}>
      <FriendList/>
    </Grid>
    <Grid item xs={4}>
    <UserList/>
    </Grid>
    <Grid item xs={4}>
    <FriendRequest/>
    </Grid>
    <Grid item xs={4}>
    <MyGroup/>
    </Grid>
    <Grid item xs={4}>
    <BlockUser/>
    </Grid>
  </Grid>
    <Button onClick={handleLogout} variant="contained">Log out</Button>
    </>
  )
}

export default Home