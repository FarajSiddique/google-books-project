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

export default function App() {
	const [showNavNoTogglerThird, setShowNavNoTogglerThird] = useState(false);

	return (
		<>
			<MDBNavbar expand="lg" light style={{ backgroundColor: "#EAC696" }}>
				<MDBContainer fluid>
					<MDBNavbarToggler
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
						<MDBInputGroup tag="form" className="d-flex w-auto">
							<input
								className="form-control"
								placeholder="Type query"
								aria-label="Search"
								type="Search"
							/>
							<MDBBtn outline>Search</MDBBtn>
						</MDBInputGroup>
					</MDBCollapse>
				</MDBContainer>
			</MDBNavbar>
		</>
	);
}
