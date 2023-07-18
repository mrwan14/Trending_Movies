import axios from "axios";
import React, { useState } from "react";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: "",
  });
  function getUserData(e) {
    let myUser = { ...user }; ///deep copy
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    console.log(user);
  }
  async function submitRegisterForm(e) {
    e.preventDefault();
    setisLoading(true);
    let validateResulte = validateRegisterForm();
    if (validateResulte.error) {
      setErrorList(validateResulte.error.details);
      setisLoading(false);
    } else {
      let { data } = await axios.post(
        "https://movies-api.routemisr.com//signup",
        user
      );
      if (data.message === "success") {
        setisLoading(false);

        ///navigate to login
        navigate("/login");
      } else {
        setError(data.message);
        setisLoading(false);
      }
    }

    function validateRegisterForm() {
      let schema = Joi.object({
        first_name: Joi.string().alphanum().min(3).max(10).required(),
        last_name: Joi.string().alphanum().min(3).max(10).required(),
        age: Joi.number().min(0).max(100).required(),
        email: Joi.string()
          .required()
          .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: Joi.string(),
      });
      return schema.validate(user, { abortEarly: false });
    }
  }

  return (
    <>
      <div className="w-75 mx-auto">
        <h2>Register now</h2>
        {errorList.map((error, i) =>
          i === 4 ? (
            <div className="alert py-2 alert-danger">password invalid</div>
          ) : (
            <div className="alert py-2 alert-danger">{error.message}</div>
          )
        )}

        {error.length ? <div className="alert alert-danger">{error}</div> : ""}

        <form onSubmit={submitRegisterForm}>
          <label htmlFor="first_name">First_name</label>
          <input
            onChange={getUserData}
            className="form-control mb-2"
            id="first_name"
            name="first_name"
          ></input>

          <label htmlFor="last_name">Last_name</label>
          <input
            onChange={getUserData}
            className="form-control mb-2"
            id="last_name"
            name="last_name"
          ></input>

          <label htmlFor="age">Age</label>
          <input
            onChange={getUserData}
            type="number"
            className="form-control mb-2"
            id="age"
            name="age"
          ></input>

          <label htmlFor="email">Email</label>
          <input
            onChange={getUserData}
            type="email"
            className="form-control mb-2"
            id="email"
            name="email"
          ></input>

          <label htmlFor="password">Password</label>
          <input
            onChange={getUserData}
            type="password"
            className="form-control mb-2"
            id="password"
            name="password"
          ></input>

          <button type="submit" className="btn btn-outline-info ">
            {isLoading === true ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
