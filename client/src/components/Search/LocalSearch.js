import React from "react";
// import { SearchOutlined } from "@ant-design/icons";

const LocalSearch = ({ keyword, setKeyword }) => {
  //handle search
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <div className="form-group addCategory">
      <input
        type="search"
        placeholder="Search"
        value={keyword}
        onChange={handleSearchChange}
        className="form-control mb-4"
      ></input>
    </div>
  );
};

export default LocalSearch;
