import React, { useEffect } from 'react'

/**
 * Toast — slide-up notification
 * Props: message, type ('success'|'error'|'info'), onClose
 */
export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3200)
    return () => clearTimeout(timer)
  }, [onClose])

  const colors = {
    success: 'bg-green-600',
    error:   'bg-red-600',
    info:    'bg-gray-800',
  }

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full text-white text-sm font-bold shadow-xl animate-fade-in-up ${colors[type]}`}
      role="alert"
    >
      {message}
    </div>
  )
}
