import React from 'react'
import { getPasswordStrength } from '../utils/validation.js'

/**
 * PasswordStrength — shows 3 colored bars + label
 */
export default function PasswordStrength({ password }) {
  if (!password) return null

  const strength = getPasswordStrength(password)

  const config = {
    weak:   { bars: 1, label: 'Weak',   color: 'bg-red-400'    },
    medium: { bars: 2, label: 'Medium', color: 'bg-yellow-400' },
    strong: { bars: 3, label: 'Strong', color: 'bg-green-500'  },
  }[strength]

  return (
    <div className="mt-2 mb-1">
      <div className="flex gap-1.5 mb-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= config.bars ? config.color : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p
        className={`text-xs font-bold ${
          strength === 'weak'
            ? 'text-red-500'
            : strength === 'medium'
            ? 'text-yellow-500'
            : 'text-green-600'
        }`}
      >
        {config.label} password
      </p>
    </div>
  )
}
