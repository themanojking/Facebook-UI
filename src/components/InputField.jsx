import React from 'react'

/**
 * InputField — Reusable input with icon, error, and success states
 *
 * Props:
 *  id, name, type, value, onChange, onBlur,
 *  placeholder, icon (JSX), error (string),
 *  touched (bool), rightElement (JSX for password toggle)
 */
export default function InputField({
  id,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  icon,
  error,
  touched,
  rightElement,
  autoComplete,
}) {
  const hasError = touched && error
  const isSuccess = touched && !error && value.trim() !== ''

  return (
    <div className="mb-4">
      <div className="relative flex items-center">
        {/* Left Icon */}
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center">
            {icon}
          </span>
        )}

        {/* Input */}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={[
            'fb-input',
            icon ? 'pl-11' : 'pl-4',
            rightElement ? 'pr-12' : 'pr-4',
            hasError ? 'error' : '',
            isSuccess ? 'success' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />

        {/* Right Element (e.g. password toggle) */}
        {rightElement && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            {rightElement}
          </span>
        )}
      </div>

      {/* Error Message */}
      {hasError && (
        <p className="mt-1.5 text-xs text-red-500 font-semibold pl-1 animate-fade-in-up">
          {error}
        </p>
      )}
    </div>
  )
}
