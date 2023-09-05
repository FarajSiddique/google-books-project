import React, { useState } from "react";
import {
	MDBNavbar,
	MDBContainer,
	MDBNavbarBrand,
	MDBNavbarToggler,
	MDBNavbarItem,
	MDBNavbarLink,
	MDBCollapse,
	MDBBtn,
	MDBNavbarNav,
	MDBIcon,
	MDBInputGroup,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

export default function App() {
	const [showNavNoTogglerThird, setShowNavNoTogglerThird] = useState(false);
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const handleInputChange = (event) => {
		setQuery(event.target.value);
	};

	const handleSearch = (event) => {
		event.preventDefault();
		navigate(`/search/${query}`);
	};

	return (
		<>
			<MDBNavbar expand="lg" light style={{ backgroundColor: "#EAC696" }}>
				<MDBContainer fluid>
					<MDBNavbarToggler
						style={{ backgroundColor: "#fff" }}
						type="button"
						data-target="#navbarTogglerDemo03"
						aria-controls="navbarTogglerDemo03"
						aria-expanded="false"
						aria-label="Toggle navigation"
						onClick={() => setShowNavNoTogglerThird(!showNavNoTogglerThird)}
					>
						<MDBIcon icon="bars" fas />
					</MDBNavbarToggler>
					<MDBNavbarBrand href="/">BookBuddy 📚</MDBNavbarBrand>
					<MDBCollapse navbar show={showNavNoTogglerThird}>
						<MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
							<MDBNavbarItem>
								<MDBNavbarLink active aria-current="page" href="/user-profile">
									Profile
								</MDBNavbarLink>
							</MDBNavbarItem>
							<MDBNavbarItem>
								<MDBNavbarLink href="/bookshelf">Bookshelf</MDBNavbarLink>
							</MDBNavbarItem>
						</MDBNavbarNav>
						<MDBInputGroup
							tag="form"
							className="d-flex w-auto"
							onSubmit={handleSearch}
						>
							<input
								className="form-control"
								placeholder="Search for books"
								aria-label="Search"
								type="Search"
								value={query}
								onChange={handleInputChange}
							/>
							<MDBBtn
								type="submit"
								style={{
									backgroundColor: "#65451F",
									color: "#fff",
									border: "#fff",
								}}
							>
								Search
							</MDBBtn>
						</MDBInputGroup>
					</MDBCollapse>
				</MDBContainer>
			</MDBNavbar>
		</>
	);
}
