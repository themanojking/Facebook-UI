import React from 'react'

/**
 * BgBlobs — decorative animated background blobs
 */
export default function BgBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 opacity-30 blur-3xl -top-24 -left-28 animate-blob" />
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-violet-300 to-violet-500 opacity-25 blur-3xl bottom-16 -right-16 animate-blob [animation-delay:2s]" />
      <div className="absolute w-56 h-56 rounded-full bg-gradient-to-br from-pink-200 to-pink-400 opacity-20 blur-3xl top-1/2 left-1/2 animate-blob [animation-delay:4s]" />
    </div>
  )
}
