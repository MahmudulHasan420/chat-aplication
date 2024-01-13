import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getDatabase, ref, onValue ,set, push } from "firebase/database";
import { useSelector } from 'react-redux';


const UserList = () => {
  const db = getDatabase();

  let [userList , setUserlist]  = useState([])
  let [searchList , setSearchlist]  = useState([])
  let [searchListLenth , setSearchlistLenth]  = useState("")
  let [frid , setFrid]  = useState("")
  let [fid , setFid]  = useState("")
  let [blockid , setBlockid]  = useState("")

  let userinfo = useSelector(state=>state.activeUser.value)

    let handdleSerach =(e)=>{  
    let searchvalue = e.target.value

      

      setSearchlistLenth(searchvalue.length)


      let user = userList.filter(item=>item.username.toLowerCase().includes(e.target.value.toLowerCase()))
      
        setSearchlist(user)

    }

    useEffect(()=>{
      const starCountRef = ref(db, 'user');
      onValue(starCountRef, (snapshot) => {
        let userArray =[]
  
        snapshot.forEach(item=>{
          if(item.key != userinfo.uid ){
            userArray.push({...item.val() , userid: item.key})
          }

        })
        setUserlist(userArray) 

        // console.log(userArray);
        
      });
    },[])

    useEffect(()=>{
      const friendRequestRef = ref(db, 'friendrequest');
      onValue(friendRequestRef, (snapshot) => {
         let arr = []
         snapshot.forEach(item=>{
            
               arr.push(item.val().whoReceiveId+item.val().whoSendId)
         })
         setFrid(arr)
         
      });
   },[])
   useEffect(()=>{
    const friendRequestRef = ref(db, 'friend');
    onValue(friendRequestRef, (snapshot) => {
       let arr = []
       snapshot.forEach(item=>{
          
             arr.push(item.val().whoReceiveId+item.val().whoSendId)
       })
       setFid(arr)
       
    });
 },[])
 useEffect(()=>{
  const friendRequestRef = ref(db, 'block');
  onValue(friendRequestRef, (snapshot) => {
     let arr = []
     snapshot.forEach(item=>{
        
           arr.push(item.val().blockbyid+item.val().blockid)
     })
     setBlockid(arr)
     console.log(arr)
     
  });
},[])

    let handlefriendrequest =(items)=>{
      console.log(items)
      set(push(ref(db, 'friendrequest')), {
       whoSendId : userinfo.uid,
        whoSendName: userinfo.displayName,
        whoReceiveName: items.username,
        whoReceiveId: items.userid,
        
      });
      
      
    }
    

  return (
    <div className='list'>
        <h1>User List</h1>
        
          <label>search</label>
         <input className='search' type="text"  onChange={handdleSerach} /> 


        {searchList.length >0 ?

          searchList.map((items)=>(
            <div className='group'>
          <img src={items.profile_picture} alt=" pic" />
          <h3>{items.username}</h3>
          {frid.includes(userinfo.uid+items.userid) || frid.includes(items.userid+userinfo.uid) ?
          <Button variant="contained" disabled >pending</Button>
          :
          fid.includes(userinfo.uid+items.userid) || fid.includes(items.userid+userinfo.uid)?
          <Button variant="contained" color='success'>friend</Button>
          :
          blockid.includes(userinfo.uid+items.userid) || blockid.includes(items.userid+userinfo.uid)?
          <Button variant="contained" disabled >not allowed</Button>
          :
          <Button variant="contained" onClick={()=>handlefriendrequest(items)}>Add friend</Button>
          }

          </div>
          ))
        :

        searchListLenth > 0 ? 
        <>
        <p>no match found</p>
        </>
        :
        userList.map((items)=>(
          <div className='group'>
          <img src={items.profile_picture} alt=" pic" />
          <h3>{items.username}</h3>
          {frid.includes(userinfo.uid+items.userid) || frid.includes(items.userid+userinfo.uid) ?
          <Button variant="contained" disabled >pending</Button>
          :
          fid.includes(userinfo.uid+items.userid) || fid.includes(items.userid+userinfo.uid)?
          <Button variant="contained" color='success'>friend</Button>
          :
          blockid.includes(userinfo.uid+items.userid) || blockid.includes(items.userid+userinfo.uid)?
          <Button variant="contained" disabled >not allowed</Button>
          :
          <Button variant="contained" onClick={()=>handlefriendrequest(items)}>Add friend</Button>
          }
          </div>
        )) 
        }
        

      </div>
  )
}

export default UserList