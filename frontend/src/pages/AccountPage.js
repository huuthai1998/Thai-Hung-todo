import React, { useEffect, useState } from "react";
import Avatar from "../assets/rose.webp";
import axios from "axios";
import { useAuthContext } from "../contexts/authStore";

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

export default function AccountPage() {
  const { authContext } = useAuthContext();
  const [info, setInfo] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    setInfo(authContext.user);
  }, [authContext.user]);

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;
    setInfo({ ...info, [name]: value });
  };

  const updateUsername = async () => {
    try {
      await axios.put("/user", { username: info.username });
      alert("Successfully changed your user name");
    } catch (err) {
      setError(err.message);
    }
  };

  const changePassword = async () => {
    try {
      if (info.confirmPassword !== info.newPassword)
        throw Error(`Passwords don't match`);
      await axios.put("/user", {
        oldPassword: info.password,
        newPassword: info.newPassword,
      });
      alert("Successfully changed your password");
    } catch (err) {
      alert(err.response.data.message || err.message);
    }
  };

  return (
    <div className="h-screen w-screen p-10">
      <h1 className="font-bold text-3xl mb-10">Your account</h1>
      <div className="flex items-center mb-10">
        <div className="rounded-full h-24 w-24 mr-4">
          <img
            src={Avatar}
            alt="User Avatar"
            className="rounded-full h-24 w-24 object-cover"
          />
        </div>
        <button className="font-semibold bg-[#EEEEEE] border-[#EEEEEE] border rounded-md w-[120px] p-1 mr-5">
          Change avatar
        </button>
        <button className="font-semibold border-[#DB4C3F] border rounded-md w-[120px] p-1 text-[#DB4C3F]">
          Remove avatar
        </button>
      </div>
      <InputAccount
        defaultValue={info.username}
        buttonAction={updateUsername}
        buttonName={"Update"}
        name="username"
        placeholder={"User name"}
        label={"User name"}
        onChangeHandler={onChangeHandler}
      />
      <InputAccount
        defaultValue={info.email}
        disabled={true}
        className="bg-gray-200 disabled"
        name="email"
        placeholder={"Email"}
        label={"Email"}
        onChangeHandler={onChangeHandler}
      />
      <InputAccount
        type="password"
        name="password"
        placeholder={"Current password"}
        label={"Password"}
        onChangeHandler={onChangeHandler}
      />
      <InputAccount
        type="password"
        name="newPassword"
        placeholder={"New password"}
        onChangeHandler={onChangeHandler}
      />
      <InputAccount
        type="password"
        name="confirmPassword"
        placeholder={"Confirm new password"}
        onChangeHandler={onChangeHandler}
        buttonAction={changePassword}
        buttonName={"Change password"}
      />
    </div>
  );
}
