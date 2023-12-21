import React, { useEffect, useState, useContext } from "react";
import { auth } from "../firebase";
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	updateEmail,
	updatePassword,
	updateProfile,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logout() {
		return signOut(auth); // Corrected this line
	}

	function resetPassword(email) {
		return sendPasswordResetEmail(auth, email);
	}

	function updateNewEmail(email) {
		return updateEmail(currentUser, email); // Ensure currentUser is up-to-date
	}

	function updateNewPassword(password) {
		return updatePassword(currentUser, password); // Ensure currentUser is up-to-date
	}

	function updateNewProfile(displayName, photoURL) {
		return updateProfile(currentUser, { displayName, photoURL }); // Corrected this line
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		login,
		signup,
		logout,
		resetPassword,
		updateNewEmail,
		updateNewPassword,
		updateNewProfile,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
