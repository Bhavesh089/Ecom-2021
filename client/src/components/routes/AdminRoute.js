import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRrdirect";
import { currentAdmin } from "../../functions/auth";

const AdminRoute = ({ children, ...rest }) => {
  //get user
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  //check user after component renders
  useEffect(() => {
    //check ADMIN
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("currentAdmin", res);
          setOk(true);
        })
        .catch((err) => {
          console.log(err);
        });
      setOk(false);
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
