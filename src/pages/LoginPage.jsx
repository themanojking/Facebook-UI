import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../components/InputField.jsx'
import Toast from '../components/Toast.jsx'
import BgBlobs from '../components/BgBlobs.jsx'
import FacebookLogo from '../components/FacebookLogo.jsx'
import { validateLoginForm } from '../utils/validation.js'

// ── SVG Icons ────────────────────────────────────────────
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

// ── Hero features list ────────────────────────────────────
const features = [
  { emoji: '👥', text: 'See updates from friends & family' },
  { emoji: '💬', text: 'Share what\'s on your mind' },
  { emoji: '🌍', text: 'Discover events near you' },
  { emoji: '🎉', text: 'Join groups that interest you' },
]

export default function LoginPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [touched, setTouched] = useState({ email: false, password: false })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Live clear error
    if (touched[name]) {
      const { errors: newErrors } = validateLoginForm({ ...form, [name]: value })
      setErrors(newErrors)
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const { errors: newErrors } = validateLoginForm(form)
    setErrors(newErrors)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({ email: true, password: true })
    const { isValid, errors: newErrors } = validateLoginForm(form)
    setErrors(newErrors)
    if (!isValid) return

    setLoading(true)
    // Simulate API call — values stay visible during loading
    setTimeout(() => {
      setLoading(false)
      setToast({ message: 'Login successful! Welcome back 👋', type: 'success' })
      // Only clear form AFTER success toast, then redirect to a different page
      setTimeout(() => {
        setForm({ email: '', password: '' })
        setTouched({ email: false, password: false })
        setErrors({})
        navigate('/') // redirect away from login so re-mount doesn't flash
      }, 1600)
    }, 1500)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-violet-100 flex flex-col font-nunito overflow-x-hidden">
      <BgBlobs />

      {/* ── Nav ── */}
      <nav className="relative z-10 px-6 py-4">
        <span className="text-3xl font-black text-fb-blue tracking-tight select-none">facebook</span>
      </nav>

      {/* ── Main ── */}
      <main className="relative z-10 flex flex-1 items-center justify-center gap-16 px-6 py-8 lg:flex-row flex-col">

        {/* Left Hero */}
        <div className="max-w-md w-full animate-fade-in-left lg:block">
          {/* Logo pill */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fb-blue to-blue-600 flex items-center justify-center shadow-[0_8px_24px_rgba(24,119,242,0.35)] mb-5 text-white">
            <FacebookLogo size={30} />
          </div>
          <h1 className="text-5xl font-black text-fb-blue tracking-tight leading-none mb-3">facebook</h1>
          <p className="text-lg text-gray-500 font-semibold leading-relaxed mb-6">
            Connect with friends and the world<br className="hidden sm:block" /> around you on Facebook.
          </p>
          <ul className="flex flex-col gap-3">
            {features.map((f, i) => (
              <li
                key={i}
                className="flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-white/90 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:translate-x-1 hover:shadow-md transition-all duration-200"
              >
                <span className="text-xl">{f.emoji}</span>
                {f.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Card */}
        <div className="w-full max-w-sm animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.13)] border border-white/80 p-7">
            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <InputField
                id="email"
                name="email"
                type="text"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email or phone number"
                autoComplete="username"
                icon={<EmailIcon />}
                error={errors.email}
                touched={touched.email}
              />

              {/* Password */}
              <InputField
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password"
                autoComplete="current-password"
                icon={<LockIcon />}
                error={errors.password}
                touched={touched.password}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-fb-blue transition-colors duration-200 p-0.5"
                    aria-label="Toggle password"
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                }
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary mt-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Logging in…
                  </>
                ) : (
                  'Log In'
                )}
              </button>

              {/* Forgot */}
              <div className="text-center mt-3">
                <Link
                  to="/forgot-password"
                  className="text-fb-blue text-sm font-bold hover:underline transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 font-semibold">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Signup */}
              <Link to="/signup" className="btn-green block text-center no-underline">
                Create new account
              </Link>
            </form>

            <p className="text-center text-xs text-gray-400 mt-4 border-t border-gray-100 pt-4">
              <span className="font-bold text-fb-blue cursor-pointer hover:underline">Create a Page</span>{' '}
              for a celebrity, brand or business.
            </p>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 py-4 px-6 text-center">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-2">
          {['English', 'हिन्दी', 'தமிழ்', 'Privacy', 'Terms', 'Advertising', 'Cookies'].map((item) => (
            <a key={item} href="#" className="text-xs text-gray-400 hover:text-fb-blue transition-colors duration-150">
              {item}
            </a>
          ))}
        </div>
        <p className="text-xs text-gray-400">© 2025 Facebook Clone · Built for learning</p>
      </footer>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  )
}
