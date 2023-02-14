import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import Splash from "./components/Splash/index";
// import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
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

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(authenticate()).then(() => setIsLoaded(true));
	}, [dispatch, authenticate]);

	if (!isLoaded) return null;

	return (
		isLoaded && (
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
						<div className="MainPage-container">
							<ServerNav />
							<MainContent page="profile" />
						</div>
					</ProtectedRoute>
					<ProtectedRoute
						path="/channels/:serverId/:channelId"
						exact={true}
					>
						<div className="MainPage-container">
							<ServerNav />
							<MainContent page="channel" isLoaded={isLoaded} />
						</div>
					</ProtectedRoute>
					<ProtectedRoute
						path="/channels/:serverId/:channelId/edit"
						exact={true}
					>
						<div className="MainPage-container">
							<EditDeleteChannelModal />
						</div>
					</ProtectedRoute>

					<ProtectedRoute path="/gotMilk" exact={true}>
						<div className="MainPage-container">
							<ServerIndex />
						</div>
					</ProtectedRoute>
					<Route>404: Error. Got Milk?</Route>
				</Switch>
			</div>
		)
	);
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
