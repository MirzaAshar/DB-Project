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
  onblur,
}) => {
  return (
    <div className="form-group">
      <label>
        {label} {required && <span className="required">*</span>}
      </label>
      <div className="input-wrapper">
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

const SelectField = ({
  label,
  name,
  value,
  placeholderValue,
  change,
  required,
  data = [],
}) => {
  return (
    <div className="form-group">
      <label>
        {label} {required && <span className="required">*</span>}
      </label>
      <div>
        <select
          name={name}
          className="styled-select"
          onChange={change}
          value={value}
        >
          <option value="" disabled>
            {placeholderValue}
          </option>
          {data.map((campus) => (
            <option key={campus} value={campus}>
              {campus}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export { InputField, SelectField };
