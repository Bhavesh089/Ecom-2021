import React, { useState } from "react";
import LeftMenu from "./LeftMenu";

import { Drawer, Button } from "antd";
import Search from "../forms/Search";

const Header = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav className="menuBar ">
      <div className="logo">
        <img src={require("../../assets/logos/abeoz.jpg")} alt="ABEOZ"></img>
        <span>ABEOZ</span>
      </div>

      <div className="menuCon">
        <div className="leftMenu">
          <LeftMenu mode={"horizontal"} rightMenu={"rightMenu"} />
        </div>
        <Button className="barsMenu" type="primary" onClick={showDrawer}>
          <span className="barsBtn"></span>
        </Button>

        <div className="ml-3">
          <Search />
        </div>

        <Drawer
          title="ABEOZ"
          placement="right"
          closable={false}
          onClose={onClose}
          className="my-drawer"
          visible={visible}
        >
          <LeftMenu mode={"vertical"} rightMenu={"Drawer"} />
        </Drawer>
      </div>
    </nav>
  );
};

export default Header;
