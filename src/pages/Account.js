import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { updateUserData } from "../api/services/updateUserData";
import "../styles/Account.css";       
import { useDispatch, useSelector } from "react-redux";
import { handleLogin, handleLogout } from "../redux/slices/userSlice";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
const Account = () => {
  const { nameid } = useSelector((state) => state.user);

  const [inputFields, setInputFields] = useState({
    id: nameid,
    userName: "",
    email: "",
    newPassword: "",
  });

  const [view, setview] = useState(false);

  const dispach = useDispatch();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputFields({ ...inputFields, [name]: value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (
      !inputFields.userName ||
      !inputFields.email ||
      !inputFields.newPassword
    ) {
      alert("Please fill in all fields");
    } else if (inputFields.newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
    } else {
      const { data } = await updateUserData(inputFields);
      if (data.jwt) {
        localStorage.removeItem("token");
        localStorage.setItem("token", data.jwt);
        console.log(data);
        const decoded = jwt_decode(data.jwt);
        dispach(handleLogin(decoded));
        alert("Account details updated");
        setInputFields({
          userName: "",
          email: "",
          newPassword: "",
        });
      } else {
        alert("Something went wrong");
      }
    }
  };

  const handleLogoutUser = () => {
    dispach(handleLogout());
  };

  return (
    <div>
      <div className="account-container">
        <form className="account-form">
          <h2>Your Account</h2>
          <div className="input-container">
            <div className="label">
              <p className="text-md font-semibold">Name:</p>
            </div>
            <div className="input-field">
              <input
                name="userName"
                value={inputFields.userName}
                type="name"
                onChange={handleChangeInput}
              />
            </div>
          </div>

          <div className="input-container">
            <div className="label">
              <p className="text-md font-semibold">Email:</p>
            </div>
            <div className="input-field">
              <input
                name="email"
                value={inputFields.email}
                type="email"
                onChange={handleChangeInput}
              />
            </div>
          </div>

          <div className="input-container">
            <div className="label">
              <p className="text-md font-semibold">Old/New Password:</p>
            </div>
            <div className="input-field">
              <input
                name="newPassword"
                value={inputFields.newPassword}
                type={view ? "text" : "password"}
                onChange={handleChangeInput}
              />
              <RemoveRedEyeOutlinedIcon
                style={{ cursor: "pointer" }}
                onClick={() => setview(!view)}
              />
            </div>
          </div>

          <div className="btn-container">
            <button className="btn btn-save" onClick={handleSaveChanges}>
              Save Changes
            </button>
            <button className="btn btn-logout" onClick={handleLogoutUser}>
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;
