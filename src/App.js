import React from "react";
import Signup from "./components/Signup/Signup.js";
import AuthProvider from "./contexts/AuthContext.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.js";
import Login from "./components/Login/Login.js";
import PrivateRoute from "./components/PrivateRoute.js";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.js";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile.js";
import UserProfile from "./components/UserProfile/UserProfile.js";
import BookshelfPage from "./components/Bookshelf/Bookshelf.js";
import SearchResultPage from "./components/SearchResultsPage/SearchResultsPage.js";
import BookDetail from "./components/BookDetail/BookDetail.js";
import BookDetailNYT from "./components/BookDetail/BookDetailNYT.js";

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
								<BookshelfPage />
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
