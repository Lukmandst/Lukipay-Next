import { MdOutlineEmail } from "react-icons/md";

function EmailInput({placeholder="Enter your e-mail"}) {
  return (
    <div className="input-wrapper">
      <i>
        <MdOutlineEmail />
      </i>
      <input type="email" name="email" id="email" placeholder={placeholder} />
    </div>
  );
}

export default EmailInput;
