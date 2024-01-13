import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, set,onValue, push } from "firebase/database";
import { useSelector } from 'react-redux';

const MyGroup = () => {
  const db = getDatabase();
  let userinfo = useSelector(state=>state.activeUser.value)
  let [grouList , setGrouList] =useState([])


  useEffect(()=>{
    const groupRef = ref(db, 'group');
    onValue(groupRef, (snapshot) => {
       let arr = []
       snapshot.forEach(item=>{
          if(userinfo.uid == item.val().adminid){

             arr.push({...item.val(),groupid:item.key})
          }
       })
       setGrouList(arr)
       
    });
 },[])
  return (
    <div className='list'>
      <h1>My Group</h1> 

      {grouList.map((item)=>(
        <div className='group'>
        <img src={profile} alt=" pic" />
        <h3>{item.groupName}</h3> 
        
        </div>
      ))
      }
      </div>
  )
}

export default MyGroup