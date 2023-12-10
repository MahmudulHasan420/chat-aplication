import React, { useEffect, useState ,createRef } from 'react'
import profile from '../assets/profile.png'
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getStorage, ref, uploadString , getDownloadURL } from "firebase/storage";
import { getAuth,updateProfile  } from "firebase/auth";
import { userinfo } from '../pages/Slices/userSlice';

// const defaultSrc =
//   "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Sidebar = () => {

  let userinfor = useSelector(state=>state.activeUser.value)
  let  [pathnam , setPathnam] = useState()
  let dispatch = useDispatch()

 
  const storage = getStorage();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();
  const auth = getAuth();

  let handleLink =()=>{
  setPathnam(window.location.pathname)
 }



 const onChange = (e) => {
  e.preventDefault();
  let files;
  if (e.dataTransfer) {
    files = e.dataTransfer.files;
  } else if (e.target) {
    files = e.target.files;
  }
  const reader = new FileReader();
  reader.onload = () => {
    setImage(reader.result);
  };
  reader.readAsDataURL(files[0]);
};

const getCropData = () => {
  if (typeof cropperRef.current?.cropper !== "undefined") {
    const storageRef = ref(storage, userinfor.uid);
    uploadString(storageRef, cropperRef.current?.cropper.getCroppedCanvas().toDataURL(), 'data_url').then((snapshot) => {
      console.log('Uploaded a data_url string!');
      getDownloadURL(storageRef).then((downloadURL) => {
        console.log('File available at', downloadURL);
        updateProfile(auth.currentUser, {
            photoURL: downloadURL
        }).then(()=>{
           localStorage.setItem("user", JSON.stringify({...userinfor, photoURL:downloadURL}))
            dispatch(userinfo({...userinfor , photoURL:downloadURL}))
            setImage("")
        })
      });
    });
  }
};

  return (
    <div className='sidebar'>
      <p className='profileName'>{userinfor.displayName}</p>
        <img src={userinfor.photoURL} alt="profile"  onClick={handleOpen}/>
        <div className='sidebarIcons'>
        <Link to="/page/home" onClick={handleLink}  className={window.location.pathname == "/page/home" ? "sidebaractive" : ""}>
        <FaHome className='sidebarIcon'/>
        </Link>
        <Link to="/page/massage" onClick={handleLink} className={window.location.pathname == "/page/massage" ? "sidebaractive" : ""}>
        <AiOutlineMessage className='sidebarIcon'/>
        </Link>
        <Link to="/page/notification" onClick={handleLink}  className={window.location.pathname == "/page/notification" ? "sidebaractive" : ""}>
        <IoIosNotificationsOutline className='sidebarIcon'/>
        </Link>
        <Link to="/page/setting" onClick={handleLink} className={window.location.pathname == "/page/setting" ? "sidebaractive" : ""}>
        <CiSettings className='sidebarIcon'/>
        </Link>
        <Link>
        <CiSettings className='sidebarIcon'/>
        </Link>
        </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Uploader Your profile
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {image ?
           <>
            
            <div className='previewBox'>
            <div
               className="img-preview"
             />
            </div>
           </>
          :
          <img src={userinfor.photoURL} alt="profile" className='previewBox'/>
          }
         
         <input type="file" onChange={onChange}  className='filechose'/>
         {image && 
          <>
          <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={100}
          minCropBoxWidth={100}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
        />
        <Button variant="contained" onClick={getCropData}>Upload</Button>
          </>
         }
          </Typography>
         
        </Box>
        
      </Modal>
    </div>
    
  )
}

export default Sidebar