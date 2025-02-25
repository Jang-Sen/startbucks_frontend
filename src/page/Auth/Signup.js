import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // Value
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  // Error Value
  const [error, setError] = useState(null);

  // Navigate
  const navigate = useNavigate();

  // 서브밋 핸들러
  const submitHandler = async (e) => {
    e.preventDefault();

    setError(null);

    const user = {
      username: name,
      email,
      password,
      phone,
    };

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:82/api/v1/auth/signup",
        user,
      );

      console.log("Signup Success: ", response.data);

      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
      console.error("Submit Handler Error: ", err.response.data.message);
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "400px" }}>
      <h2 className="text-center m-4">회원가입</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>이름</Form.Label>
          <Form.Control
            type="text"
            placeholder="이름을 입력해 주세요."
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </Form.Group>

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

        <Form.Group className="mb-3">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호 확인을 입력해 주세요."
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>휴대폰 번호</Form.Label>
          <Form.Control
            type="int"
            placeholder="휴대폰 번호를 입력해 주세요. (반드시 숫자로 입력)"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100">
          회원가입
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
