import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { SendOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSelector } from "react-redux";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  //if user then redirect to homepage
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //where user want to redirect to.
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);

    //success NOtification
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration.`
    );

    //Save to the local storage
    window.localStorage.setItem("emailForRegistration", email);

    //clear state
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <div class="advancedSearchTextbox form-group ">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
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
  );

  return (
    <>
      <div className="top-box row"></div>
      <div className="container p-5">
        <div className="row">
          <div className="Register md-col-6 offset-md-3">
            <h4>REGISTER</h4>
            {registerForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
