import React, { createRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./InputBox.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function InputBox({
  type,
  icon,
  placeholder,
  name,
  onChangeHandler,
}) {
  const inputRef = createRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const onShowPassword = () => {
    inputRef.current.type = showPassword ? "password" : "text";
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex border inputWrapper items-center mb-4 focus-within:border-blue-300">
      <FontAwesomeIcon icon={icon} className="ml-[30px]" />
      <input
        ref={inputRef}
        type={type || " text"}
        name={name}
        onChange={onChangeHandler}
        className="ml-5 py-[12px] focus:outline-none flex-1 pr-5"
        placeholder={placeholder}
      />
      {type && (
        <FontAwesomeIcon
          onClick={onShowPassword}
          icon={!showPassword ? faEye : faEyeSlash}
          className="mr-[30px] cursor-pointer"
        />
      )}
    </div>
  );
}
