import React from "react";

const InputField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  ...props
}) => {
  return (
    <div className="input-field">
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default InputField;
