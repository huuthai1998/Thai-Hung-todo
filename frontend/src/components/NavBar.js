import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faUserCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Avatar from "../assets/avatar.jpeg";
import Logo from "../assets/Logo.png";

import { useAuthContext } from "../contexts/authStore";

export default function NavBar() {
  const { authContext, setToken, setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken("");
    setUser({});
    Cookies.remove("token");
    navigate("/welcome");
  };

  const onClickLogo = () => {
    if (!authContext.token) navigate("/welcome");
    else navigate("/");
  };

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
          <div className="rounded-full h-10 w-10">
            <img
              src={
                authContext.user.avatar?.length > 1
                  ? authContext.user.avatar
                  : Avatar
              }
              alt="user avatar"
              className="rounded-full h-10 w-10 object-cover"
            />
          </div>
          <div className="dropdown group inline-block relative">
            <button className="text-gray-700 font-semibold px-2 items-center">
              <FontAwesomeIcon icon={faChevronDown} color="#42464B" />
            </button>
            <ul className="dropdown-menu z-10 group-hover:block absolute hidden rounded-md border border-gray-200 bg-white right-0">
              <li className="hover:bg-gray-200 p-1">
                <Link
                  to="/account"
                  className="text-base text-black hover:text-black w-28"
                >
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="mx-2 text-gray-600"
                  />
                  Details
                </Link>
              </li>
              <li className="hover:bg-gray-200 p-1">
                <div onClick={handleLogout} className="text-base w-28">
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="mx-2 text-gray-600"
                  />
                  Log out
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
