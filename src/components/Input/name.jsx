import { MdPerson } from "react-icons/md";

function NameInput({ placeholder, name, setName }) {
  return (
    <div className="input-wrapper">
      <i>
        <MdPerson />
      </i>
      <input
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}

export default NameInput;
