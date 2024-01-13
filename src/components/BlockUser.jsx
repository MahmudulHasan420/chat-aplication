import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue , set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

export const BlockUser = () => {
  const db = getDatabase();
  let userinfo = useSelector(state=>state.activeUser.value)
  let [blockList , setBlockList] = useState([])

  useEffect(()=>{
    const starCountRef = ref(db, 'block' );
onValue(starCountRef, (snapshot) => {
 let  array =[]
  snapshot.forEach((item)=>{
    if(userinfo.uid == item.val().blockbyid){
      array.push({...item.val() , blockid :item.key})
    }
   
     
    
  })
  console.log(array);
  setBlockList(array)
  
});

  },[])
 let  handleunblock =(item)=>{
  remove(ref(db,'block/' +item.blockid))
 }

  return (
    <div className='list'>
      <h1>Block User</h1> 

      {blockList.map((item)=>(
         <div className='group'>
         <img src={profile} alt=" pic" />
         <h3>{item.blockName}</h3>
         <Button onClick={()=>handleunblock(item)} variant="contained">Unblock</Button>
         </div>

      ))}
       

      </div>
  )
}
