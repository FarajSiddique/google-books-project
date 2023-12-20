import React from "react";
import Navbar from "../navbar/navbar";
import FictionCarousel from "../Carousels/FictionCarousel";
import NonFictionCarousel from "../Carousels/NonFictionCarousel";
import { Container } from "react-bootstrap";

export default function Dashboard() {
	return (
		<>
			<Navbar></Navbar>

			<div style={{ backgroundColor: "#C8AE7D", padding: "2rem" }}>
				<h2 style={{ padding: "2rem" }}>Best Selling Fiction Books!</h2>
				<Container>
					<FictionCarousel></FictionCarousel>
				</Container>
				<h2>Best Selling Nonfiction Books!</h2>
				<Container>
					<NonFictionCarousel></NonFictionCarousel>
				</Container>
			</div>
		</>
	);
}
