import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import registration from '../assets/registration.png'
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { getAuth, createUserWithEmailAndPassword ,signInWithPopup, GoogleAuthProvider , sendEmailVerification ,updateProfile  } from "firebase/auth";
import { RotatingLines } from 'react-loader-spinner'
import { Link, useNavigate  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDatabase, ref, set } from "firebase/database";

const Frominput = styled(TextField)({
    width: '75%',
    marginTop: '34px',
    borderRadius : '9px',

});

const Mybutton = styled(Button)({
fontSize: '20px',
padding: '20px 132px',
backgroundColor: '#5F35F5',
marginTop:'52px',
borderRadius : '86px',
width : '75%',

fontFamily: [
  'Nunito Sans',

].join(','),

});



const Registration = () => {
  const db = getDatabase();

    let navigate = useNavigate()
  const auth = getAuth();

  let [reg, setReg] =useState({
    email:"",
    fullName : "",
    password : ""

  })
  let [error, setError] =useState({
    emailerror:"",
    fullNameerror : "",
    passworderror : ""

  })

  let [loader , setLoader] = useState(true)
  let userinfo = useSelector(state => state.activeUser.value)
  console.log(userinfo)

  let handlechange =(e)=>{
    

    setReg({...reg , [e.target.name] : e.target.value})

  }
  let handleclick = ()=>{
    setLoader(false)
    createUserWithEmailAndPassword(auth, reg.email, reg.password)
    .then((userCredential) => {

      set(ref(db, 'user/' +  userCredential.user.uid ),   {
        username: reg.fullName,
        email: userCredential.user.email,
        profile_picture : "https://firebasestorage.googleapis.com/v0/b/chat-application-aff71.appspot.com/o/J23-%20107047%20%20Apr---%2031%20---23%20jpg-%20(1)%20(1).jpg?alt=media&token=e468d9e3-2c5e-4de1-bc24-2cfb066b0880"
      });

      updateProfile(auth.currentUser, {
        displayName: reg.fullName , photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(() => {
          //     sendEmailVerification(auth.currentUser)
  // .then(() => {


      setLoader(true)
      navigate("/login")
      
  // });
      })
     

     
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setLoader(true)

      console.log(errorCode)
    });

    // if(reg.email == ""){

    //   setError({...error , emailerror : "please give an email"})

    // }

    // else{
    //   let emailpattern =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    //   if(!(emailpattern.test(reg.email))){
    //     setError({...error , emailerror : "please give an valid email"})
    //   }
    //   else{
    //     setError({...error , emailerror : ""})
    //   }
    // }

    // if(reg.fullName==""){
    //   setError({...error , fullNameerror : "Please give you full name"})
    // }

    // if(reg.password==""){
    //   setError({...error , passworderror : "Please set a password"})
    // }
    // else{
    //   let passwordvalidation =/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    //   if(!(passwordvalidation.test(reg.password))){
    //     setError({...error , passworderror : "Please use a lower case[a-z] a uppercase[A-Z] a number [1-9] a special charecter"})

    //   }
    //   else{
    //     setError({...error , passworderror : ""})
    //   }
    // }
    if(reg.email==""){
      setError({...error , emailerror : "please give an email"})
    }
    else{
      let emailverify =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if(!emailverify.test(reg.email)){
        setError({...error , emailerror : "Plase give a valid email"})
      }
     
    }

    if(reg.fullName == ""){
      setError({...error , fullNameerror : "Please give you full name"})
    }
    if(reg.password==""){
      setError({...error , passworderror : "Please set a password"})
    }
    else{
      let verifypassword =/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if(!verifypassword.test(reg.password)){
        setError({...error , passworderror : "Please use a lower case[a-z] a uppercase[A-Z] a number [1-9] a special charecter"})
      }
    }
  }

  let handlegoogle =()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(() => {
      navigate("/home")
     })

     useEffect(()=>{
      if(userinfo != null){
        navigate("/home")
      }
     },[])
  }
  return (
    <>
    {loader ?
    <Grid container >
    <Grid item xs={6}>
      <div className='regFrom'>
      <h1 className='regHeading'>Get started with easily register</h1>
      <p className='regPera'>
      Free register and you can enjoy it
      </p>

      <div>
     <div>
     <Frominput onChange={handlechange} name="email" id="outlined-basic" label="Email Address" variant="outlined" />
    {error.emailerror &&
     <Alert severity="error">
     {error.emailerror}
   </Alert>
    }
     </div>
     <div>
     <Frominput onChange={handlechange} name="fullName" id="outlined-basic" label="Full Name" variant="outlined" />
     {error.fullNameerror &&
     <Alert severity="error">
     {error.fullNameerror}
   </Alert>
    }
     </div>
     
      <Frominput onChange={handlechange} name="password" id="outlined-basic" label="Password" variant="outlined"  type="password"/>
      {error.passworderror &&
     <Alert severity="error">
     {error.passworderror}
   </Alert>
    }
      </div>
      <Mybutton onClick={handleclick} variant="contained">Sign up</Mybutton>
      <Mybutton onClick={handlegoogle} variant="contained"> Google Sign up</Mybutton>

      <p className='loginToSingIn'>Already have an account ? <Link to="/login"> <span style={{color:"orange", cursor:"pointer"}}>Sign in</span></Link></p>

      </div>
    </Grid>
    <Grid item xs={6}>
      <img className='regimg' src={registration} alt="cover pic" />
      
    </Grid>
  </Grid>

  :

  <RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/>

    }
    </>
  )
}

export default Registration