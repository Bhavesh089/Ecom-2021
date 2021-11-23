import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getsubCats } from "../../functions/subcat";
import { SyncOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
const SubCatList = () => {
  const [subCat, setsubCat] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getsubCats().then((s) => {
      console.log(s.data.getListsubCat);
      setsubCat(s.data.getListsubCat);
      setLoading(false);
    });
  }, []);

  const showSubCat = () =>
    subCat &&
    subCat.map((s) => (
      <>
        <div className="col-md-4 col text-center" key={s._id}>
          <Link key={s._id} to={`/subCat/${s.slug}`}>
            <Tag color="black" className="tags-class" key={s._id}>
              {`#${s.name}`}
            </Tag>
          </Link>
          {/* <h4>{s.name}</h4> */}
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
    ));

  return (
    <div className="container">
      <div className="row featured-cat">
        {loading ? <SyncOutlined spin className="ml-4 mb-3" /> : showSubCat()}
      </div>
    </div>
  );
};

export default SubCatList;
