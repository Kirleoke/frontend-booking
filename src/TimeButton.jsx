import './App.css';

function Button({value, handleClick }) {
    return (
      <button onClick={handleClick} className="button">
       {value}
      </button>
    );
  }
  
  export default Button;