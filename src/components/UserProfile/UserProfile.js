import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Button, Alert, Col } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../navbar/navbar";
import "./UserProfile.css";

export default function UserProfile() {
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

	return (
		<>
			<Navbar></Navbar>
			<div className="container">
				<Row className="justify-content-center">
					<Col md={6} className="profile-card">
						<div className="profile-picture">
							{/* Replace with actual profile picture if available */}
							<img src="/user-profile-default.png" alt="Profile" />
						</div>
						<h2 className="text-center mb-4">Profile</h2>
						{error && <Alert variant="danger">{error}</Alert>}
						<div className="text-center">
							<strong className="user-details">Email: </strong>{" "}
							{currentUser.email}
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
								// onClick={handleDeleteAccount}
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
