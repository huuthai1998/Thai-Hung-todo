import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faUserCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Menu } from "antd";
import { useAuthContext } from "../../contexts/authStore";
import Avatar from "../../assets/rose.webp";
import Logo from "../../assets/Logo.png";

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <a target="_blank" rel="noopener noreferrer" href="/" className="text-base p-4">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="mr-2 text-gray-600"
            />
            Details
          </a>
        ),
      },
      {
        type: "divider",
      },
      {
        key: "2",
        label: (
          <a target="_blank" rel="noopener noreferrer" href="/" className="text-base p-4">
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="mr-2 text-gray-600"
            />
            Log out
          </a>
        ),
      },
    ]}
  />
);

export default function NavBar() {
  const { authContext } = useAuthContext();

  return (
    <nav className="flex justify-between h-[70px] items-center px-10 border-b border-gray-200">
      <div>
        <img src={Logo} alt="logo" width="160px" height="55px" />
      </div>
      {authContext.token ? (
        <div className="flex justify-end items-center">
          <button className="font-semibold text-lg border-b border-gray-200 rounded-md py-1 px-7 bg-gray-200 text-black">
            Log in
          </button>
          <button className="font-semibold text-lg border-b border-red rounded-md py-1 px-7 ml-7 bg-red text-white">
            Sign up
          </button>
        </div>
      ) : (
        <div className="flex items-center relative">
          <div className="mr-3 font-semibold">Han Jisoo</div>
          <div className="rounded-full h-10 w-10 mr-2">
            <img
              src={Avatar}
              alt="User Avatar"
              className="rounded-full h-10 w-10 object-cover"
            />
          </div>
          <Dropdown overlay={menu} placement="bottomRight">
            <FontAwesomeIcon icon={faChevronDown} color="#42464B" />
          </Dropdown>
        </div>
      )}
    </nav>
  );
}
