import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';


const UserList = () => {
  const db = getDatabase();

  let [userList , setUserlist]  = useState([])
  let [searchList , setSearchlist]  = useState([])
  let [searchListLenth , setSearchlistLenth]  = useState("")
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
            userArray.push(item.val())
          }

        })
        setUserlist(userArray) 
        
      });
    },[])
  return (
    <div className='list'>

        
          <label > search</label>
         <input type="text"  onChange={handdleSerach} /> 


        {searchList.length >0 ?

          searchList.map((items)=>(
            <div className='group'>
            <img src={items.profile_picture} alt=" pic" />
            <h3>{items.username}</h3>
            <Button variant="contained">join</Button>
            <h3></h3>
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
          <img src={profile} alt=" pic" />
          <h3>{items.username}</h3>
          <Button variant="contained">join</Button>
          <h3></h3>
          </div>
        )) 
        }
        

      </div>
  )
}

export default UserList