import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userinfo } from './Slices/userSlice';
import Grid from '@mui/material/Grid';
import profile from '../assets/profile.png'

const Home = () => {
  const auth = getAuth();

  let userinformation = useSelector(state=>state.activeUser.value)
  console.log(userinformation);
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

    <Grid container spacing={2}>
    <Grid item xs={4}>
    
      <div className='list'>
      <h1>Groups List</h1> 
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>


      </div>
      
    </Grid>
    <Grid item xs={4}>
      <div className='list'>
      <h1>Friends</h1> 
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Raghav</h3>
        
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        

      </div>
    </Grid>
    <Grid item xs={4}>
    <div className='list'>
      <h1>Groups List</h1> 
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        

      </div>
    </Grid>
    <Grid item xs={4}>
    <div className='list'>
      <h1>Groups List</h1> 
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        

      </div>
    </Grid>
    <Grid item xs={4}>
    <div className='list'>
      <h1>Groups List</h1> 
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        

      </div>
    </Grid>
    <Grid item xs={4}>
    <div className='list'>
      <h1>Groups List</h1> 
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>Friends Reunion</h3>
        <Button variant="contained">join</Button>
        <h3></h3>
        </div>
        

      </div>
    </Grid>
  </Grid>
    // <Button onClick={handleLogout} variant="contained">Log out</Button>
  )
}

export default Home