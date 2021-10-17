import React from 'react';
import './Chat.css';
import { Avatar } from '@mui/material';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
//import { selectCameraImage } from './features/cameraSlice';
import { selectImage } from './features/appSlice';
import { useDispatch } from 'react-redux';
import { db } from './firebase';
import { useHistory } from 'react-router';
//import ReactTimeago from 'react-time-ago';
// import moment from 'moment';

function Chat({ id, username, timestamp, read, imageUrl, profilePic }) {
  //console.log(username)
  //"dispatch is undefined" solution↓
  const dispatch = useDispatch();
  const history = useHistory();
  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      db.collection("posts").doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );
      history.push('/chats/view');
    }
  }
  return (
    < div onClick={open} className="chat" >
      <Avatar className="chat__avatar" src={profilePic} />
      <div className="chat__info">
        <p>{timestamp}</p>
        <h4>{username}</h4>
        <p>
          {/* if文｛｝｛｝で書く */}
          {!read && "tap to view"}{" "}
          {/* <span>{moment(timestamp).format('YYYY/MM/DD HH:mm')}</span> */}
          {/* <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /> */}
        </p>
      </div>

      {!read && <StopRoundedIcon className="chat__readIcon" />}
    </div >
  )
}

export default Chat
