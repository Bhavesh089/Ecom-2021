import React, { useState, useEffect } from "react";

import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { SendOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { createUpdateUser } from "../../functions/auth";

const CompleteRegister = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let dispatch = useDispatch();

  //Get email from local storage when redirects to this page
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const { user } = useSelector((state) => ({ ...state }));

  //if user then redirect to homepage
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation
    if (!email || !password) {
      toast.error("Email and Password is Required");
      return;
    }
    if (password.length < 6) {
      toast.error("password must be at least 6 characters long");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        //remove email from localstorage
        window.localStorage.removeItem("emailForRegistration");
        // ger user ID token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        //redux store

        //sending token to create user function
        createUpdateUser(idTokenResult.token)
          .then((res) =>
            //dispatch data
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                _id: res.data._id,
                token: idTokenResult.token,
              },
            })
          )
          .catch((error) => {
            console.log(error);
          });

        // redirect;
        history.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //Register Form
  const completeRegisterForm = () => (
    <>
      <form onSubmit={handleSubmit}>
        <div className="advancedSearchTextbox form-group ">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            aria-describedby="emailHelp"
            placeholder="Enter Email"
            disabled
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="advancedSearchTextbox form-group">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          onClick={handleSubmit}
          type="primary"
          shape="round"
          block
          className="mb-3"
          size="large"
          icon={<SendOutlined />}
          // disabled={!email || password.length < 6}
          ghost
        >
          Submit
        </Button>
      </form>
    </>
  );

  return (
    <>
      <div className="top-box row"></div>
      <div className="container p-5">
        <div className="row">
          <div className="Register md-col-6 offset-md-3">
            <h4>Create New Password </h4>
            {completeRegisterForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompleteRegister;
