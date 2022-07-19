import React, { useState } from "react";
import InputBox from "../components/InputBox/InputBox";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../contexts/authStore";
import axios from "axios";
import { useNavigate } from "react-router";

export default function SignupPage() {
  const [info, setInfo] = useState({});
  const [error, setError] = useState("");
  const { setToken } = useAuthContext();
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;
    setInfo({ ...info, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (info.confirmPassword !== info.password)
        throw Error(`Passwords don't match`);
      const { data } = await axios.post("/user/signup", {
        email: info.email,
        password: info.password,
      });
      setToken(data.token);
      axios.defaults.headers.common.authorization = `Bearer ${data.token}`;
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    }
  };

  return (
    <div className="h-screen items-center flex justify-center align-middle w-screen">
      <form action="submit" className="loginBox w-[450px]">
        <h1 className="font-sans font-bold text-center mb-8 text-3xl">
          CREATE AN ACCOUNT
        </h1>
        <InputBox
          name="username"
          placeholder={"Username"}
          icon={faUser}
          onChangeHandler={onChangeHandler}
        />
        <InputBox
          name="email"
          placeholder={"Email"}
          icon={faEnvelope}
          onChangeHandler={onChangeHandler}
        />
        <InputBox
          type="password"
          name="password"
          placeholder={"Password"}
          icon={faLock}
          onChangeHandler={onChangeHandler}
        />
        <InputBox
          type="password"
          name="confirmPassword"
          placeholder={"Confirm password"}
          icon={faLock}
          onChangeHandler={onChangeHandler}
        />
        {error.length > 0 && <div className="text-red-400 mb-5">{error}</div>}
        <button
          onClick={submitHandler}
          className="cursor text-center bg-[#DB4C3F] w-full py-3 rounded-md text-white text-xl"
        >
          Register
        </button>
      </form>
    </div>
  );
}
