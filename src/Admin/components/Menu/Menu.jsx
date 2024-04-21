import React from "react";
import { Link } from "react-router-dom";
import "./menu.scss"
import { FaUsers, FaUserAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export const menu = [
    {
      id: 1,
      title: "main",
      listItems: [
        {
          id: 1,
          title: "Dashboard",
          url: "/dashboard",
          icon: MdDashboard,  
        },
        {
          id: 2,
          title: "Profile",
          url: "/profile",
          icon: FaUserAlt,
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
          icon: FaUsers,
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
                                {listItem.icon()}
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
