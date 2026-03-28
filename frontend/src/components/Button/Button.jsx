import "./Button.css";

const Button = ({ placeholder, onClick, type = "button" }) => {
  return (
    <button type={type} onClick={onClick} className="button">
      {placeholder}
    </button>
  );
};

export default Button;