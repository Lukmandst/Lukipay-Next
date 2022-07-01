
function SubmitBtn({value, onClick, disabled=false}) {
  return (
    <input type="submit" value={value} onClick={onClick} disabled={disabled}/>
  )
}

export default SubmitBtn