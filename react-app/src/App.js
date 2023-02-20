import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SplashBody from "./components/SplashBody";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ServerNav from "./components/MainPage/ServerNav";
import MainContent from "./components/MainPage/MainContent";
import "./components/MainPage/MainPage.css";
import EditDeleteChannelModal from "./components/Channels/EditDeleteChannelModal/dp-index";
import EmptyServerCreateChannelForm from "./components/MainPage/EmptyServerCreateChannelForm";
import ServerIndex from "./components/Servers/ServerIndex";
import NotFound from "./components/NotFound";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch, authenticate]);

  if (!isLoaded) return null;
  // console.log("THEME FROM APP.JS --------->", user);

  if (isLoaded) {
    // console.log("USER THEME ---------->", user.theme);
    let theme = "dark";
    if (user) theme = user.theme

    return (
      <div className="App-container">
        <Switch>
          <Route exact path="/">
            <Navigation />
            <SplashBody />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <SignUp />
          </Route>
          <Route path="/channels/:channelId/new">
            <EmptyServerCreateChannelForm />
          </Route>
          <ProtectedRoute path="/channels/@me" exact={true}>
            <div className="MainPage-container" id={theme}>
              <ServerNav theme={theme} />
              <MainContent page="profile" theme={theme} />
            </div>
          </ProtectedRoute>
          <ProtectedRoute path="/channels/:serverId/:channelId" exact={true}>
            <div className="MainPage-container" id={theme}>
              <ServerNav theme={theme} />
              <MainContent page="channel" theme={theme} />
            </div>
          </ProtectedRoute>
          <ProtectedRoute path="/users/:senderId/:friendId">
            <div className="MainPage-container" id={theme}>
              <ServerNav theme={theme} />
              <MainContent page="users" theme={theme} />
            </div>
          </ProtectedRoute>
          <ProtectedRoute
            path="/channels/:serverId/:channelId/edit"
            exact={true}
          >
            <div className="MainPage-container" theme={theme}>
              <EditDeleteChannelModal theme={theme} />
            </div>
          </ProtectedRoute>

          <ProtectedRoute path="/gotMilk" exact={true}>
            <div className="MainPage-container" id={theme}>
              <ServerIndex theme={theme} />
            </div>
          </ProtectedRoute>
          <Route to="/404">
            {/* <Navigation /> */}
            <NotFound />
          </Route>
          <Route>
            {/* <Navigation /> */}
            <NotFound />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;

// <>
// 	<Navigation isLoaded={isLoaded} />
// 	{isLoaded && (
// 		<Switch>
// 			<Route path="/login">
// 				<LoginFormPage />
// 			</Route>
// 			<Route path="/signup">
// 				<SignupFormPage />
// 			</Route>
// 			<Route path="/" exact={true}>
// 				<Splash />
// 			</Route>
// 		</Switch>
// 	)}
// </>
