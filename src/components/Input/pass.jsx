import React, { useState } from "react";
import { MdVisibilityOff, MdVisibility, MdLockOutline } from "react-icons/md";

function PasswordInput({
  placeholder = "Enter your password",
  id = "pass",
  setPass,
}) {
  const [eye, setEye] = useState(false);
  return (
    <div className="input-wrapper">
      <i>
        <MdLockOutline />
      </i>
      <input
        type={!eye ? "password" : "text"}
        name="pass"
        id={id}
        placeholder={placeholder}
        onChange={(e) => {
          e.preventDefault();
          setPass(e.target.value);
        }}
      />
      <eye onClick={() => setEye(!eye)}>
        {!eye ? <MdVisibilityOff /> : <MdVisibility />}
      </eye>
    </div>
  );
}

export default PasswordInput;
