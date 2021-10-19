import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './Chats.css';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubble from '@mui/icons-material/ChatBubble';
import { auth, db } from "./firebase";
import Chat from './Chat';
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from './features/appSlice';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useHistory } from "react-router-dom";
import { resetCameraImage } from "./features/cameraSlice";

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    //firebase grammaly has changed
    const f = async () => {
      const postsRef = db.collection('posts');
      const snapshot = await postsRef.get();
      //console.log(typeof snapshot)
      //console.log(Object.keys(postsRef));
      let items = [];
      snapshot.forEach(doc => {
        items.push({ id: doc.id, data: doc.data() })
      });
      setPosts(items);
      //const temp = snapshot.map(doc => {
      //return {
      //id: doc.id,
      //data: doc.data(),
      //}
      //console.log(doc.id, '=>', doc.data());
    }
    f();
  }, []);

  //console.log(posts);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    history.push("/");
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className="chats__avatar"
        />
        <div className="chats__search">
          <SearchIcon />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubble className="chats__chatIcon" />
      </div>

      <div className="chats__posts">
        {posts.map(post => (
          <Chat
            key={post.id}
            id={post.id}
            username={post.data.username}
            timestamp={post.data.timestamp}
            imageUrl={post.data.imageUrl}
            read={post.data.read}
            profilePic={post.data.profilePic}
          />
        )
        )}
      </div>
      <RadioButtonUncheckedIcon
        className='chats__takePicIcon'
        onClick={takeSnap}
        fontSize='large'
      />
    </div>
  );
}

export default Chats
