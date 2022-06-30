import { MdOutlineEmail } from "react-icons/md";

function EmailInput({ placeholder = "Enter your e-mail", setEmail }) {
  return (
    <div className="input-wrapper">
      <i>
        <MdOutlineEmail />
      </i>
      <input
        type="email"
        name="email"
        id="email"
        placeholder={placeholder}
        onChange={(e) => {
          e.preventDefault();
          setEmail(e.target.value);
        }}
      />
    </div>
  );
}

export default EmailInput;
