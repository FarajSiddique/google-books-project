import React, { useState } from "react";
import { searchBooks } from "./GoogleBooks";

import Navbar from "./navbar";
import Carousel from "./Carousel";

export default function Dashboard() {
	const [query, setQuery] = useState("");
	const [books, setBooks] = useState([]);

	const handleSearch = async () => {
		try {
			const data = await searchBooks(query);
			setBooks(data.items);
		} catch (error) {
			console.error("Error fetching books", error);
		}
	};

	return (
		<>
			<Navbar></Navbar>
			<Carousel></Carousel>

			<div>
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search for books..."
				/>
				<button onClick={handleSearch}>Search</button>

				<ul>
					{books.map((book) => (
						<li key={book.id}>
							<h3>{book.volumeInfo.title}</h3>
							<p>{book.volumeInfo.description}</p>
							<img
								src={book.volumeInfo.imageLinks.smallThumbnail}
								alt="Book"
							></img>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
