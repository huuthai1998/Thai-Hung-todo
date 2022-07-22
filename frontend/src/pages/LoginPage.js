import React, { useEffect, useState } from "react";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../contexts/authStore";
import { useNavigate } from "react-router";
import axios from "axios";
import InputBox from "../components/InputBox/InputBox";

export default function LoginPage() {
  const [info, setInfo] = useState({});
  const [error, setError] = useState("");
  const { setToken, authContext } = useAuthContext();
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;
    setInfo({ ...info, [name]: value });
  };

  useEffect(() => {
    if (authContext.token.length > 0) navigate("/ ");
  }, [authContext.token]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/user/login", {
        email: info.email,
        password: info.password,
      });
      setToken(data.token);
      axios.defaults.headers.common.authorization = `Bearer ${data.token}`;
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-32">
        <form action="submit" className="loginBox w-[450px]">
          <h1 className="font-sans font-bold text-center mb-10 text-3xl">
            LOG IN TO YOUR ACCOUNT
          </h1>
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
          {error.length > 0 && <div className="text-red-400 mb-5">{error}</div>}
          <button
            onClick={submitHandler}
            className="w-full py-3 px-7 mt-2 rounded-md text-xl font-semibold text-lg  bg-xred text-white"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
