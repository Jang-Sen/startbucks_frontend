import React, { useState } from "react";
import { Alert, Button, Container, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { agreementItems } from "../../common";

const Signup = () => {
  // Value
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  // Error Value
  const [error, setError] = useState(null);

  // Navigate
  const navigate = useNavigate();

  // 소셜 로그인 핸들러
  const socialLoginHandler = async () => {};

  // 약관 초기 상태 (전체 동의 포함)
  const initialAgreement = Object.fromEntries([
    ["all", false],
    ...agreementItems.map((item) => [item.key], false),
  ]);

  const [agreement, setAgreement] = useState(initialAgreement);

  // 약관 전체 동의 핸들러
  const allCheckHandler = () => {
    const newValue = !agreement.all;
    const updatedAgreements = { all: newValue };

    agreementItems.forEach((item) => {
      updatedAgreements[item.key] = newValue;
    });

    setAgreement(updatedAgreements);
  };

  // 약관 개별 체크/해제 핸들러
  const singleCheckHandler = (key) => {
    const updatedAgreements = {
      ...agreement,
      [key]: !agreement[key],
    };

    // 모든 항목이 체크 되어있는지 확인
    const allChecked = agreementItems.every(
      (item) => updatedAgreements[item.key],
    );

    updatedAgreements.all = allChecked;

    setAgreement(updatedAgreements);
  };

  // 이메일 인증 보내는 핸들러
  const sendEmailHandler = async () => {
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:82/api/v1/auth/email/send",
        { email },
      );

      console.log(response.data);

      if (response.status === 201) {
        setSendEmail(true);
      }
    } catch (err) {
      setSendEmail(false);
      setError(err.response.data.message);
      console.error("Send Email Handler Error: ", err.response.data.message);
    }
  };

  // 이메일 체크 핸들러
  const checkEmailHandler = async () => {
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:82/api/v1/auth/email/check",
        {
          email,
          code,
        },
      );

      console.log(response.data);

      if (response.status === 201) {
        setCheckEmail(true);
      }
    } catch (err) {
      setCheckEmail(false);
      setError(err.response.data.message);
      console.error("Check Email Handler Error: ", err.response.data.message);
    }
  };

  // 서브밋 핸들러
  const submitHandler = async (e) => {
    e.preventDefault();

    setError(null);

    const user = {
      username: name,
      email,
      password,
      phone,
      agreeOfTerm: agreement,
    };

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!checkEmail) {
      setError("이메일 인증을 완료해 주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:82/api/v1/auth/signup",
        user,
      );

      console.log("Signup Success: ", response.data);

      if (response.status === 201) {
        navigate("/login");
      }
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
          <InputGroup>
            <Form.Control
              type="email"
              placeholder="이메일을 입력해 주세요."
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={checkEmail}
              required
            />

            <Button
              variant={checkEmail ? "success" : "outline-primary"}
              onClick={sendEmailHandler}
              disabled={!email || checkEmail}
            >
              {checkEmail ? "인증 완료" : "인증번호 발송"}
            </Button>
          </InputGroup>
        </Form.Group>

        {sendEmail && !checkEmail && (
          <Form.Group className="mb-3">
            <Form.Label>이메일 인증</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="인증번호를 입력해 주세요."
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />

              <Button variant="outline-primary" onClick={checkEmailHandler}>
                인증 받기
              </Button>
            </InputGroup>
          </Form.Group>
        )}

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
            placeholder="휴대폰 번호를 입력해 주세요. (반드시 숫자만 입력)"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="m-2 mt-4">
          <Form.Label>
            <strong>약관 동의</strong>
          </Form.Label>
          <Form.Check
            type="checkbox"
            label={
              <>
                <strong>전체 동의 </strong>
                <text style={{ color: "gray", fontSize: "small" }}>
                  선택항목에 대한 동의 포함
                </text>
              </>
            }
            checked={agreement.all}
            onChange={allCheckHandler}
          />
        </Form.Group>

        {agreementItems.map((item) => (
          <Form.Group key={item.key} className="m-2">
            <Form.Check
              type="checkbox"
              label={item.label}
              checked={agreement[item.key]}
              onChange={() => singleCheckHandler(item.key)}
            />
          </Form.Group>
        ))}

        <Button type="submit" variant="primary" className="w-100">
          회원가입
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
