import { MdOutlineEmail } from "react-icons/md";

function EmailInput({ placeholder = "Enter your e-mail", setEmail }) {
  return (
    <div className="inputwrapper">
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
      <i className="input-icon">
        <MdOutlineEmail />
      </i>
    </div>
  );
}

export default EmailInput;
