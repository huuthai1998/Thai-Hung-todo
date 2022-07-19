import React, { useEffect } from "react";
import { useTodoContext } from "../../contexts/store";
import Avatar from "../../assets/rose.webp";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Dropdown, Menu, Space } from "antd";
import "antd/dist/antd.css";

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <div>
            <FontAwesomeIcon icon="fa-solid fa-user" />
            Details
          </div>
        ),
      },
      {
        key: "2",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            Log out
          </a>
        ),
      },
    ]}
  />
);

export default function NavBar() {
  const { authContext } = useTodoContext();

  return (
    <div className="navbar-wrapper bg-red-500">
      <div className="navbar-logo text-3xl font-bold underline text-red-500">
        LOGGO
      </div>
      {authContext.token ? (
        <div className="buttons-wrapper">
          <button className="login">Log in</button>
          <button className="signup">Sign up</button>
        </div>
      ) : (
        <div className="flex items-center mr-[40px] relative">
          <div className="mr-5 font-semibold">Han Jisoo</div>
          <div className="rounded-full h-10 w-10 mr-2">
            <img
              src={Avatar}
              alt="User Avatar"
              className="rounded-full h-10 w-10"
            />
          </div>
          <Dropdown overlay={menu} placement="bottomRight">
            <FontAwesomeIcon icon={faChevronDown} color="rgba(0, 0, 0, 0.54)" />
          </Dropdown>
        </div>
      )}
    </div>
  );
}
