import React, { useState } from "react";
import {
  Alert,
  Button,
  Container,
  Form,
  Image,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FindPassword = () => {
  // Value
  const [email, setEmail] = useState("");

  // Error
  const [error, setError] = useState(null);

  // Navigate
  const navigate = useNavigate();

  // Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:82/api/v1/auth/find/password",
        { email },
      );

      console.log(response.data);

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response.data.message);
      console.error(err.response.data.message);
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "400px" }}>
      <h2 className="text-center">비밀번호 변경</h2>

      <Image
        className="d-block mx-auto mt-4"
        src="https://image.istarbucks.co.kr/common/img/util/mem/icon_find_sally.png"
      />

      <p
        className="text-center mt-3"
        style={{ color: "dimgray", fontSize: "medium" }}
      >
        <strong style={{ color: "black", fontSize: "x-large" }}>
          비밀번호가 기억나지 않으세요?
        </strong>
        <br />
        이메일 인증을 통해 비밀번호를 재설정 하실 수 있습니다.
      </p>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <div className="mb-1">
            <Form.Text style={{ color: "black", fontSize: "small" }}>
              가입한 이메일 주소를 입력해주세요.
            </Form.Text>
          </div>

          <InputGroup>
            <Form.Control
              type="email"
              value={email}
              placeholder="이메일을 입력해 주세요."
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </InputGroup>
        </Form.Group>

        <Button type="submit" variant="success" className="w-100">
          비밀번호 변경 인증 메일 전송
        </Button>
      </Form>
    </Container>
  );
};

export default FindPassword;
