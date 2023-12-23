import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Button, Alert, Col } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../navbar/navbar";
import "./UserProfile.css";
import UserProfilePicture from "./UserProfilePicture";
import axios from "axios";

export default function UserProfile() {
	const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

	const [username, setUsername] = useState("");

	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();

	async function handleLogout() {
		setError("");
		try {
			await logout();
			navigate("/login");
		} catch {
			setError("Failed to log out");
		}
	}

	const fetchUserName = useCallback(async () => {
		try {
			const response = await axios.get(
				`${BACKEND_URL}/api/users/${currentUser.uid}`
			);
			setUsername(response.data.username);
			// ... error handling
		} catch (error) {
			// ... error handling
		}
	}, [currentUser.uid, BACKEND_URL]);

	useEffect(() => {
		fetchUserName();
	}, [fetchUserName]);

	async function handleDeleteAccount() {
		try {
			await axios.delete(`${BACKEND_URL}/delete-user/${currentUser.uid}`);

			await currentUser.delete();
			handleLogout();
		} catch (error) {
			console.log(error.response || error);
			setError(
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
					"Failed to delete account"
			);
		}
	}

	return (
		<>
			<Navbar></Navbar>
			<div className="container">
				<Row className="justify-content-center">
					<Col md={6} className="profile-card">
						<h2 className="text-center mb-4">Profile</h2>
						<UserProfilePicture />
						{error && <Alert variant="danger">{error}</Alert>}
						<div className="text-center">
							<strong className="user-details">Username: </strong> {username}
							{error && <div>Error: {error}</div>}
						</div>
						<div className="text-center">
							<strong className="user-details">Email: </strong>{" "}
							{currentUser.email}
							{error && <div>Error: {error}</div>}
						</div>
						{/* Add more user details here */}
						<div className="button-container">
							<Link to="/update-profile" className="btn btn-primary w-100 mt-3">
								Update Profile
							</Link>
						</div>
						<div className="button-container">
							<Button
								variant="danger"
								className="w-100 mt-3"
								onClick={handleDeleteAccount}
							>
								Delete Account
							</Button>
						</div>
						<div className="w-100 text-center mt-2">
							<Button variant="link" onClick={handleLogout}>
								Log Out
							</Button>
						</div>
					</Col>
				</Row>
			</div>
		</>
	);
}
