import React from 'react';
import "./Switch.css"

const Switch = ({ isOn, handleToggle, onColor }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <p className="noselect" id="emoji">&nbsp;🌞&nbsp;&nbsp;&nbsp;&nbsp;🌙</p>
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;