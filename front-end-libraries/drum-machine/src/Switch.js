import { useRef, useEffect, useCallback } from "react";
import "./Switch.css";

const Switch = ({ on, setOn }) => {
  return (
    <label className="switch">
      <input type="checkbox" defaultChecked={on} />
      <span className="slider"></span>
    </label>
  );
};

export default Switch;
