import React, { useEffect } from "react";
import { useAuthContext } from "../../contexts/authStore";
import Avatar from "../../assets/rose.webp";
import Logo from "../../assets/Logo.png";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Dropdown, Menu, Space } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router";

const menu = (handleLogout) => (
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
        label: <div onClick={handleLogout}>Log out</div>,
      },
    ]}
  />
);
export default function NavBar() {
  const { authContext, setToken } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken("");
    navigate("/login");
  };

  return (
    <div className="navbar-wrapper bg-red-500">
      <div className="navbar-logo text-3xl font-bold underline text-red-500">
        <img src={Logo} alt="logo" />
      </div>
      {!authContext?.token.length > 0 ? (
        <div className="buttons-wrapper">
          <button className="login" onClick={() => navigate("/login")}>
            Log in
          </button>
          <button className="signup" onClick={() => navigate("/signup")}>
            Sign up
          </button>
        </div>
      ) : (
        <div className="flex items-center mr-[40px] relative">
          <div className="mr-5 font-semibold">Han Jisoo</div>
          <div className="rounded-full h-10 w-10 mr-2">
            <img
              src={Avatar}
              alt="User Avatar"
              className="rounded-full h-10 w-10 object-cover"
            />
          </div>
          <Dropdown overlay={menu(handleLogout)} placement="bottomRight">
            <FontAwesomeIcon icon={faChevronDown} color="rgba(0, 0, 0, 0.54)" />
          </Dropdown>
        </div>
      )}
    </div>
  );
}
