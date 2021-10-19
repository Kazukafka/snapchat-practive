import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import Preview from './Preview';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Chats from './Chats';
import ChatView from './ChatView';
import { login, logout, selectUser } from './features/appSlice';
import { useSelector } from 'react-redux';
import Login from "./Login";
import { useDispatch } from "react-redux";
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          usernmae: user.displayName,
          profilePic: user.photoUrl,
          id: user.uid,
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [])

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              className="app__logo"
              src='https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg'
              alt=""
            />
            <div className='app__body'>
              <Switch>
                <Route exact path="/chats/view">
                  <ChatView />
                </Route>
                <Route exact path="/chats">
                  <Chats />
                </Route>
                <Route exact path="/preview">
                  <Preview />
                </Route>
                <Route exact path="/">
                  <WebcamCapture />
                </Route>
              </Switch>
            </div>
          </>
        )}
      </Router>

    </div>
  );
}

export default App;
