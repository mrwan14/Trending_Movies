import axios from "axios";
import React, { useEffect, useState } from "react";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function getUserData(e) {
    let myUser = { ...user }; ///deep copy
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submitLoginForm(e) {
    e.preventDefault();
    setisLoading(true);
    let validateResulte = validateLoginForm();
    if (validateResulte.error) {
      setErrorList(validateResulte.error.details);
      setisLoading(false);
    } else {
      let { data } = await axios.post(
        "https://movies-api.routemisr.com/signin",
        user
      );
      if (data.message === "success") {
        setisLoading(false);
        localStorage.setItem("userToken", data.token);
        props.saveUserData();
        ///navigate to home
        navigate("/home");
      } else {
        setError(data.message);
        setisLoading(false);
      }
    }

    function validateLoginForm() {
      let schema = Joi.object({
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
        <h2>LOGIN</h2>
        {errorList.map((error, i) =>
          i === 1 ? (
            <div className="alert py-2 alert-danger">password invalid</div>
          ) : (
            <div className="alert py-2 alert-danger">{error.message}</div>
          )
        )}

        {error.length ? <div className="alert alert-danger">{error}</div> : ""}

        <form onSubmit={submitLoginForm}>
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
              "LOGIN"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
