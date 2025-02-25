import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Value
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error Value
  const [error, setError] = useState(null);

  // Navigate
  const navigate = useNavigate();

  // 서브밋 핸들러
  const submitHandler = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:82/api/v1/auth/login",
        {
          email,
          password,
        },
      );

      console.log("Login Success: ", response.data);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
      console.error("Submit Handler Error: ", err.response.data.message);
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "400px" }}>
      <h2 className="text-center">로그인</h2>

      <p className="text-center" style={{ color: "dimgray" }}>
        <strong style={{ color: "green" }}>Welcome!</strong>
        <br />
        스타벅스 장센점에 오신 것을 환영합니다.
      </p>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일을 입력해 주세요."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="success" className="w-100">
          로그인
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
