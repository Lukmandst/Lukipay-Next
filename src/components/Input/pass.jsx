import React, { useState } from "react";
import { MdVisibilityOff, MdVisibility, MdLockOutline } from "react-icons/md";

function PasswordInput({
  placeholder = "Enter your password",
  id = "pass",
  defaultValue,
  setPass,
}) {
  const [eye, setEye] = useState(false);
  return (
    <div className="inputwrapper">
      <input
        type={!eye ? "password" : "text"}
        name="pass"
        id={id}
        value={defaultValue? defaultValue: defaultValue && defaultValue.length<1 && ''}
        placeholder={placeholder}
        onChange={(e) => {
          e.preventDefault();
          setPass(e.target.value);
        }}
      />
      <i className="input-icon">
        <MdLockOutline />
      </i>
      <i className="eye" onClick={() => setEye(!eye)}>
        {!eye ? (
          <MdVisibilityOff style={{ color: "#88888f" }} />
        ) : (
          <MdVisibility />
        )}
      </i>
    </div>
  );
}

export default PasswordInput;
