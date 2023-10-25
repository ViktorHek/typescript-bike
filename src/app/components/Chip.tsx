'use client'
import "../styles/components.css";
import { useState } from "react";

interface props {
  text: string,
  handleClick: (text: string) => void
}

export default function Chip(props: props) {
  const { text, handleClick } = props
  const [active, setActive] = useState(false);

  function clickChip() {
    setActive(!active);
    return handleClick(text);
  }

  return (
    <div
      className={`${active ? "main-chip-container-active" : "main-chip-container-not-active"}`}
      onClick={() => clickChip()}>
      <span>{text}</span>
    </div>
  );
}


