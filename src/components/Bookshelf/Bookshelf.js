import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { getBookShelf } from "../APIServices/BookshelfRoutes";
import Navbar from "../navbar/navbar";
import { fetchBookDetailsByISBN } from "../APIServices/GoogleBooks";
import "../SearchResultsPage/SearchResultsPage.css";
import { Link } from "react-router-dom";

const BookshelfPage = () => {
	const [books, setBooks] = useState([]);
	const { currentUser } = useAuth();

	useEffect(() => {
		const fetchBookshelf = async () => {
			try {
				const data = await getBookShelf(currentUser.uid);
				const bookDetailsPromises = data.books.map((book) =>
					fetchBookDetailsByISBN(book.isbn)
				);
				const booksWithDetails = await Promise.all(bookDetailsPromises);
				setBooks(booksWithDetails);
			} catch (error) {
				console.log("error");
			}
		};

		fetchBookshelf();
	}, [currentUser]);

	return (
		<>
			<Navbar></Navbar>
			<div className="search-body">
				<h2>My Bookshelf</h2>
				<div className="search-results-body">
					<Row xs={2} md={3} lg={5} className="g-4">
						{Array.isArray(books) && books.length > 0 ? (
							books.map((book) => {
								const isbn13 =
									book.items[0].volumeInfo.industryIdentifiers[0].identifier;

								return (
									<Col key={isbn13}>
										<Card
											as={Link}
											to={`/book_nyt/${isbn13}`}
											className="fixed-height-card"
										>
											<Card.Img
												variant="top"
												src={
													book.items[0].volumeInfo.imageLinks?.thumbnail ||
													"/default-book.png"
												}
												className="card-image"
											/>
											<Card.Body>
												<Card.Title className="card-title">
													{book.items[0].volumeInfo.title}
												</Card.Title>
											</Card.Body>
										</Card>
									</Col>
								);
							})
						) : (
							<p>No Books found.</p>
						)}
					</Row>
				</div>
			</div>
		</>
	);
};

export default BookshelfPage;
