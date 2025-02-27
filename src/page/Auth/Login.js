import React, { useState } from "react";
import { Alert, Button, Container, Form, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLogin } from "../../hook/useAuthentication";
import { socialMenus } from "../../common";
import { useGoogleLogin } from "../../hook/useSocialLogin";

const Login = () => {
  // Value
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error Value
  const [error, setError] = useState(null);

  // Mutation
  const loginMutation = useLogin();
  const googleLoginMutation = useGoogleLogin();

  // 소셜 로그인 핸들러
  const socialLoginHandler = async () => {
    googleLoginMutation.mutate();
  };

  // 서브밋 핸들러
  const submitHandler = async (e) => {
    e.preventDefault();

    setError(null);

    loginMutation.mutate(
      { email, password },
      {
        onError: (err) => {
          setError("Login Error: " + err.response.data.message);
        },
      },
    );
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
        <p className="mt-2" style={{ color: "green", fontSize: "small" }}>
          <strong>
            * 타 사이트와 비밀번호를 동일하게 사용할 경우 도용의 위험이
            있으므로, 정기적인 비밀번호 변경을 해주시길 바랍니다.
          </strong>
        </p>
        <Link to="/signup" className="btn btn-link w-50 me-auto">
          회원가입
        </Link>
        <Link to={"/find/password"} className="btn btn-link w-50 me-auto">
          비밀번호 변경
        </Link>
      </Form>

      <p
        className="text-center mt-3"
        style={{
          fontSize: "small",
          color: "GrayText",
        }}
      >
        SNS 계정으로 간편 로그인/회원가입
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "5px",
          margin: "15px 0",
        }}
      >
        {socialMenus.map((menu, index) => (
          <Button
            key={menu.id}
            onClick={() => socialLoginHandler(menu.name)}
            style={{
              border: "none",
              background: "transparent",
              marginBottom: "10px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            <Image
              src={menu.image}
              alt={menu.name}
              style={{ width: "100px", height: "50px" }}
            />
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default Login;
