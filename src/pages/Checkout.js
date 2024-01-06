import React, { useEffect, useState } from "react";
import "../styles/Checkout.css";
import logo from "../assets/amazonLogoDark.svg";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getReduxCartItems,
  handleRemoveOptimisticProduct,
  removeCartItem,
} from "../redux/slices/userSlice";

const countryOptions = [
  { value: "UnitedStates", label: "United States" },
  { value: "Switzerland", label: "Switzerland" },
  { value: "Italy", label: "Italy" },
  { value: "Denmark", label: "Denmark" },
];

const Checkout = () => {
  const { data } = useSelector((state) => state.user.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);
  const [successMessage, setSuccessMessage] = useState({
    addres: false,
    card: false,
  });
  const [formState, setFormState] = useState({
    userName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    country: "",
    cardNumber: "",
    code: "",
    expDate: "",
    errUserName: "",
    errPhone: "",
    errAddress: "",
    errCity: "",
    errState: "",
    errZip: "",
    errCardName: "",
    errCountry: "",
    errCardNumber: "",
    errCode: "",
    errExpDate: "",
  });

  useEffect(() => {
    dispatch(getReduxCartItems());
  }, []);

  const handleChangeCountry = (selectedOption) => {
    setSelectedOption(selectedOption);
    setFormState((prevState) => ({
      ...prevState,
      country: selectedOption,
      errCountry: "",
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      [`err${name.charAt(0).toUpperCase() + name.slice(1)}`]: "",
    }));
  };

  const handleCheckInput = (e) => {
    e.preventDefault();

    const {
      userName,
      phone,
      address,
      city,
      state,
      zip,
      cardName,
      country,
      cardNumber,
      code,
      expDate,
    } = formState;

    if (!userName) {
      setFormState((prevState) => ({
        ...prevState,
        errUserName: "Enter your name",
      }));
    }

    if (!phone) {
      setFormState((prevState) => ({
        ...prevState,
        errPhone: "Enter your phone number",
      }));
    }

    if (!address) {
      setFormState((prevState) => ({
        ...prevState,
        errAddress: "Enter your address",
      }));
    }

    if (!city) {
      setFormState((prevState) => ({
        ...prevState,
        errCity: "Enter your city",
      }));
    }

    if (!state) {
      setFormState((prevState) => ({
        ...prevState,
        errState: "Enter the state",
      }));
    }

    if (!zip) {
      setFormState((prevState) => ({
        ...prevState,
        errZip: "Enter your zip code",
      }));
    }

    if (!cardName) {
      setFormState((prevState) => ({
        ...prevState,
        errCardName: "Enter your card name",
      }));
    }

    if (!cardNumber) {
      setFormState((prevState) => ({
        ...prevState,
        errCardNumber: "Enter your card number",
      }));
    }

    if (!code) {
      setFormState((prevState) => ({
        ...prevState,
        errCode: "Enter card code",
      }));
    }

    if (!expDate) {
      setFormState((prevState) => ({
        ...prevState,
        errExpDate: "Enter card exp.date",
      }));
    }

    if (
      userName &&
      phone &&
      address &&
      city &&
      state &&
      zip &&
      cardNumber &&
      code &&
      expDate
    ) {
      setSuccessMessage((prev) => ({ ...prev, address: true }));
      alert("Your purchase was successful");

      Object.keys(data).forEach((productId) => {
        dispatch(handleRemoveOptimisticProduct(productId));
        dispatch(removeCartItem(productId));
      });

      navigate("/ecommerce-project");
    }
  };

  const totalprice = Object.values(data).reduce((accumulator, product) => {
    return accumulator + product.price;
  }, 0);

  return (
    <form className="checkout">
      <div className="checkout-container">
        <Link to="/ecommerce-project">
          <img src={logo} alt="amazonLogo" className="checkout-logo" />
        </Link>
        <div className="checkout-container">
          <p className="checkout-items-count">
            Checkout ({Object.values(data).length} item)
          </p>
          <p className="checkout-items-text">${totalprice.toFixed(2)}</p>
        </div>
      </div>

      <div className="checkout-address-container">
        <p className="checkout-shipping-address-method">
          1 Choose a shipping address
        </p>
        <div className="checkout-second-container">
          <p className="checkout-shipping-address">Your addresses</p>
          <p className="checkout-empty-element"></p>

          {/* country */}
          <div>
            <p className="checkout-label">Country/Region</p>
            <Select
              value={selectedOption}
              onChange={handleChangeCountry}
              options={countryOptions}
              placeholder="Select a country"
            />
            {formState.errCountry && (
              <p className="checkout-error-container">
                <span className="checkout-error-text">!</span>{" "}
                {formState.errCountry}
              </p>
            )}
          </div>

          {/* user name */}
          <div>
            <p className="checkout-label">Full name (First and Last name)</p>
            <input
              name="userName"
              value={formState.userName}
              onChange={handleInputChange}
              type="text"
              className="checkout-username-input"
            />
            {formState.errUserName && (
              <p className="checkout-error-container">
                <span className="checkout-error-text">!</span>{" "}
                {formState.errUserName}
              </p>
            )}
          </div>

          {/* phone num */}
          <div>
            <p className="checkout-label">Phone number</p>
            <input
              name="phone"
              value={formState.phone}
              onChange={handleInputChange}
              type="text"
              className="checkout-phone-input"
            />
            {formState.errPhone && (
              <p className="checkout-error-container">
                <span className="checkout-error-text">!</span>{" "}
                {formState.errPhone}
              </p>
            )}
            <p className="checkout-phone-helper-text">
              May be used to assist delivery
            </p>
          </div>

          {/* address */}
          <div>
            <p className="checkout-label">Address</p>
            <input
              name="address"
              value={formState.address}
              onChange={handleInputChange}
              type="text"
              className="checkout-address-input"
              placeholder="Street address pr P.O. Box"
            />
            {formState.errAddress && (
              <p className="checkout-error-container">
                <span className="checkout-error-text">!</span>{" "}
                {formState.errAddress}
              </p>
            )}
            <input
              type="text"
              className="checkout-address-details-input"
              placeholder="Apt suite, unit, building, floor, etc. (optional)"
            />
          </div>

          {/* city */}
          <div className="checkout-city-container">
            <div className="checkout-city-input-container">
              <p className="checkout-label">City</p>
              <input
                name="city"
                value={formState.city}
                onChange={handleInputChange}
                type="text"
                className="checkout-city-input"
              />
              {formState.errCity && (
                <p className="checkout-error-container">
                  <span className="checkout-error-text">!</span>{" "}
                  {formState.errCity}
                </p>
              )}
            </div>
            <div className="checkout-state-container">
              <div className="checkout-state-input-element">
                <p className="checkout-label">State</p>
                <input
                  name="state"
                  value={formState.state}
                  onChange={handleInputChange}
                  type="text"
                  className="checkout-state-input"
                />
                {formState.errState && (
                  <p className="checkout-error-container">
                    <span className="checkout-error-text">!</span>{" "}
                    {formState.errState}
                  </p>
                )}
              </div>
              <div className="checkout-zip-container">
                <p className="checkout-label">Zip</p>
                <input
                  name="zip"
                  value={formState.zip}
                  onChange={handleInputChange}
                  type="text"
                  className="checkout-zip-input"
                />
                {formState.errZip && (
                  <p className="checkout-error-container">
                    <span className="checkout-error-text">!</span>{" "}
                    {formState.errZip}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button className="checkout-address-btn" onClick={handleCheckInput}>
            Use this address
          </button>
          {successMessage.addres && (
            <p className="checkout-saved-btn">Succesfully saved</p>
          )}
        </div>

        {/* section two. payment method */}
        <p className="checkout-payment-method-text">2 Payment method</p>
        <div className="checkout-payment-method-container">
          <p className="checkout-payment-method-text">Credit or Debit card</p>
          <p className="checkout-payment-method-empty-container"></p>

          {/* card name */}
          <div>
            <p className="checkout-card-name-text">Name on card</p>
            <input
              name="cardName"
              value={formState.cardName}
              onChange={handleInputChange}
              type="text"
              className="checkout-card-name-input"
              placeholder="Ex: John Mccann"
            />
            {formState.errCardName && (
              <p className="checkout-error-container">
                <span className="checkout-error-text">!</span>{" "}
                {formState.errCardName}
              </p>
            )}
          </div>

          {/* card number */}
          <div>
            <p className="checkout-card-name-text">Card Number</p>
            <input
              type="number"
              name="cardNumber"
              value={formState.cardNumber}
              onChange={handleInputChange}
              className="checkout-card-number-input noArrowInput"
              placeholder="Enter card number"
            />
            {formState.errCardNumber && (
              <p className="checkout-error-container">
                <span className="checkout-error-text">!</span>{" "}
                {formState.errCardNumber}
              </p>
            )}
          </div>

          {/* exp. date & code */}
          <div className="checkout-exp-date-container">
            <div className="checkout-exp-date">
              <p className="checkout-card-name-text">Exp. date</p>
              <input
                name="expDate"
                value={formState.expDate}
                onChange={handleInputChange}
                className="checkout-exp-date-input noArrowInput"
              />
              {formState.errExpDate && (
                <p className="checkout-error-container">
                  <span className="checkout-error-text">!</span>{" "}
                  {formState.errExpDate}
                </p>
              )}
            </div>

            <div className="checkout-security-code-container">
              <p className="checkout-card-name-text">Security code(CVC/CVV)</p>
              <input
                name="code"
                value={formState.code}
                onChange={handleInputChange}
                className="checkout-security-code-input noArrowInput"
              />
              {formState.errCode && (
                <p className="checkout-error-container">
                  <span className="checkout-error-text">!</span>{" "}
                  {formState.errCode}
                </p>
              )}
            </div>
          </div>

          <button className="checkout-proceed-btn" onClick={handleCheckInput}>
            Proceed
          </button>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
