import React, { useState } from "react";
import "../styles/SignIn.css";
import { ArrowRightOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { userSignIn } from "../userSignIn";
import jwt_decode from "jwt-decode";
import amazonLogoDark from "../assets/amazonLogoDark.svg";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errEmail: "",
    errPassword: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      [`err${name.charAt(0).toUpperCase() + name.slice(1)}`]: "",
    }));
  };

  const logIn = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      setFormData((prevData) => ({
        ...prevData,
        errEmail: "Enter your email",
      }));
    }

    if (!formData.password) {
      setFormData((prevData) => ({
        ...prevData,
        errPassword: "Enter your password",
      }));
    }

    try {
      if (formData.email && formData.password) {
        const user = await userSignIn({
          email: formData.email,
          password: formData.password,
        });
        if (user.data.jwt) {
          localStorage.setItem("token", user.data.jwt);
          const decoded = jwt_decode(user.data.jwt);
          setFormData({
            email: "",
            password: "",
            errEmail: "",
            errPassword: "",
          });
          navigate("/Cart");
        }
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert("Wrong password, try again");
      }
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-header">
        <Link to="/amazon-project">
          <img
            src={amazonLogoDark}
            alt="your-image-url-alt"
            className="signin-logo"
          />
        </Link>
      </div>
      <div className="signin-form">
        <h2 className="signin-title">Sign in</h2>
        <div className="signin-inputs">
          <div className="signin-input">
            <p>Email</p>
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              className="signin-text-input"
            />
            {formData.errEmail && (
              <p className="error-text">
                <span className="signin-error-sign">!</span>
                {formData.errEmail}
              </p>
            )}
          </div>
          <div className="signin-input">
            <p>Password</p>
            <input
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              type="password"
              className="signin-text-input"
            />
            {formData.errPassword && (
              <p className="error-text">
                <span className="signin-error-sign">!</span>
                {formData.errPassword}
              </p>
            )}
          </div>
          <button className="signin-button" onClick={(e) => logIn(e)}>
            Continue
          </button>
        </div>
        <p className="signin-terms">
          By Continuing, you agree to Amazon's
          <span className="blue-link">Conditions of Use</span> and{" "}
          <span className="blue-link">Privacy Notice.</span>
        </p>
        <p className="signin-help">
          <ArrowRightOutlined />
          <span className="blue-link">Need help?</span>
        </p>
      </div>
      <div className="signin-divider">
        <span className="signin-divider-line"></span>
        <span className="signin-divider-text">New to Amazon?</span>
        <span className="signin-divider-line"></span>
      </div>
      <Link to="/registration" className="signin-call-to-register-container">
        <button className="signin-call-to-register-btn">
          Create your Amazon account
        </button>
      </Link>
      <div className="signin-footer">
        <div className="footer-links">
          <p className="footer-link">Conditions of Use</p>
          <p className="footer-link">Privacy Notice</p>
          <p className="footer-link">Help</p>
        </div>
        <p className="footer-text">
          © 1996-2023, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default Signin;
