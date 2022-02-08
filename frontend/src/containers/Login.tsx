import { Col, Row } from "antd";
import React, { useState } from "react";
import ForgotPassword from "../components/auth/ForgotPassword";
import LoginForm from "../components/auth/LoginForm";
import "../css/Login.css";

const Login: React.FC = () => {
  const [forgot, setForgot] = useState(false);

  const toggle = () => setForgot(!forgot);

  return (
    <>
      <div className="back"></div>
      <div className="back1">
        <Row wrap={true}>
          <Col
            xs={{ span: 18, offset: 3 }}
            md={{ span: 7, offset: 8 }}
            style={{ marginTop: "6rem" }}
            className="inp1"
          >
            {forgot ? (
              <ForgotPassword toggle={toggle} />
            ) : (
              <LoginForm forgot={toggle} />
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
