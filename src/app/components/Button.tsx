'use client';
import "../styles/components.css";

interface props {
  handleClick: () => void,
  color: string,
  type: string,
  text: string
}

function Button(props: props) {
  const { handleClick, color, type, text } = props
  let colorType = color ? color : "#FFFFFF";
  let useText = text ? text : "primary";

  function handleClickButton() {
    return handleClick();
  }

  if (type === "secondary") {
    return (
      <button onClick={() => handleClickButton()} className="secondary-button">
        <span>{useText}</span>
      </button>
    );
  } else {
    return (
      <button
        onClick={() => handleClickButton()}
        className={` ${color === "white" ? "primary-button-white" : "primary-button"} center `}>
        <span className="center">{useText}</span>
      </button>
    );
  }
}

export default Button;
