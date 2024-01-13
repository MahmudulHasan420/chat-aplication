import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue , set, push, remove } from "firebase/database";
import { useSelector , useDispatch } from 'react-redux';
import { msgUserInfo } from '../pages/Slices/msgSlice';

const FriendList = () => {
  const db = getDatabase();
  let [friendList , setFriendList] = useState([])
  let userinfo = useSelector(state=>state.activeUser.value)
  let [searchList , setSearchlist]  = useState([])
  let [searchListLenth , setSearchlistLenth]  = useState("")
  let dispatch = useDispatch()
  
  

  useEffect(()=>{
    const starCountRef = ref(db, 'friend' );
onValue(starCountRef, (snapshot) => {
 let  array =[]
  snapshot.forEach((item)=>{
    if(item.val().whoSendId == userinfo.uid || item.val().whoReceiveId == userinfo.uid){
      array.push({...item.val() , fid :item.key})
    }
    
  })
  setFriendList(array)
  
});

  },[])

  

  let handleblock =(items)=>{

    if(userinfo.uid==items.whoReceiveId){
      set(push(ref(db, 'block' )), {
        fid : items.fid,
        blockbyid : items.whoReceiveId,
        blockbyName : items.whoReceiveName,
        blockid : items.whoSendId,
        blockName : items.whoSendName
      }).then(()=>{
        remove(ref(db, 'friend/' +items.fid))
      })
  
    }
    else{ 
      set(push(ref(db, 'block' )), {
      fid : items.fid ,
      blockbyid : items.whoSendId ,
      blockbyName : items.whoSendName ,
      blockid : items.whoReceiveId,
      blockName : items.whoReceiveName
    }).then(()=>{
      remove(ref(db, 'friend/' +items.fid))
    })
      
    }
   
  }
  let handdleSerach =(e)=>{  
    let searchvalue = e.target.value

      

      setSearchlistLenth(searchvalue.length)


      let user = friendList.filter(item=>item.whoReceiveName.toLowerCase().includes(e.target.value.toLowerCase()) || item.whoSendName.toLowerCase().includes(e.target.value.toLowerCase()))
      
        setSearchlist(user)

    }
    let handleInfopass = (items)=>{
      if(userinfo.uid == items.whoReceiveId){
        dispatch(msgUserInfo({name : items.whoSendName, id:items.whoSendId}))
      }else{
        dispatch(msgUserInfo({name : items.whoReceiveName, id:items.whoReceiveId}))
      }
     
    } 
  
  return (

    
    <div className='list'>
      <h1>Friend List</h1> 
      <label>search</label>
         <input className='search' type="text"  onChange={handdleSerach} />
      {searchList.length >0?
      
      searchList.map(items=>(
        <div  onClick={()=>handleInfopass(items)} className='group'>
          {userinfo.uid == items.whoReceiveId
          ?
          <>
          <img src={profile} alt=" pic" />
        <h3>{items.whoSendName }</h3>
        <Button onClick={()=>handleblock(items)} variant="contained">block</Button>
        </>
          :
          <>
          <img src={profile} alt=" pic" />
        <h3>{items.whoReceiveName}</h3>
        <Button onClick={()=>handleblock(items)} variant="contained">block</Button>
        </>
        }
        
        </div>   
        ))
      :

      searchListLenth > 0 ? 

      <>
      <p>no match found</p>
      </>

      :
      
      friendList.map(items=>(
        <div onClick={()=>handleInfopass(items)} className='group'>
          {userinfo.uid == items.whoReceiveId
          ?
          <>
          <img src={profile} alt=" pic" />
        <h3>{items.whoSendName }</h3>
        <Button onClick={()=>handleblock(items)} variant="contained">block</Button>
        </>
          :
          <>
          <img src={profile} alt=" pic" />
        <h3>{items.whoReceiveName}</h3>
        <Button onClick={()=>handleblock(items)} variant="contained">block</Button>
        </>
        }
        
        </div>   
        ))
      }
        
      
      </div>
  )
}

export default FriendList