import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";
import { SyncOutlined } from "@ant-design/icons";
import { Button } from "antd";
const CategoryList = () => {
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      console.log(c.data.getListCategory);
      setCategories(c.data.getListCategory);
      setLoading(false);
    });
  }, []);

  const showCategories = () => (
    <section className="fotogrid">
      {" "}
      {categories &&
        categories.map((c) => (
          <>
            <div className="tile" key={c.image[0].key}>
              <Link to={`/category/${c.slug}`}>
                <img key={c.image[0].key} src={c.image[0].Location} />
              </Link>
              <h4>{c.name}</h4>
            </div>

            {/* <div class="bottom-left">
              <Button
                // onClick={handleSubmit}
                type="primary"
                shape="round"
                block
                className="add-button "
                size="large"
                // icon={<PlusOutlined />}
                // disabled={!email || password.length < 6}
                ghost
              >
                ADD
              </Button>
            </div> */}
          </>
        ))}
    </section>
  );

  return (
    <div className="container">
      <div className="row featured-cat">
        {loading ? (
          <SyncOutlined spin className="ml-4 mb-3" />
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
