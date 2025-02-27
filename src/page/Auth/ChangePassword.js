import React, { useState } from "react";
import { Alert, Button, Container, Form, Image } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useChangePassword } from "../../hook/useResetPassword";

const ChangePassword = () => {
  // Value
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error
  const [error, setError] = useState(null);

  // Mutation
  const changePasswordMutation = useChangePassword();

  // Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault();

    setError(null);

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    changePasswordMutation.mutate(
      { token, password },
      {
        onError: () => {
          setError("Change Password Error: " + error.response.data.message);
        },
      },
    );
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
          <Form.Label>새 비밀번호</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="새 비밀번호를 입력해 주세요."
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>새 비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            placeholder="새 비밀번호를 다시 입력해 주세요."
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="success" className="w-100">
          비밀번호 변경하기
        </Button>
      </Form>
    </Container>
  );
};

export default ChangePassword;
