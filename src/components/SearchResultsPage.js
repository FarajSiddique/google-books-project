import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { Link, useParams } from "react-router-dom";
import { searchBooks } from "./GoogleBooks";
import { Card, Col, Row } from "react-bootstrap";
import "./SearchResultsPage.css";

const SearchResultPage = () => {
	const { query } = useParams();
	const [books, setBooks] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await searchBooks(query);
				setBooks(data.items);
			} catch (error) {
				console.error("Error fetching books", error);
			}
		};

		fetchData();
	}, [query]);

	return (
		<>
			<Navbar></Navbar>
			<div className="search-body">
				<h2>Search Results for: {query}</h2>
				<div className="search-results-body">
					<Row xs={2} md={3} lg={5} className="g-4">
						{books.map((book) => (
							<Col key={book.id}>
								<Card
									as={Link}
									to={`/book/${book.id}`}
									className="fixed-height-card"
								>
									<Card.Img
										variant="top"
										src={book.volumeInfo.imageLinks.smallThumbnail}
										className="card-image"
									/>
									<Card.Body>
										<Card.Title className="card-title">
											{book.volumeInfo.title}
										</Card.Title>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</div>
			</div>
		</>
	);
};

export default SearchResultPage;
