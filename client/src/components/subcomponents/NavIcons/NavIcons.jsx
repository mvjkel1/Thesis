import React from "react";

import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

const NavIcons = () => {
  return (
    <div className="navIcons">
      <Link to="../home">
        <img src={""} alt="" />
      </Link>
      <UilSetting />
      <img src={"Noti"} alt="" />
      <Link to="../chat">
        <img src={"Comment"} alt="" />
      </Link>
    </div>
  );
};

export default NavIcons;
