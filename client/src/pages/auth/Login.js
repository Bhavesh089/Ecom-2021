import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { auth, googleAuthProvider } from "../../firebase";

import { toast } from "react-toastify";
import { Button } from "antd";
import { LoginOutlined, GoogleOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

import { useDispatch, useSelector } from "react-redux";

//send user function
import { createUpdateUser } from "../../functions/auth";

const Login = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));

  //user role based redirect
  const roleBaseRedirect = (res) => {
    let intended = location.state;
    console.log(intended, "intended");
    if (intended) {
      history.push(intended.from);
    } else {
      //if user is admin
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        //redirect to home page
        history.push("user/history");
      }
    }
  };

  //if user then redirect to homepage
  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
  }, [user, history]);

  //handle user data  //sign with email password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      //sign with email password
      const result = await auth.signInWithEmailAndPassword(email, password);

      //get user
      const { user } = result;

      //get token
      const idTokenResult = await user.getIdTokenResult();
      //sending token to create user function
      createUpdateUser(idTokenResult.token)
        .then((res) => {
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
          });
          roleBaseRedirect(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  //if
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  //google

  //googleHandlesubmit
  const googleLogin = async () => {
    //sign with popup function
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        //get token
        const idTokenResult = await user.getIdTokenResult();

        //sending token to create user function
        createUpdateUser(idTokenResult.token)
          .then((res) => {
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
            });
            roleBaseRedirect(res);
          })
          .catch((error) => {
            console.log(error);
          });

        //redirect to home page
        history.push("/");
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
    //
  };

  //Register Form
  const loginForm = () => (
    <>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        layout={"vertical"}
        onSubmitCapture={handleSubmit}
      >
        <Form.Item
          label="Email Address"
          name="Email Address"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            className="success-focus"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Button
          onClick={handleSubmit}
          type="primary"
          shape="round"
          block
          className="mb-3"
          size="large"
          icon={<LoginOutlined />}
          disabled={!email || password.length < 6}
          ghost
        >
          Login
        </Button>

        <Button
          onClick={googleLogin}
          type="danger"
          shape="round"
          block
          className="mb-1"
          size="large"
          icon={<GoogleOutlined />}
          ghost
        >
          Login with Google
        </Button>
        <small className="form-text text-muted">Recommended</small>
      </Form>
    </>
  );

  return (
    <>
      <div className="top-box row"></div>
      <div className="container p-5">
        <div className="row">
          <div className="Register md-col-6 offset-md-3">
            <h4>LOGIN</h4>
            <small className="Register">Welcome back!!</small>
            {loginForm()}
            <Link to="/forgotpassword" className="float-right left">
              Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
