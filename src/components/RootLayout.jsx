import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Grid from '@mui/material/Grid';


const RootLayout = () => {
  return (

    <Grid container spacing={2}>
    <Grid item xs={2}>
    
      <Sidebar/>

    </Grid>
    <Grid item xs={10}>
    <Outlet/>
    </Grid>
  </Grid>

    
  )
}

export default RootLayout