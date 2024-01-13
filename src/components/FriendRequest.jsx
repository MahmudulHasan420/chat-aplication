import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, remove, push,set } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendRequest = () => {
  const db = getDatabase();

  let [friendrequestList, setFriendrequestList] = useState([])
  let userinfo = useSelector(state=>state.activeUser.value)

  useEffect(()=>{
    const friendRequestRef = ref(db, 'friendrequest');
    onValue(friendRequestRef, (snapshot) => {
       let arr = []
       snapshot.forEach(item=>{
          if(userinfo.uid == item.val().whoReceiveId){

             arr.push({...item.val(),frid:item.key})
          }
       })
       setFriendrequestList(arr)
       
    });
 },[])

 let handlecancel = (items)=>{
   remove(ref(db, 'friendrequest/' +items.frid))
 }

 let handleAccept=(items)=>{
   set(push(ref(db, 'friend')), {
      ...items
    }).then(()=>{
      remove(ref(db, 'friendrequest/' +items.frid))
    })
 }
  return (


    
    <div className='list'>
      <h1>Friend Reuest</h1> 

      {friendrequestList.map(items=>(
      <div className='group'>
        <img src={profile}/>
        <h3>{items.whoSendName}</h3>
        <Button variant="contained" onClick={()=>handleAccept(items)}>Accept</Button>
        <Button variant="contained" color='error' onClick={()=>handlecancel(items)}>Cancel</Button>
     </div>
     ))}   
    
      </div>
  )
}

export default FriendRequest