import React, { createRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import Avatar from "../assets/rose.webp";
import { notification } from "antd";

import { useAuthContext } from "../contexts/authStore";
import Spinner from "../components/Spinner";

const InputAccount = ({
  type,
  defaultValue,
  buttonName,
  buttonAction,
  disabled,
  className,
  name,
  label,
  placeholder,
  onChangeHandler,
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className={`font-bold mb-2`}>
          {label}
        </label>
      )}
      <div className="flex w-full h-12 mb-5">
        <input
          defaultValue={defaultValue}
          disabled={disabled}
          type={type || "text"}
          className={`${className} h-full w-[500px] border items-center  rounded-md font-medium text-base px-4 py-2`}
          name={name}
          placeholder={placeholder}
          onChange={onChangeHandler}
        />
        {buttonName && (
          <button
            onClick={buttonAction}
            className="ml-5 w-64 font-semibold bg-[#EEEEEE] border-[#EEEEEE] border rounded-md h-full"
          >
            {buttonName}
          </button>
        )}
      </div>
    </div>
  );
};

const CHANGE_OPTIONS = {
  AVATAR: "AVATAR",
  USERNAME: "USERNAME",
  PASSWORD: "PASSWORD",
};

export default function AccountPage() {
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [option, setOption] = useState("");

  const { authContext, setUser } = useAuthContext();

  const uploadImgButton = createRef(null);

  useEffect(() => {
    if (!authContext.token && !Cookies.get("token")) navigate("/welcome");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.token]);

  useEffect(() => {
    setInfo({ ...info, ...authContext.user });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.user]);

  const onInputChangeHandler = (e) => {
    const { name, value } = e.currentTarget;
    setInfo({ ...info, [name]: value });
  };

  const changeUsername = async () => {
    try {
      await axios.put("/user", { username: info.username });
      notification.info({
        message: "Successfully changed your user name",
        placement: "top",
        duration: 2,
      });
      setUser({ ...authContext.user, username: info.username });
    } catch (err) {
      notification.error({
        message: err.response?.data?.message || err.message,
        placement: "top",
      });
    }
  };

  const changePassword = async () => {
    try {
      if (info.password?.length === 0 || info.newPassword?.length === 0)
        throw new Error("Please input your passwords");
      if (info.confirmPassword !== info.newPassword)
        throw new Error("Passwords don't match");
      await axios.put("/user", {
        oldPassword: info.password,
        newPassword: info.newPassword,
      });
      notification.info({
        message: "Successfully changed your password",
        placement: "top",
        duration: 2,
      });
    } catch (err) {
      notification.error({
        message: err.response?.data?.message || err.message,
        placement: "top",
      });
    }
  };

  const changeAvatar = async () => {
    // setSelectedImage(event.target.files[0]);
    try {
      await axios.put("/user", { avatar: imageFile });
    } catch (err) {
      notification.error({
        message: err.response?.data?.message || err.message,
        placement: "top",
      });
    }
  };

  const submitHandler = (event, opt) => {
    event.preventDefault();
    if (event.target?.files?.[0]) {
      setImageFile(event.target.files[0]);
    }
    setOption(opt);
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      // setTimeout(() => {
      setLoading(false);
      switch (option) {
        case CHANGE_OPTIONS.AVATAR:
          changeAvatar();
          break;
        case CHANGE_OPTIONS.USERNAME:
          changeUsername();
          break;
        case CHANGE_OPTIONS.PASSWORD:
          changePassword();
          break;
        default:
          console.log("nothing change");
      }
      // }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div className="h-screen w-screen p-10">
      {loading && <Spinner />}
      <h1 className="font-semibold text-3xl mb-10">Your account</h1>
      <div className="flex items-center mb-10">
        <div className="rounded-full h-24 w-24 mr-6">
          <img
            src={Avatar}
            alt="User Avatar"
            className="rounded-full h-24 w-24 object-cover"
          />
        </div>
        <input
          ref={uploadImgButton}
          style={{ display: "none" }}
          type="file"
          name="myImage"
          onChange={(event) => submitHandler(event, CHANGE_OPTIONS.AVATAR)}
        />
        <button
          onClick={() => uploadImgButton.current.click()}
          className="font-semibold bg-[#EEEEEE] border-[#EEEEEE] border-2 rounded-md py-1 px-2 mr-5"
        >
          Change avatar
        </button>
        <button className="font-semibold border-xred border rounded-md px-2 py-1 text-xred">
          Remove avatar
        </button>
      </div>
      <InputAccount
        defaultValue={info.username}
        buttonAction={(event) => submitHandler(event, CHANGE_OPTIONS.USERNAME)}
        buttonName={"Update"}
        name="username"
        placeholder={"User name"}
        label={"User name"}
        onChangeHandler={onInputChangeHandler}
      />
      <InputAccount
        defaultValue={info.email}
        disabled={true}
        className="bg-gray-200 disabled"
        name="email"
        placeholder={"Email"}
        label={"Email"}
      />
      <InputAccount
        type="password"
        name="password"
        placeholder={"Current password"}
        label={"Password"}
        onChangeHandler={onInputChangeHandler}
      />
      <InputAccount
        type="password"
        name="newPassword"
        placeholder={"New password"}
        onChangeHandler={onInputChangeHandler}
      />
      <InputAccount
        type="password"
        name="confirmPassword"
        placeholder={"Confirm new password"}
        onChangeHandler={onInputChangeHandler}
        buttonAction={(event) => submitHandler(event, CHANGE_OPTIONS.PASSWORD)}
        buttonName={"Change password"}
      />
    </div>
  );
}
