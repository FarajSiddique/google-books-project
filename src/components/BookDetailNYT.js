import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookDetailsByISBN } from "./GoogleBooks";
import NavbarComponent from "./navbar"; // renamed to avoid conflict with React-Bootstrap's Navbar
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const BookDetailNYT = () => {
	const { isbn } = useParams();
	const [book, setBook] = useState(null);

	useEffect(() => {
		const fetchBookDetail = async () => {
			const data = await fetchBookDetailsByISBN(isbn);
			console.log(data);
			setBook(data.items[0]);
		};

		fetchBookDetail();
	}, [isbn]);

	const { currentUser } = useAuth(); // Get the current user from UseAuth context

	const handleAddToBookshelf = async () => {
		try {
			if (!currentUser) {
				throw new Error("You must be logged in to add books to your bookshelf");
			}

			const isbn = book.volumeInfo.industryIdentifiers[1].identifier;

			const response = await fetch(`${BACKEND_URL}/api/bookshelf/add`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: currentUser.uid,
					isbn: isbn,
				}),
			});

			// Check if the response is OK
			if (!response.ok) {
				const textResponse = await response.text();
				try {
					// Try to parse the text response as JSON
					const responseData = JSON.parse(textResponse);
					throw new Error(
						responseData.message || "Failed to add book to bookshelf"
					);
				} catch (jsonError) {
					// If parsing as JSON fails, log the text response
					console.error("Server response:", textResponse);
					throw new Error(
						"Failed to add book to bookshelf, and couldn't parse server response"
					);
				}
			}

			alert("Book added to bookshelf successfully!");
		} catch (error) {
			console.error(error);
			alert(error.message);
		}
	};

	if (!book)
		return (
			<Container className="text-center mt-5">
				<Spinner animation="border" role="status">
					<span className="sr-only"></span>
				</Spinner>
			</Container>
		);

	return (
		<>
			<NavbarComponent />
			<Container className="mt-5">
				<Row>
					<Col md={4}>
						<Card.Img
							variant="top"
							src={book.volumeInfo.imageLinks?.thumbnail}
							alt={book.volumeInfo.title}
						/>
					</Col>
					<Col md={8}>
						<Card>
							<Card.Body>
								<Card.Title>{book.volumeInfo.title}</Card.Title>
								<Card.Text>{book.volumeInfo.authors}</Card.Text>
								<Card.Text>{book.volumeInfo.description}</Card.Text>
								<Card.Text>
									<a href={book.volumeInfo.canonicalVolumeLink}>
										Get this Book!
									</a>
								</Card.Text>
								<Card.Text>
									<button onClick={handleAddToBookshelf}>
										Add to Bookshelf!
									</button>
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default BookDetailNYT;
