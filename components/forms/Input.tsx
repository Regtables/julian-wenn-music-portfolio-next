import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
}

const Input = ({ label, error, className, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1 text-sm w-full">
      {label && (
        <label className="text-sm font-medium text-custom-gold">
          {label}
        </label>
      )}
      <input 
        className={`
          px-3 py-2 border-2 border-custom-gold rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          placeholder:text-custom-gold
          ${error ? 'border-red-500' : ''}
          ${className || ''}
        `.trim()}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  )
}

export default Input