import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { fetchTop5BestSellingBooksFiction } from "../APIServices/NYTBooks";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Carousel.css";

const responsive = {
	0: { items: 1 },
	568: { items: 2 },
	1024: { items: 3 },
};

export default function Carousel() {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		const getBooks = async () => {
			try {
				const top5 = await fetchTop5BestSellingBooksFiction();

				setBooks(top5);
			} catch (error) {
				console.error("Error fetching books", error);
			}
		};

		getBooks();
	}, []);

	const items = books.map((book) => {
		return (
			<Card
				as={Link}
				to={`book_nyt/${book.isbns[0].isbn13}`}
				className="fixed-height-card-nyt"
			>
				<Card.Img
					variant="top"
					src={book.book_image}
					className="card-image-nyt"
				/>

				<Card.Body>
					<Card.Title className="card-title-nyt">{book.title}</Card.Title>
				</Card.Body>
			</Card>
		);
	});

	return (
		<AliceCarousel
			mouseTracking
			items={items}
			responsive={responsive}
			controlsStrategy="alternate"
		/>
	);
}
