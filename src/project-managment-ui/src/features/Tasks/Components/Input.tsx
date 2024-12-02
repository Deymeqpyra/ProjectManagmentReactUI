import React from "react"

interface InputProps {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    label: string
    type?: string
    placeholder?: string
    name: string
  }
  
  const Input: React.FC<InputProps> = React.memo(({ value, onChange, label, type = 'text', placeholder, name }) => {
    return (
      <div className="input-container">
        <label>{label}</label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          className="input-field"
        />
      </div>
    )
  })
  
  export default Input
  