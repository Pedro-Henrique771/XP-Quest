import "./Input.css"

const Input = ({id, label, type, placeholder, value, onChange}) => {
  return (
    <div className="inputLogin">
        <label htmlFor={id}>{label}</label>
        <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value} 
        onChange={onChange}/>
    </div>
  )
}

export default Input

