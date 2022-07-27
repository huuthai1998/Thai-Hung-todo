import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import validator from "validator";
import axios from "axios";

import { notification } from "antd";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

import InputBox from "../components/InputBox";
import { useAuthContext } from "../contexts/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const { setToken, authContext } = useAuthContext();

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;
    setInfo({ ...info, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!info.email) {
      notification.error({
        message: "Email can't be empty",
        placement: "top",
      });
      return;
    }
    if (!validator.isEmail(info.email)) {
      notification.error({
        message: "Invalid email",
        placement: "top",
      });
      return;
    }
    if (!info.password) {
      notification.error({
        message: "Password can't be empty",
        placement: "top",
      });
      return;
    }
    try {
      const { data } = await axios.post("/user/login", {
        email: info.email,
        password: info.password,
      });
      setToken(data.token);
      // axios.defaults.headers.common.authorization = `Bearer ${data.token}`;
      navigate("/");
    } catch (err) {
      notification.error({
        message: err.response?.data?.message || err.message,
        placement: "top",
      });
    }
  };

  useEffect(() => {
    if (authContext.token.length > 0) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.token]);

  return (
    <div>
      <div className="flex justify-center mt-32">
        <form action="submit" className="loginBox w-[450px]">
          <h1 className="font-sans font-bold text-center mb-10 text-3xl">
            LOG IN TO YOUR ACCOUNT
          </h1>
          <InputBox
            name="email"
            placeholder="Email"
            icon={faEnvelope}
            onChangeHandler={onChangeHandler}
          />
          <InputBox
            type="password"
            name="password"
            placeholder="Password"
            icon={faLock}
            onChangeHandler={onChangeHandler}
          />
          <button
            onClick={submitHandler}
            className="w-full py-3 px-7 mt-2 rounded-md text-xl font-semibold text-lg bg-xred hover:bg-red-500 text-white"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
