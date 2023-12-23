import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookDetail } from "../APIServices/GoogleBooks";
import NavbarComponent from "../navbar/navbar";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import "./BookDetail.css"; // Import the CSS file
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const BookDetail = () => {
	const { id } = useParams();
	const [book, setBook] = useState(null);

	const { currentUser } = useAuth(); // Get the current user from UseAuth context

	function stripHtmlTags(str) {
		if (str === null || str === "") return false;
		else str = str.toString();
		return str.replace(/<[^>]*>/g, "");
	}

	useEffect(() => {
		const fetchBookDetail = async () => {
			const data = await getBookDetail(id);
			setBook(data);
			console.log(data);
		};

		fetchBookDetail();
	}, [id]);

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
			<Container className="mt-5 book-detail-container">
				<Row>
					<Col md={4}>
						<Card.Img
							className="book-cover"
							variant="top"
							src={book.volumeInfo.imageLinks?.coverImage}
							alt={book.volumeInfo.title}
						/>
					</Col>
					<Col md={8}>
						<Card className="book-detail-card">
							<Card.Title className="book-title">
								{book.volumeInfo.title}
							</Card.Title>
							<Card.Text className="book-authors">
								{book.volumeInfo.authors}
							</Card.Text>
							<Card.Text className="book-description">
								{stripHtmlTags(book.volumeInfo.description)}
							</Card.Text>
							<Card.Text>
								<a
									className="book-link"
									href={book.volumeInfo.canonicalVolumeLink}
								>
									Get this Book!
								</a>
							</Card.Text>
							<Card.Text>
								<Button
									className="bookshelf-button"
									onClick={handleAddToBookshelf}
								>
									Add to Bookshelf!
								</Button>
							</Card.Text>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default BookDetail;
