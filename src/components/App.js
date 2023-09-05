import React from "react";
import Signup from "./Signup";
import AuthProvider from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import UserProfile from "./UserProfile";
import Bookshelf from "./Bookshelf";
import SearchResultPage from "./SearchResultsPage";
import BookDetail from "./BookDetail";
import BookDetailNYT from "./BookDetailNYT";

function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route
						exact
						path="/"
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
					<Route
						path="/update-profile"
						element={
							<PrivateRoute>
								<UpdateProfile />
							</PrivateRoute>
						}
					/>
					<Route
						path="/user-profile"
						element={
							<PrivateRoute>
								<UserProfile />
							</PrivateRoute>
						}
					/>
					<Route
						path="/bookshelf"
						element={
							<PrivateRoute>
								<Bookshelf />
							</PrivateRoute>
						}
					/>
					<Route path="/signup" Component={Signup} />
					<Route path="/login" Component={Login} />
					<Route path="/forgot-password" Component={ForgotPassword} />
					<Route path="/search/:query" Component={SearchResultPage} />
					<Route path="/book/:id" Component={BookDetail} />
					<Route path="/book_nyt/:isbn" Component={BookDetailNYT} />
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
