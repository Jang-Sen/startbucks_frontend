import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const Main = () => {
  return (
    <Container className="mt-4">
      {/* Hero Section */}
      <Row className="text-center">
        <Col>
          <Card className="bg-dark text-white">
            <Card.Img
              src="https://image.istarbucks.co.kr/common/img/main/rewards-logo.png"
              alt="Main Banner"
            />
            <Card.ImgOverlay
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ color: "black" }}
            >
              <Card.Title className="display-4">
                새로운 시즌 한정 메뉴
              </Card.Title>
              <Card.Text>따뜻한 커피와 함께하는 특별한 순간</Card.Text>
              <Button href="/product" variant="success">
                자세히 보기
              </Button>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>

      {/* Promotion Section */}
      <Row className="mt-5">
        <Col md={4} className="text-center">
          <Card>
            <Card.Body>
              <Card.Title>스타벅스 리워드</Card.Title>
              <Card.Text>별을 모아 혜택을 받으세요!</Card.Text>
              <Button href="/signup" variant="success">
                가입하기
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="text-center">
          <Card>
            <Card.Body>
              <Card.Title>한정 메뉴 출시</Card.Title>
              <Card.Text>새로운 시즌 메뉴를 만나보세요!</Card.Text>
              <Button href="/product" variant="warning">
                자세히 보기
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="text-center">
          <Card>
            <Card.Body>
              <Card.Title>기프트 카드</Card.Title>
              <Card.Text>소중한 사람에게 스타벅스를 선물하세요.</Card.Text>
              <Button variant="primary">구매하기</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
