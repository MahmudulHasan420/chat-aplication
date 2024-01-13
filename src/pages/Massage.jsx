import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Mygroup from '../components/MyGroup';
import FriendList from '../components/FriendList'
import profile from '../assets/profile.png'
import { HiDotsVertical } from "react-icons/hi";
import photo from '../assets/registration.png'
import Button from '@mui/material/Button'; 
import { useSelector } from 'react-redux';
import { getDatabase, push, ref, set ,onValue } from "firebase/database";
import { FaCamera } from "react-icons/fa";

const Massage = () => {
  const db = getDatabase();

  let msgSender = useSelector(state=>state.msgSender.senderName)
  let userinfo = useSelector(state=>state.activeUser.value)
  let [sendMsg , setSendmsg] = useState("")
  let [msgList , setMsgList] = useState([])
  

  let handlemsg= (e)=>{
    setSendmsg(e.target.value);
    console.log(msgList);

  }

  let handlemsgsend = ()=>{
    if(sendMsg.length >0){
      set(push(ref(db, 'massage')), {
        senderId: userinfo.uid,
        senderName : userinfo.displayName,
        receiverId : msgSender.id ,
        receiverName : msgSender.name,
        msg : sendMsg,
        date : `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}`    
      }).then(()=>{
        setSendmsg("")
      })
      
    }
  

  }
  useEffect(()=>{
    const msgRef = ref(db, 'massage' );
    onValue(msgRef, (snapshot) => {
      let  array =[]
      snapshot.forEach((item)=>{
        if(userinfo.uid ==item.val().senderId || userinfo.uid == item.val().receiverId){
          array.push(item.val())
        }
        
      })
      setMsgList(array)
})
  },[])
  return (
    <Grid container spacing={2}>
    <Grid item xs={4}>
    <Grid item xs={6}>
      <div className=' '>
      <Mygroup/>
      </div>
    </Grid>
    <FriendList/>
    </Grid>
    <Grid item xs={8}>
      <div className='msgbox'>
        <div className='msghead'>
        <div className='msgname'> 
        <img src={profile} alt="profile" className='msgheadpic'/>
        <h3>{msgSender.name}</h3>
        </div>
        <HiDotsVertical />
        </div>
        <div className='msgheadafter'></div>

      {msgList.map((item)=>(
        item.senderId == userinfo.uid && item.receiverId ==msgSender.id ?

        <div className='msgrecive sendmsg'>
        <h4 >{item.msg}</h4>
        </div>
        :
        item.receiverId == userinfo.uid && item.senderId ==msgSender.id ?
        <div className='msgrecive'>
         <h4 className=''>{item.msg}</h4>
         </div>  
         :
         <h6></h6>

      ))

      }
      <div className='sengMsgBox'>
      <div className='msgheadafter'></div>
       <div className='sendinput'>
        <div><input type="file" ></input><FaCamera></FaCamera></div>
       
       <input onChange={handlemsg} className='sendMsgInput' type="text" value={sendMsg}/>
       

        <Button onClick={handlemsgsend} className='sendMsgBtn' variant="contained" >send</Button>
       </div>
      </div>
      
      </div>
    </Grid>
    
  </Grid>
  )
}

export default Massage