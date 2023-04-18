import React from 'react';
import './Button.css'; 
function Button(props) {
  const style = {
    backgroundColor: props.color,
    fontSize: props.fontSize,
    width: props.width,
    height: props.height,
    position: props.position,
    top: props.top,
    bottom: props.bottom,
    left: props.left,
    right: props.right,
    alignItems: props.alignItems,
    margin: props.margin
  };
  return (
    <button style={style} className="Button" onClick={props.onClick}>{props.label}</button>
  );
}

export default Button;
