import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookDetail } from "../APIServices/GoogleBooks";
import NavbarComponent from "../navbar/navbar"; // renamed to avoid conflict with React-Bootstrap's Navbar
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const BookDetail = () => {
	const { id } = useParams();
	const [book, setBook] = useState(null);

	useEffect(() => {
		const fetchBookDetail = async () => {
			const data = await getBookDetail(id);
			setBook(data);
			console.log(data);
		};

		fetchBookDetail();
	}, [id]);

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
							src={book.volumeInfo.imageLinks?.coverImage}
							alt={book.volumeInfo.title}
						/>
					</Col>
					<Col md={8}>
						<Card>
							<Card.Title>{book.volumeInfo.title}</Card.Title>
							<Card.Text>{book.volumeInfo.authors}</Card.Text>
							<Card.Text>{book.volumeInfo.description}</Card.Text>
							<Card.Text>
								<a href={book.volumeInfo.canonicalVolumeLink}>Get this Book!</a>
							</Card.Text>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default BookDetail;
