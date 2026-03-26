import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../components/InputField.jsx'
import PasswordStrength from '../components/PasswordStrength.jsx'
import Toast from '../components/Toast.jsx'
import BgBlobs from '../components/BgBlobs.jsx'
import FacebookLogo from '../components/FacebookLogo.jsx'
import { validateSignupForm } from '../utils/validation.js'

// ── SVG Icons ──────────────────────────────────────────────
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)
const EyeIcon = ({ open }) => open ? (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
) : (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
  </svg>
)

const INITIAL_FORM = {
  firstName: '', lastName: '', email: '',
  password: '', confirmPassword: '', dob: '', gender: '',
}

export default function SignupPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [showPw, setShowPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    const updated = { ...form, [name]: value }
    setForm(updated)
    if (touched[name]) {
      const { errors: newErrors } = validateSignupForm(updated)
      setErrors(newErrors)
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const { errors: newErrors } = validateSignupForm(form)
    setErrors(newErrors)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const allTouched = Object.fromEntries(Object.keys(INITIAL_FORM).map((k) => [k, true]))
    setTouched(allTouched)
    const { isValid, errors: newErrors } = validateSignupForm(form)
    setErrors(newErrors)
    if (!isValid) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setToast({ message: 'Account created! Redirecting to login… 🎉', type: 'success' })
      setTimeout(() => navigate('/'), 1800)
    }, 1600)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-violet-100 flex flex-col font-nunito overflow-x-hidden">
      <BgBlobs />

      {/* ── Nav ── */}
      <nav className="relative z-10 px-6 py-4 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 text-fb-blue font-bold text-sm hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Login
        </Link>
      </nav>

      {/* ── Card ── */}
      <main className="relative z-10 flex flex-1 items-start justify-center px-4 py-6">
        <div className="w-full max-w-lg animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.13)] border border-white/80 p-7">

            {/* Header */}
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fb-blue to-blue-600 flex items-center justify-center text-white shadow-md">
                <FacebookLogo size={18} />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-800 leading-tight">Create an account</h2>
                <p className="text-xs text-gray-400 font-semibold">It's quick and easy.</p>
              </div>
            </div>

            <div className="h-px bg-gray-100 my-4" />

            <form onSubmit={handleSubmit} noValidate>
              {/* Name Row */}
              <div className="grid grid-cols-2 gap-3">
                <InputField
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="First name"
                  autoComplete="given-name"
                  icon={<UserIcon />}
                  error={errors.firstName}
                  touched={touched.firstName}
                />
                <InputField
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Last name"
                  autoComplete="family-name"
                  icon={<UserIcon />}
                  error={errors.lastName}
                  touched={touched.lastName}
                />
              </div>

              {/* Email */}
              <InputField
                id="email"
                name="email"
                type="text"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Mobile number or email"
                autoComplete="email"
                icon={<EmailIcon />}
                error={errors.email}
                touched={touched.email}
              />

              {/* Password */}
              <div className="mb-4">
                <div className="relative flex items-center">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center">
                    <LockIcon />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPw ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="New password (min. 8 chars)"
                    autoComplete="new-password"
                    className={[
                      'fb-input pl-11 pr-12',
                      touched.password && errors.password ? 'error' : '',
                      touched.password && !errors.password && form.password ? 'success' : '',
                    ].filter(Boolean).join(' ')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-fb-blue transition-colors p-0.5"
                    aria-label="Toggle password"
                  >
                    <EyeIcon open={showPw} />
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p className="mt-1.5 text-xs text-red-500 font-semibold pl-1">{errors.password}</p>
                )}
                {form.password && <PasswordStrength password={form.password} />}
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <div className="relative flex items-center">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center">
                    <LockIcon />
                  </span>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPw ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Confirm password"
                    autoComplete="new-password"
                    className={[
                      'fb-input pl-11 pr-12',
                      touched.confirmPassword && errors.confirmPassword ? 'error' : '',
                      touched.confirmPassword && !errors.confirmPassword && form.confirmPassword ? 'success' : '',
                    ].filter(Boolean).join(' ')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPw(!showConfirmPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-fb-blue transition-colors p-0.5"
                    aria-label="Toggle confirm password"
                  >
                    <EyeIcon open={showConfirmPw} />
                  </button>
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-500 font-semibold pl-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-500 mb-1.5 pl-1">
                  Date of birth
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center">
                    <CalendarIcon />
                  </span>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    value={form.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    max={new Date().toISOString().split('T')[0]}
                    className={[
                      'fb-input pl-11',
                      touched.dob && errors.dob ? 'error' : '',
                      touched.dob && !errors.dob && form.dob ? 'success' : '',
                    ].filter(Boolean).join(' ')}
                  />
                </div>
                {touched.dob && errors.dob && (
                  <p className="mt-1.5 text-xs text-red-500 font-semibold pl-1">{errors.dob}</p>
                )}
              </div>

              {/* Gender */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-gray-500 mb-1.5 pl-1">Gender</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Male', 'Female', 'Custom'].map((g) => (
                    <label
                      key={g}
                      className={[
                        'flex items-center justify-between px-3 py-2.5 border-2 rounded-xl cursor-pointer text-sm font-semibold transition-all duration-200',
                        form.gender === g
                          ? 'border-fb-blue bg-fb-blueLight text-fb-blue'
                          : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-fb-blue/40',
                      ].join(' ')}
                    >
                      {g}
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={form.gender === g}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="accent-fb-blue"
                      />
                    </label>
                  ))}
                </div>
                {touched.gender && errors.gender && (
                  <p className="mt-1.5 text-xs text-red-500 font-semibold pl-1">{errors.gender}</p>
                )}
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                By clicking <strong className="text-gray-600">Sign Up</strong>, you agree to our{' '}
                <a href="#" className="text-fb-blue font-bold hover:underline">Terms</a>,{' '}
                <a href="#" className="text-fb-blue font-bold hover:underline">Privacy Policy</a> and{' '}
                <a href="#" className="text-fb-blue font-bold hover:underline">Cookies Policy</a>.
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-green flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating account…
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>

              <div className="text-center mt-4">
                <Link to="/" className="text-fb-blue text-sm font-bold hover:underline">
                  Already have an account?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  )
}
