import React from 'react';
import "./Login.css";
//import Button from '@mui/icons-material/Button';
import { Button } from '@mui/material';
import { useDispatch } from "react-redux";
import { auth, provider } from "./firebase";
import { login } from "./features/appSlice";

function Login() {

  const dispatch = useDispatch();

  const signIn = () => {
    auth.signInWithPopup(provider)
      .then(result => {
        dispatch(login({
          usernmae: result.user.displayName,
          // ↓photoUrlではなく「photoURL」注意
          profilePic: result.user.photoURL,
          id: result.user.uid,
        }));
      }).catch((error) => alert(error.message));
  };
  return (
    <div className="Login">
      <div className="login__container">
        <img src='https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg' alt="" />
        <Button className="button" variant="outlined" onClick={signIn} >Sign In</Button>
      </div>
    </div>
  )
}

export default Login;
