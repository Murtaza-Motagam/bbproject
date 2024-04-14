import React from "react";
import { Link } from "react-router-dom";
import "./menu.scss";
import AnalyticsSvg from "../../../assets/svg/analytics.svg";
import Profile from "../../../assets/svg/user.svg";
// import { menu } from "../../data.ts";

export const menu = [
    {
      id: 1,
      title: "main",
      listItems: [
        {
          id: 1,
          title: "Profile",
          url: "/profile",
          icon: Profile,
        },
      ],
    },
    {
      id: 2,
      title: "Department",
      listItems: [
        {
          id: 1,
          title: "Users",
          url: "/users",
          icon: Profile,
        },
      ],
    },
   
    
  ];

const Menu = () => {
    return (
        <>
            <div className="menu">
                {menu.map((item) => (
                    <div className="item" key={item.id}>
                        <span className="title">{item.title}</span>
                        {item.listItems.map((listItem) => (
                            <Link to={listItem.url} className="listItem" key={listItem.id}>
                                <img src={listItem.icon} alt="" />
                                <span className="listItemTitle">{listItem.title}</span>
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Menu;
