import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const getBookShelf = async (userId) => {
	try {
		const response = await axios.get(
			`${BACKEND_URL}/api/bookshelf/${userId}`,
			{}
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching books", error);
		throw error;
	}
};
