import React from "react";

type Props = {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
};

function FormField({
  type,
  title,
  state,
  placeholder,
  isTextArea,
  setState,
}: Props) {
  return (
    <div className="flexStart flex-col w-full gap-4">
      <label className="w-full text-gray-100">{title}</label>

      {isTextArea ? (
        <textarea
          className="form_field-input"
          value={state}
          required
          placeholder={placeholder}
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          type={type || "text"}
          className="form_field-input"
          value={state}
          required
          placeholder={placeholder}
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  );
}

export default FormField;
