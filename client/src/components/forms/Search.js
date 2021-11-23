import React from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <>
      <form className="form-inline my-3 my-lg-6 " onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Search any product..."
          value={text}
          className="form-control mr-sm-2"
          onChange={handleChange}
        />
        <SearchOutlined
          onClick={handleSubmit}
          style={{ cursor: "pointer", margin: "-12px" }}
        />
      </form>
    </>
  );
};

export default Search;
