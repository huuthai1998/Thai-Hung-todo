import React, { createRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import Avatar from "../assets/rose.webp";
import { notification, Spin } from "antd";
import { useAuthContext } from "../contexts/authStore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);

  const { authContext, setUser } = useAuthContext();

  const uploadImgButton = createRef(null);
  const storage = getStorage();

  useEffect(() => {
    if (!authContext.token && !Cookies.get("token")) navigate("/welcome");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.token]);

  useEffect(() => {
    setInfo({ ...info, ...authContext.user });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.user]);

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;
    setInfo({ ...info, [name]: value });
  };

  const updateUsername = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/user", { username: info.username });
      setUser({ ...authContext.user, username: info.username });
      notification.info({
        message: "Successfully changed your user name",
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

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      if (info.password?.length === 0 || info.newPassword?.length === 0)
        throw Error(`Please input your password`);
      if (info.confirmPassword !== info.newPassword)
        throw Error(`Passwords don't match`);
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

  const handleUpload = async (event) => {
    event.preventDefault();
    // setSelectedImage(event.target.files[0]);
    try {
      const storageRef = ref(storage, event.target.files[0].name);
      // setLoading(true);
      await uploadBytes(storageRef, event.target.files[0]);
      const uploaderUrl = await getDownloadURL(
        ref(storage, event.target.files[0].name)
      );
      await axios.put("/user", { avatar: uploaderUrl });
      setUser({ ...authContext.user, avatar: uploaderUrl });
      // setLoading(false);
      notification.info({
        message: "Successfully updated avatar",
        placement: "top",
      });
    } catch (err) {
      notification.error({
        message: err.response?.data?.message || err.message,
        placement: "top",
      });
    }
  };
  return (
    <div className="h-screen w-screen p-10">
      {/* <Spin
        spinning={loading}
        size="large"
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 24,
              color: "xred",
            }}
            spin
          />
        }
      > */}
      <h1 className="font-semibold text-3xl mb-10">Your account</h1>
      <div className="flex items-center mb-10">
        <div className="rounded-full h-24 w-24 mr-6">
          <img
            src={authContext.user.avatar || Avatar}
            alt="User Avatar"
            className="rounded-full h-24 w-24 object-cover"
          />
        </div>
        <input
          ref={uploadImgButton}
          style={{ display: "none" }}
          type="file"
          name="myImage"
          onChange={handleUpload}
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
      {/* </Spin> */}
    </div>
  );
}
