import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../navbar/navbar";

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
			<Card className="profile-card">
				<Card.Body>
					<div className="profile-picture">
						{/* Replace with actual profile picture if available */}
						<img src="/default-avatar.png" alt="Profile" />
					</div>
					<h2 className="text-center mb-4">Profile</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<strong>Email: </strong> {currentUser.email}
					{/* Add more user details here */}
					<Link to="/update-profile" className="btn btn-primary w-100 mt-3">
						Update Profile
					</Link>
					<Link to="/change-password" className="btn btn-secondary w-100 mt-3">
						Change Password
					</Link>
					<Button
						variant="danger"
						className="w-100 mt-3"
						// onClick={handleDeleteAccount}
					>
						Delete Account
					</Button>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Button variant="link" onClick={handleLogout}>
					Log Out
				</Button>
			</div>
		</>
	);
}
