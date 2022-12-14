import axios from "axios";
import React, { Fragment, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import history from "../history";
import PaymentsButton from "./PaymentsButton";

const ShippingInfoForm = (props) => {
  const buttonRef = useRef(null);

  const { shippingInfo, loggedInUser, setShipping } = props;

  const shippingLocalStorage = localStorage.getItem("shipping")
    ? JSON.parse(localStorage.getItem("shipping"))
    : {};

  const [firstName, setFirstName] = useState(
    shippingInfo.user?.firstName || shippingLocalStorage.firstName || ""
  );
  const [lastName, setLastName] = useState(
    shippingInfo.user?.lastName || shippingLocalStorage.lastName || ""
  );
  const [email, setEmail] = useState(
    shippingInfo.user?.email || shippingLocalStorage.email || ""
  );
  const [address, setAddress] = useState(
    shippingInfo.address || shippingLocalStorage.address || ""
  );
  const [city, setCity] = useState(
    shippingInfo.city || shippingLocalStorage.city || ""
  );
  const [state, setState] = useState(
    shippingInfo.state || shippingLocalStorage.state || ""
  );
  const [country, setCountry] = useState(
    shippingInfo.country || shippingLocalStorage.country || ""
  );
  const [zipCode, setZipCode] = useState(
    shippingInfo.zipcode || shippingLocalStorage.zipCode || ""
  );

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!loggedInUser.id) {
      //   const newUserInfo = {
      //     email,
      //     password: email,
      //     firstName,
      //     lastName,
      //   };
      //   const newUser = await axios.post("/api/users/create", newUserInfo);

      //   const newShippingInfo = {
      //     address,
      //     city,
      //     state,
      //     country,
      //     zipcode: zipCode,
      //     userId: newUser.data.id,
      //   };

      //   const newShipping = await axios.post(
      //     "/api/shipping/create",
      //     newShippingInfo
      //   );

      const newShippingInfo = {
        address,
        city,
        state,
        country,
        zipcode: zipCode,
        email,
        password: email,
        firstName,
        lastName,
      };

      localStorage.setItem("shipping", JSON.stringify(newShippingInfo));
      setShipping();
    } else {
      const updatedShippingInfo = {
        address,
        city,
        state,
        country,
        zipcode: zipCode,
        userId: loggedInUser.id,
      };

      const updatedShipping = await axios.put(
        "/api/shipping/update",
        updatedShippingInfo
      );

      //   fetchShippingThunk(loggedInUser.id);

      const newShippingInfo = {
        address,
        city,
        state,
        country,
        zipcode: zipCode,
        email,
        firstName,
        lastName,
      };

      localStorage.setItem("shipping", JSON.stringify(newShippingInfo));
      setShipping();
    }

    const updatedShippingInfoAndUserInfo = {
      address,
      city,
      state,
      country,
      zipcode: zipCode,
      userId: loggedInUser.id,
      firstName,
      lastName,
      email,
    };

    localStorage.setItem(
      "shipping",
      JSON.stringify(updatedShippingInfoAndUserInfo)
    );

    // history.push("/checkout");
  };

  return (
    <Fragment>
      <Helmet>
        <title>Shipping Details</title>
      </Helmet>

      <div className="d-flex flex-column align-items-center">
        <h1 className="m-4 text-center">
          <strong>Shipping Details</strong>
        </h1>
        <Form onSubmit={submitHandler}>
          <div className="d-block">
            <Form.Group
              className="mb-3 short-input-shipping"
              controlId="firstName"
            >
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={!!loggedInUser.id}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 short-input-shipping"
              controlId="lastName"
            >
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={!!loggedInUser.id}
              />
            </Form.Group>
          </div>

          <div className="d-block">
            <Form.Group className="mb-3 email-input-shipping" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                disabled={!!loggedInUser.id}
              />
            </Form.Group>
          </div>

          <div className="d-block">
            <Form.Group
              className="mb-3 address-input-shipping"
              controlId="address"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
          </div>

          <div className="d-block">
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="zipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </Form.Group>
          </div>

          <div className="d-flex flex-column align-items-center">
            <PaymentsButton buttonRef={buttonRef} />
            <button
              variant="primary"
              type="submit"
              ref={buttonRef}
              className="hide-button"
            ></button>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};

export default ShippingInfoForm;
