import {MdPerson} from 'react-icons/md'

function NameInput({ placeholder, name }) {
  return (
    <div className="input-wrapper">
      <i>
        <MdPerson />
      </i>
      <input type="text" name={name} id={name} placeholder={placeholder} />
    </div>
  );
}

export default NameInput;
