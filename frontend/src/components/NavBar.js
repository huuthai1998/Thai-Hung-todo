import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faUserCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Menu } from "antd";
import { useAuthContext } from "../contexts/authStore";
import Avatar from "../assets/rose.webp";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const menu = (handleLogout) => (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <Link to="/account" className="text-base w-28">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="mx-2 text-gray-600"
            />
            Details
          </Link>
        ),
      },
      {
        type: "divider",
      },
      {
        key: "2",
        label: (
          <div onClick={handleLogout} className="text-base w-28">
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="mx-2 text-gray-600"
            />
            Log out
          </div>
        ),
      },
    ]}
  />
);
export default function NavBar() {
  const { authContext, setToken } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken("");
    Cookies.remove("token");
    navigate("/welcome");
  };

  const onClickLogo = () => {
    if (!authContext.token) navigate("/welcome");
    else navigate("/");
  }

  return (
    <nav className="flex justify-between h-[70px] items-center px-10 border-b border-gray-200">
      <button onClick={onClickLogo}>
        <img src={Logo} alt="logo" width="160px" height="55px" />
      </button>

      {!authContext.token ? (
        <div>
          <button
            onClick={() => navigate("/login")}
            className="font-medium text-lg text-black hover:bg-gray-100 rounded-md py-1 px-7"
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="font-semibold text-lg rounded-md py-1 px-7 ml-3 bg-xred hover:bg-red-500 text-white"
          >
            Sign up
          </button>
        </div>
      ) : (
        <div className="flex items-center relative">
          <div className="mr-3 font-semibold">{authContext.user?.username}</div>
          <div className="rounded-full h-10 w-10 mr-2">
            <img
              src={Avatar}
              alt="User Avatar"
              className="rounded-full h-10 w-10 object-cover"
            />
          </div>
          <Dropdown
            overlay={menu(handleLogout)}
            placement="bottomRight"
            className="cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronDown} color="#42464B" />
          </Dropdown>
        </div>
      )}
    </nav>
  );
}
