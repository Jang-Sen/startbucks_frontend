import React from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">
          <Image
            src="https://www.starbucks.co.kr/common/img/common/logo.png"
            className={"me-3"}
          />
          Jangsen Starbuck
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">홈</Nav.Link>
          <Nav.Link href="/product">제품</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/login">로그인</Nav.Link>
          <Nav.Link href="/signup">회원가입</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
