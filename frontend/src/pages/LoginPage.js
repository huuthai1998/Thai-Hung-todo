import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import validator from "validator";
import Cookies from "js-cookie";
import axiosInstance from "../service/axiosInstance";

import { notification } from "antd";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

import InputBox from "../components/InputBox";
import Spinner from "../components/Spinner";
import { useAuthContext } from "../contexts/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuthContext();

  const fetchUserInfo = async () => {
    try {
      const { data } = await axiosInstance.get("/user");
      setUser(data.user);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;
    setInfo({ ...info, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  const handleLogin = async () => {
    try {
      if (!info.email) throw new Error("Please enter your email");
      if (!validator.isEmail(info.email)) throw new Error("Invalid email");
      if (!info.password) throw new Error("Please inpput your password");
      const { data } = await axiosInstance.post("/user/login", {
        email: info.email,
        password: info.password,
      });
      Cookies.set("token", data.token);
      await fetchUserInfo();
      navigate("/");
    } catch (err) {
      notification.error({
        message: err.response?.data?.message || err.message,
        placement: "top",
      });
    }
  };

  useEffect(() => {
    if (loading) {
      // setTimeout(() => {
      setLoading(false);
      handleLogin();
      // }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (Cookies.get("token")?.length > 0) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading && <Spinner />}
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
