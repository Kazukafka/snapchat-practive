import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './Chats.css';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubble from '@mui/icons-material/ChatBubble';
import { db } from "./firebase";
import Chat from './Chat';

function Chats() {
  const [posts, setPosts] = useState([]);

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
  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar className="chats__avatar" />
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
    </div>
  );
}

export default Chats
