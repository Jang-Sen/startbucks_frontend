import React from "react";
import { Container, Image } from "react-bootstrap";

const Error = () => {
  return (
    <Container className="text-center mt-5">
      <Image src="https://www.starbucks.co.kr/common/img/common/logo.png" />
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
    </Container>
  );
};

export default Error;
