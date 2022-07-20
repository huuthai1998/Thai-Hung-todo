import React, { useState } from "react";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../contexts/authStore";
import { useNavigate } from "react-router";
import axios from "axios";
import InputBox from "../components/InputBox/InputBox";
import NavBar from "../components/NavBar/NavBar";

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
    <div>
      <NavBar />
      <div className="flex justify-center mt-32">
        <form action="submit" className="loginBox w-[450px]">
          <h1 className="font-sans font-bold text-center mb-10 text-3xl">
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
            className="w-full py-3 px-7 mt-2 rounded-md text-xl font-semibold text-lg  bg-red text-white"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
