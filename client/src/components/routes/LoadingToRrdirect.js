import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let history = useHistory();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    //redirect once equal
    count === 0 && history.push("/");

    //clean
    return () => clearInterval(interval);
  }, [count]);
  return (
    <div className="loader container p-5 text-center">
      <p>Ops, Redirecting you in {count} seconds</p>
    </div>
  );
};

export default LoadingToRedirect;
