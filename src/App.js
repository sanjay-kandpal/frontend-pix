import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Home from "./component/Home";
import HandleFileUpload from "./component/HandleFileUpload";
import SelfieUpload from "./component/SelfieUpload";
import LandingPage from "./component/LandingPage";
import Profile from "./component/Profile";
import Error404 from './component/Error404';
import { UserProvider } from './context/UserContext';
import Album from "./component/Album";
import Share from "./component/Share";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {


	return (
		<BrowserRouter>
			<UserProvider>
				<Routes>
					<Route path="/Login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					
					<Route path="/" element={<LandingPage />} />
					
					<Route path="/home" element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>} />
					<Route path="/Upload" element={
						<ProtectedRoute>
							<HandleFileUpload />
						</ProtectedRoute>} />
					<Route path="/selfImageUpload" element={
						<ProtectedRoute>
							<SelfieUpload />
						</ProtectedRoute>} />
					<Route path="/profile" element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>} />
					<Route path="/album/:partycode" element={
						<ProtectedRoute>
							<Album />
						</ProtectedRoute>} />
					<Route path="/share" element={
						<ProtectedRoute>
							<Share />
						</ProtectedRoute>} />
					<Route path="/*" element={<Error404 />} />
				</Routes>
			</UserProvider>
		</BrowserRouter>
	);
}

export default App;
