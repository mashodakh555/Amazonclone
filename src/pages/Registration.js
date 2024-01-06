import React, { useState } from "react";
import "../styles/Registration.css";
import "../styles/SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { baseAPI } from "../baseApi";

const RegistrationApiUrl =
  "https://digitalinstitute-amazon.azurewebsites.net/api/user/registerUser";

export const Registration = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    userName: "",
    email: "",
    password: "",
    cPassword: "",
    errUserName: "",
    errEmail: "",
    errPassword: "",
    errCPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      [`err${name.charAt(0).toUpperCase() + name.slice(1)}`]: "",
    }));
  };

  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[\w.+-]+@[\w-]+\.[a-z]{2,}$/);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    const { userName, email, password, cPassword } = formState;

    if (!userName) {
      setFormState((prevState) => ({
        ...prevState,
        errUserName: "Enter your name",
      }));
    }

    if (!email) {
      setFormState((prevState) => ({
        ...prevState,
        errEmail: "Enter your email",
      }));
    } else {
      if (!emailValidation(email)) {
        setFormState((prevState) => ({
          ...prevState,
          errEmail: "Enter a valid email",
        }));
      }
    }

    if (!password) {
      setFormState((prevState) => ({
        ...prevState,
        errPassword: "Enter your password",
      }));
    } else {
      if (password.length < 6) {
        setFormState((prevState) => ({
          ...prevState,
          errPassword: "Password must be at least 6 characters",
        }));
      }
    }

    if (!cPassword) {
      setFormState((prevState) => ({
        ...prevState,
        errCPassword: "Confirm your password",
      }));
    } else {
      if (cPassword !== password) {
        setFormState((prevState) => ({
          ...prevState,
          errCPassword: "Password doesn't match",
        }));
      }
    }

    try {
      if (
        userName &&
        email &&
        emailValidation(email) &&
        password &&
        password.length >= 6 &&
        cPassword &&
        cPassword === password
      ) {
        await baseAPI.post("/api/user/registerUser", {
          userName,
          password,
          email,
        });
        setSuccessMessage(true);
        setFormState({
          userName: "",
          email: "",
          password: "",
          cPassword: "",
          errUserName: "",
          errEmail: "",
          errPassword: "",
          errCPassword: "",
        });
        navigate("/Signin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="registration-container">
      <div>
        <form className="registration-form">
          <Link to="/">
            <img
              src={
                "https://www.shutterstock.com/image-vector/vinnytsia-ukraine-june-23-2023-260nw-2321769231.jpg"
              }
              alt="amazonLogoImg"
              className="logo"
            />
          </Link>
          <div className="registration-form-container">
            <h2>Create Account</h2>
            <div>
              <div>
                <p>Your name</p>
                <input
                  name="userName"
                  value={formState.userName}
                  onChange={handleInputChange}
                  type="text"
                  className="input"
                />
                {formState.errUserName && (
                  <p className="error">
                    <span>!</span> {formState.errUserName}
                  </p>
                )}
              </div>
              <div>
                <p>Enter your email</p>
                <input
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  type="email"
                  className="input"
                />
                {formState.errEmail && (
                  <p className="error">
                    <span>!</span> {formState.errEmail}
                  </p>
                )}
              </div>
              <div>
                <p>Password</p>
                <input
                  name="password"
                  value={formState.password}
                  onChange={handleInputChange}
                  type="password"
                  className="input"
                />
                {formState.errPassword && (
                  <p className="error">
                    <span>!</span> {formState.errPassword}
                  </p>
                )}
              </div>
              {!formState.errPassword && (
                <p className="password-requirement">
                  Passwords must be at least 6 characters.
                </p>
              )}
              <div>
                <p>Re-enter password</p>
                <input
                  name="cPassword"
                  value={formState.cPassword}
                  onChange={handleInputChange}
                  type="password"
                  className="input"
                />
                {formState.errCPassword && (
                  <p className="error">
                    <span>!</span> {formState.errCPassword}
                  </p>
                )}
              </div>
              <button onClick={handleRegistration} className="registration-btn">
                Continue
              </button>
              {successMessage && (
                <div>
                  <p className="success-message">Successfully registered</p>
                  <Link to="/SignIn">
                    <span>Sign in</span>
                  </Link>
                </div>
              )}
              <p>
                By creating, you agree to Amazon's {""}
                <span>Conditions of Use</span> and <span>Privacy Notice.</span>
              </p>
              <span className="separator"></span>
              <div className="registration-sign-in-container">
                <div className="registration-already-have-an-account">
                  <p>Already have an account?</p>
                  <Link className="registration-sign-in-link" to="/Signin">
                    <span>Sign in</span>
                  </Link>
                </div>
                <p>
                  Buying for work? <span>Create a free business account</span>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* FOOTER */}
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

export default Registration;
