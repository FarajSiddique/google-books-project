import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { auth } from "../../firebase";
import { updateProfile } from "firebase/auth";
import "./UserProfilePicture.css";

export default function UserProfilePicture() {
	const [file, setFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [profilePicUrl, setProfilePicUrl] = useState(
		"/user-profile-default.png"
	);

	const storage = getStorage();

	useEffect(() => {
		if (auth.currentUser && auth.currentUser.photoURL) {
			setProfilePicUrl(auth.currentUser.photoURL);
		}
	}, []);

	const handleFileChange = async (e) => {
		setFile(e.target.files[0]);
		setUploading(true);
		const fileName = e.target.files[0].name;
		const storageRef = ref(
			storage,
			`profile-pictures/${auth.currentUser.uid}/${fileName}`
		);
		const snapshot = await uploadBytes(storageRef, e.target.files[0]);
		const url = await getDownloadURL(snapshot.ref);
		await updateProfile(auth.currentUser, { photoURL: url });
		setProfilePicUrl(url);
		setUploading(false);
	};

	return (
		<>
			<div className="profile-picture">
				<img src={profilePicUrl || "/user-profile-default.png"} alt="Profile" />
				<div className="button-container">
					<label htmlFor="file-upload" className="custom-file-upload">
						{uploading ? `Uploading ${file ? file.name : ""}` : "Choose File"}
					</label>
					<input
						id="file-upload"
						type="file"
						onChange={handleFileChange}
						disabled={uploading}
						style={{ display: "none" }}
					/>
					{file && <span className="file-name">{file.name}</span>}
				</div>
			</div>
		</>
	);
}
