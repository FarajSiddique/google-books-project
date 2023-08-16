import React, { useRef, useState } from "react";
import {
	Form,
	Button,
	Card,
	Alert,
	Container,
	Row,
	Col,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup } = useAuth();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const history = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}
		try {
			setError("");
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			history("/");
		} catch {
			setError("Failed to create an account");
		}

		setLoading(false);
	}

	return (
		<>
			<div
				style={{
					backgroundImage: "url(/bookshelf-backdrop.png)",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
				}}
			>
				<Container
					className="d-flex align-items-center justify-content-center"
					style={{ minHeight: "100vh" }}
				>
					<div className="w-75">
						<Row>
							<Col md={6}>
								<Card
									style={{ height: "100%", width: "90%", margin: "0 auto" }}
								>
									<Card.Body style={{ height: "100%" }}>
										<h2 className="text-center mb-4">
											📚Welcome to BookBuddy!📚
										</h2>
										<p className="custom-card-text">
											Dive into a world where stories find new homes. List the
											tales you've cherished, discover books you've longed for,
											and connect with fellow bibliophiles. Let's create endless
											reading adventures together!
										</p>
									</Card.Body>
								</Card>
							</Col>
							<Col md={6}>
								<Card>
									<Card.Body>
										<h2 className="text-center mb-4">Sign Up</h2>
										{error && <Alert variant="danger">{error}</Alert>}

										<Form onSubmit={handleSubmit}>
											<Form.Group id="email" className="mb-3">
												<Form.Label>Email</Form.Label>
												<Form.Control type="email" ref={emailRef} required />
											</Form.Group>
											<Form.Group id="password" className="mb-3">
												<Form.Label>Password</Form.Label>
												<Form.Control
													type="password"
													ref={passwordRef}
													required
												/>
											</Form.Group>
											<Form.Group id="password-confirm" className="mb-3">
												<Form.Label>Confirm Password</Form.Label>
												<Form.Control
													type="password"
													ref={passwordConfirmRef}
													required
												/>
											</Form.Group>
											<Button
												disabled={loading}
												type="submit"
												className="w-100"
											>
												Sign Up
											</Button>
										</Form>
										<div className="w-100 text-center mt-2">
											Already have an account? <Link to="/login">Log In!</Link>
										</div>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</div>
				</Container>
			</div>
		</>
	);
}
