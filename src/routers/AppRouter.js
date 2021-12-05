import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import DashboardScreen from "../screens/DashboardScreen";
import { useAuth } from '../hooks';

const ProtectedRoute = ({ children }) => {
	const { auth } = useAuth();
	return (auth.isAuthenticated) ? (
		children
	) : (
		<Navigate to="/" />
	);
};
export const AppRouter = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginScreen />} />
				<Route path="/signup" element={<SignUpScreen />} />
				<Route path="/dashboard" element={
					<ProtectedRoute>
						<DashboardScreen />
					</ProtectedRoute>
				} />
			</Routes>
		</Router>
	);
};
