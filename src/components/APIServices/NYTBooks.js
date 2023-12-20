import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchTop5BestSellingBooksFiction = async () => {
	try {
		const response = await axios.get(
			`${BACKEND_URL}/dashboard/fetch-top-5-books-fiction`
		);

		return response.data;
	} catch (error) {
		console.error(
			"Error fetching top 5 best selling fiction books from NYT",
			error
		);
		throw error;
	}
};

export const fetchTop5BestSellingBooksNonFiction = async () => {
	try {
		const response = await axios.get(
			`${BACKEND_URL}/dashboard/fetch-top-5-books-non-fiction`
		);

		return response.data;
	} catch (error) {
		console.error(
			"Error fetching top 5 best selling non-fiction books from NYT",
			error
		);
		throw error;
	}
};
