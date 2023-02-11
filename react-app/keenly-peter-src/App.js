import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Navigation from "./components/Navigation";
import Splash from "./components/Splash";
import SplashBody from "./components/SplashBody";
import MainPage from "./components/MainPage";
import ServerNav from "./components/MainPage/ServerNav";
import MainContent from "./components/MainPage/MainContent";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
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
      <ProtectedRoute path="/channels/@me" exact={true}>
          <div className="MainPage-container">
              <ServerNav />
              <MainContent page="profile" />
          </div>
      </ProtectedRoute>
      <ProtectedRoute path="/channels/:serverId/:channelId" exact={true}>
          <div className="MainPage-container">
              <ServerNav />
              <MainContent page="channel" />
          </div>
      </ProtectedRoute>
		</Switch>

      {/* <Navigation>
        <Switch>
          <Route exact path="/">
            <Splash />
          </Route>
		  <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Navigation> */}
    </div>
  );
}

export default App;
