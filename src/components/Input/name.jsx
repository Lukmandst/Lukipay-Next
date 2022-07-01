import { MdPerson } from "react-icons/md";

function NameInput({ placeholder, name, setName }) {
  return (
    <div className="input-wrapper">
      <input
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={(e) => setName(e.target.value)}
      />
      <i className="input-icon">
        <MdPerson />
      </i>
    </div>
  );
}

export default NameInput;
