# 📘 Facebook Clone – React + Vite + Tailwind CSS

A pixel-perfect, responsive Facebook authentication UI clone built with **React 18**, **Vite**, and **Tailwind CSS 3**.

---

## 📁 Folder Structure

```
fb-clone/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── BgBlobs.jsx          # Animated background decoration
│   │   ├── FacebookLogo.jsx     # Reusable Facebook "f" SVG icon
│   │   ├── InputField.jsx       # Reusable input with icon + error states
│   │   ├── PasswordStrength.jsx # Password strength bar indicator
│   │   └── Toast.jsx            # Slide-up toast notification
│   ├── pages/
│   │   ├── LoginPage.jsx        # Main login page (hero + form)
│   │   ├── SignupPage.jsx       # Create account page
│   │   └── ForgotPasswordPage.jsx # Forgot password (2-step flow)
│   ├── utils/
│   │   └── validation.js        # All form validation helpers
│   ├── App.jsx                  # Route definitions
│   ├── index.css                # Tailwind directives + component classes
│   └── main.jsx                 # App entry point
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js **v18+**
- npm or yarn

### Installation

```bash
# 1. Navigate into the project
cd fb-clone

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🗺️ Pages Overview

### 1. Login Page (`/`)
The main landing page with a two-column layout:
- **Left column** — Hero section with the Facebook brand, tagline, and feature highlights
- **Right column** — Login form card

**Features:**
- Email / phone number input with mail icon
- Password input with lock icon + show/hide toggle
- "Log In" button with loading spinner
- "Forgot password?" link → navigates to `/forgot-password`
- "Create new account" button → navigates to `/` or loginpage
- Animated background blobs
- Fully responsive (stacks on mobile)

---

### 2. Create Account Page (`/signup`)
Full registration form with the following fields:

| Field            | Validation                              |
|------------------|-----------------------------------------|
| First Name       | Required, letters only, min 2 chars     |
| Last Name        | Required, letters only, min 2 chars     |
| Email / Phone    | Valid email format OR 10-digit phone    |
| Password         | Required, min 8 chars                   |
| Confirm Password | Must match password                     |
| Date of Birth    | Required, must be 13+ years old         |
| Gender           | One of: Male / Female / Custom          |

**Features:**
- Password strength bar (Weak / Medium / Strong)
- Gender selection with styled radio buttons
- Show/hide toggle for both password fields
- Inline real-time error messages on blur
- Loading spinner on submit
- Terms & Privacy policy notice

---

### 3. Forgot Password Page (`/forgot-password`)
A **2-step flow**:

**Step 1 — Find Account:**
- Enter email or phone number
- Validates format before searching
- Simulates API call with loading state
- Shows success toast on submit

**Step 2 — Enter OTP Code:**
- 6 individual digit input boxes
- Auto-focus moves to next box on input
- Backspace navigates to previous box
- "Verify & Reset" submits and redirects to login

---

## ✅ Form Validation

All validation lives in `src/utils/validation.js`.

### Rules Applied:
| Rule                     | Description                               |
|--------------------------|-------------------------------------------|
| Required fields          | Empty check on all fields                 |
| Email format             | `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`        |
| Phone format             | 10 digits (spaces/dashes stripped)        |
| Name validation          | Letters + spaces only, min 2 characters  |
| Password length          | Min 6 (login) / Min 8 (signup)           |
| Password match           | confirmPassword === password              |
| Age check                | Must be at least 13 years old            |
| Password strength        | Based on length, uppercase, numbers, symbols |

### Validation Triggers:
- **On Blur** — validates when user leaves an input field
- **On Change** — re-validates live after first blur (touched)
- **On Submit** — marks all fields touched and validates all at once

---

## 🎨 Design System

### Colors
| Token           | Value     | Usage                    |
|-----------------|-----------|--------------------------|
| `fb-blue`       | `#1877f2` | Primary buttons, links   |
| `fb-blueDark`   | `#145dbf` | Hover states             |
| `fb-blueLight`  | `#e7f0fd` | Selected states, focuses |
| `fb-green`      | `#42b72a` | Sign Up / Create buttons |
| `fb-greenDark`  | `#36a420` | Green hover states       |

### Typography
- Font: **Nunito** (Google Fonts)
- Weights used: 400, 600, 700, 800, 900

### Animations
| Class               | Effect                                  |
|---------------------|-----------------------------------------|
| `animate-fade-in-up` | Slide up + fade in (cards, forms)      |
| `animate-fade-in-left` | Slide left + fade in (hero section)  |
| `animate-blob`       | Floating blob background elements      |
| `animate-spin`       | Spinner on loading buttons             |

---

## 📱 Responsive Breakpoints

| Breakpoint | Width    | Layout                          |
|------------|----------|---------------------------------|
| `sm`       | 640px+   | Minor typography/padding tweaks |
| `md`       | 768px+   | Hidden hero features on mobile  |
| `lg`       | 1024px+  | Two-column login layout         |

On mobile, the login page stacks the hero above the form card, and the feature list is hidden to keep it clean.

---

## 🧩 Components

### `InputField.jsx`
Reusable input component.

**Props:**
| Prop           | Type    | Description                          |
|----------------|---------|--------------------------------------|
| `id`           | string  | Input id                             |
| `name`         | string  | Input name (matches form state key)  |
| `type`         | string  | Input type (text, password, etc.)    |
| `value`        | string  | Controlled value                     |
| `onChange`     | func    | Change handler                       |
| `onBlur`       | func    | Blur handler (triggers validation)   |
| `placeholder`  | string  | Placeholder text                     |
| `icon`         | JSX     | Left-side icon element               |
| `error`        | string  | Error message text                   |
| `touched`      | bool    | Whether field has been visited       |
| `rightElement` | JSX     | Right-side element (e.g. eye toggle) |

### `Toast.jsx`
Slide-up notification.

**Props:** `message`, `type` ('success' | 'error' | 'info'), `onClose`

### `PasswordStrength.jsx`
Segmented strength bar.

**Props:** `password` (string)

---

## 🛠️ Tech Stack

| Technology       | Version  | Purpose                    |
|------------------|----------|----------------------------|
| React            | 18.x     | UI library                 |
| Vite             | 5.x      | Build tool & dev server    |
| React Router DOM | 6.x      | Client-side routing        |
| Tailwind CSS     | 3.x      | Utility-first styling      |
| PostCSS          | 8.x      | CSS processing             |
| Autoprefixer     | 10.x     | Browser compatibility      |

---

## 📝 Notes

- This is a **frontend-only** project — no backend or real authentication
- All API calls are **simulated** with `setTimeout`
- No external icon libraries — all icons are inline SVGs
- No localStorage or cookies used

---

## 📄 License

This project is built for **learning purposes only**. Facebook® is a trademark of Meta Platforms, Inc.
