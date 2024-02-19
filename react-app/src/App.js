import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from '../src/components/HomePage'
import PostDetailPage from "./components/PostDetailPage";
import CreatePostPage from "./components/CreatePostPage";
import ProfilePage from "./components/ProfilePage";
import FollowPage from "./components/FollowPage";
import "./index.css";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="mainContainer">
      <Navigation isLoaded={isLoaded} />
      <div className="mainBody">
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/post/:postId">
            <PostDetailPage />
          </Route>
          <Route path="/createPost">
            <CreatePostPage />
          </Route>
          <Route path="/follows">
            <FollowPage />
          </Route>
          <Route path="/ProfileEdit">
            <ProfilePage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
      </div>

      <div className="footer">
      <div></div>
      <hr></hr>
        <div>
          Ian H. Kim
        </div>
        <div>
          <a href="https://github.com/iankimm/">Github</a>
        </div>
        <div>
          iankimmmmm@gmail.com
        </div>
      </div>
    </div>
  );
}

export default App;
