import React from "react";

const InputField = ({
  label,
  name,
  type,
  placeholder,
  value,
  change,
  required,
  onfocus,
  onblur
}) => {
  return (
    <div className="login-group">
      <label>
        {label} {required && <span className="required">*</span>}
      </label>
      <div className="login-input-wrapper">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={change}
          onFocus={onfocus}
          onBlur={onblur}
        />
      </div>
    </div>
  );
};

export { InputField };
