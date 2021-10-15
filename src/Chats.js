import { Avatar } from '@mui/material';
import React from 'react';
import './Chats.css';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubble from '@mui/icons-material/ChatBubble';

function Chats() {
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
        Hello
      </div>
    </div>
  )
}

export default Chats
