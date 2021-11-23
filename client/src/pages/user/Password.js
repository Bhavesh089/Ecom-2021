import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { SendOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);

        setPassword("");
        //success NOtification
        toast.success(`Password successfully updated`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const passwordUpdated = () => (
    <form onSubmit={handleSubmit}>
      <div class="advancedSearchTextbox form-group ">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-describedby="Enter Password"
          placeholder="Enter Password"
          disabled={loading}
        />
        <small id="emailHelp" className="form-text text-muted">
          Update Password
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
        disabled={!password || loading}
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
            <h4 Register>UPDATE YOUR PASSWORD</h4>
            <div>{passwordUpdated()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Password;
