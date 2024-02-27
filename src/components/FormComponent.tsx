import React from "react";

interface FormComponentProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string; 
}

const FormComponent: React.FC<FormComponentProps> = ({
  label,
  placeholder,
  value,
  onChange,
  id, 
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label> 
      <input
        type="text"
        id={id} 
        placeholder={placeholder}
        value={value|| ''}
        onChange={onChange}
      />
    </div>
  );
};

export default FormComponent;