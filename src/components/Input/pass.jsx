import React, { useState } from "react";
import { MdVisibilityOff, MdVisibility, MdLockOutline } from "react-icons/md";

function PasswordInput({ placeholder = "Enter your password" }) {
  const [eye, setEye] = useState(false);
  return (
    <div className="input-wrapper">
      <i>
        <MdLockOutline />
      </i>
      <input
        type={!eye ? "password" : "text"}
        name="pass"
        id=""
        placeholder={placeholder}
      />
      <eye onClick={() => setEye(!eye)}>
        {!eye ? <MdVisibilityOff /> : <MdVisibility />}
      </eye>
    </div>
  );
}

export default PasswordInput;
