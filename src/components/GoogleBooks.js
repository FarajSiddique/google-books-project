import axios from "axios";

const BASE_URL = "https://www.googleapis.com/books/v1";
const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

export const searchBooks = async (query) => {
	try {
		const response = await axios.get(
			`${BASE_URL}/volumes?q=${query}&key=${API_KEY}`
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching books", error);
		throw error;
	}
};
