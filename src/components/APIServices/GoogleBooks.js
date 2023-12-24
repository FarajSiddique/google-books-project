import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const searchBooks = async (query, page = 1, limit = 40) => {
	try {
		const response = await axios.get(`${BACKEND_URL}/api/book/search`, {
			params: {
				q: query,
				page: page,
				limit: limit,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching books", error);
		throw error;
	}
};

export const getBookDetail = async (bookId) => {
	try {
		const response = await axios.get(`${BACKEND_URL}/api/book/${bookId}`, {
			params: {
				bookId: bookId,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching book details", error);
		throw error;
	}
};

export const fetchBookDetailsByISBN = async (isbn) => {
	try {
		const response = await axios.get(
			`${BACKEND_URL}/api/book/book-details-by-isbn`,
			{
				params: {
					isbn: isbn,
				},
			}
		);
		if (response.data.totalItems > 0) {
			return response.data;
		}
		return null; // If no results were found
	} catch (error) {
		console.error("Error fetching book cover", error);
		throw error;
	}
};
