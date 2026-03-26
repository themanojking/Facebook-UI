import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../components/InputField.jsx'
import Toast from '../components/Toast.jsx'
import BgBlobs from '../components/BgBlobs.jsx'
import FacebookLogo from '../components/FacebookLogo.jsx'
import { validateForgotForm } from '../utils/validation.js'

// ── SVG Icons ──────────────────────────────────────────────
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

// ── Step 1: Enter email ──────────────────────────────────
function StepOne({ onNext }) {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = (val) => {
    const { errors } = validateForgotForm({ email: val })
    return errors.email || ''
  }

  const handleChange = (e) => {
    setEmail(e.target.value)
    if (touched) setError(validate(e.target.value))
  }
  const handleBlur = () => {
    setTouched(true)
    setError(validate(email))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched(true)
    const err = validate(email)
    setError(err)
    if (err) return
    setLoading(true)
    setTimeout(() => { setLoading(false); onNext(email) }, 1400)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Icon + description */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-fb-blue mb-4 shadow-inner">
          <ShieldIcon />
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-2">Forgot password?</h2>
        <p className="text-sm text-gray-500 font-semibold text-center leading-relaxed max-w-xs">
          Enter your email or phone number and we'll send you a link to get back into your account.
        </p>
      </div>

      {/* Email Field */}
      <InputField
        id="email"
        name="email"
        type="text"
        value={email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Email or phone number"
        autoComplete="email"
        icon={<EmailIcon />}
        error={error}
        touched={touched}
      />

      <button
        type="submit"
        disabled={loading}
        className="btn-primary mt-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Searching…
          </>
        ) : (
          'Search'
        )}
      </button>

      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400 font-semibold">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <Link to="/signup" className="btn-green block text-center no-underline">
        Create new account
      </Link>

      <div className="text-center mt-4">
        <Link to="/" className="btn-outline block text-center no-underline text-sm">
          Back to Login
        </Link>
      </div>
    </form>
  )
}

// ── Step 2: Code sent confirmation ──────────────────────
function StepTwo({ email, onBack }) {
  const navigate = useNavigate()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCodeChange = (idx, val) => {
    if (!/^\d?$/.test(val)) return
    const updated = [...code]
    updated[idx] = val
    setCode(updated)
    if (val && idx < 5) {
      document.getElementById(`code-${idx + 1}`)?.focus()
    }
  }

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      document.getElementById(`code-${idx - 1}`)?.focus()
    }
  }

  const handleVerify = (e) => {
    e.preventDefault()
    const full = code.join('')
    if (full.length < 6) { setError('Please enter the 6-digit code.'); return }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 1400)
  }

  return (
    <form onSubmit={handleVerify} noValidate>
      <div className="flex flex-col items-center mb-6">
        {/* Animated envelope */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-green-600 mb-4 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-2">Check your inbox</h2>
        <p className="text-sm text-gray-500 font-semibold text-center leading-relaxed max-w-xs">
          We sent a 6-digit code to{' '}
          <span className="text-fb-blue font-bold">{email}</span>.
          Enter it below.
        </p>
      </div>

      {/* OTP Boxes */}
      <div className="flex justify-center gap-2 mb-4">
        {code.map((digit, idx) => (
          <input
            key={idx}
            id={`code-${idx}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleCodeChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            className={[
              'w-11 h-12 text-center text-xl font-black border-2 rounded-xl outline-none transition-all duration-200 bg-gray-50',
              digit ? 'border-fb-blue bg-fb-blueLight text-fb-blue' : 'border-gray-200',
              'focus:border-fb-blue focus:shadow-[0_0_0_4px_rgba(24,119,242,0.10)]',
            ].join(' ')}
          />
        ))}
      </div>
      {error && <p className="text-xs text-red-500 font-semibold text-center mb-3">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Verifying…
          </>
        ) : (
          'Verify & Reset'
        )}
      </button>

      <p className="text-center text-xs text-gray-400 mt-4 font-semibold">
        Didn't receive the code?{' '}
        <button type="button" onClick={onBack} className="text-fb-blue font-bold hover:underline bg-transparent border-0 cursor-pointer p-0">
          Try again
        </button>
      </p>
    </form>
  )
}

// ── Main Page ──────────────────────────────────────────
export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [toast, setToast] = useState(null)

  const handleNext = (submittedEmail) => {
    setEmail(submittedEmail)
    setStep(2)
    setToast({ message: 'Code sent! Check your email 📧', type: 'success' })
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-violet-100 flex flex-col font-nunito overflow-x-hidden">
      <BgBlobs />

      {/* ── Nav ── */}
      <nav className="relative z-10 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fb-blue to-blue-600 flex items-center justify-center text-white shadow-md">
            <FacebookLogo size={14} />
          </div>
          <span className="text-xl font-black text-fb-blue tracking-tight">facebook</span>
        </div>
      </nav>

      {/* ── Card ── */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.13)] border border-white/80 p-7">
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-5">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={[
                      'w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300',
                      step >= s
                        ? 'bg-fb-blue text-white shadow-[0_2px_8px_rgba(24,119,242,0.4)]'
                        : 'bg-gray-100 text-gray-400',
                    ].join(' ')}
                  >
                    {step > s ? '✓' : s}
                  </div>
                  {s < 2 && (
                    <div className={`w-10 h-0.5 rounded transition-all duration-300 ${step > s ? 'bg-fb-blue' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
              <span className="ml-2 text-xs text-gray-400 font-semibold">
                {step === 1 ? 'Find account' : 'Verify code'}
              </span>
            </div>

            {step === 1
              ? <StepOne onNext={handleNext} />
              : <StepTwo email={email} onBack={() => setStep(1)} />
            }
          </div>
        </div>
      </main>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  )
}
