import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getDatabase, ref, set,onValue, push } from "firebase/database";
import { useSelector } from 'react-redux';

const Grouplist = () => {
  const db = getDatabase();

  let [groupmodal , setGroupmodal] =useState(false)
  let [groupname , setGroupName] =useState("")
  let [grouList , setGrouList] =useState([])
  let userinfo = useSelector(state=>state.activeUser.value)

  let handlecreatgroup =()=>{
    setGroupmodal(true)
  }
  let handleSubmite = ()=>{
    set(push(ref(db, 'group')), {
      adminid :userinfo.uid ,
      adminName : userinfo.displayName,
      groupName : groupname
    }).then(()=>{
      setGroupmodal(false)
    })

  }
  let handlegroupName =(e)=>{
    setGroupName(e.target.value)
  }

  useEffect(()=>{
    const groupRef = ref(db, 'group');
    onValue(groupRef, (snapshot) => {
       let arr = []
       snapshot.forEach(item=>{
          if(userinfo.uid != item.val().adminid){

             arr.push({...item.val(),groupid:item.key})
          }
       })
       setGrouList(arr)
       
    });
 },[])
  return (
    <div className='list'>
      <div className='flex'>
      <h1>Group List</h1>
      <Button variant="contained" onClick={handlecreatgroup}>creat group</Button> 
      </div>

      {groupmodal ?
      <>
      <h4 className='heading'>Group information</h4>
      <TextField onChange={handlegroupName} id="outlined-basic" label="Outlined" variant="outlined" />
      <Button variant="contained" onClick={handleSubmite}>Submit</Button>
      </>
    
    :

    grouList.map((item)=>(
      <div className='group'>
      <img src={profile} alt=" pic" />
      <h3>{item.groupName}</h3>
      <Button variant="contained">join</Button>
      </div>
    ))
   
    }
      </div>
  )
}

export default Grouplist