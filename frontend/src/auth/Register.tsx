import "../styles/auth.css"

export default function Register() {
  return (
    <div className="auth-container">
      <h2>Register</h2>
      <input placeholder="Full Name" />
      <input placeholder="Email" />
      <input placeholder="Password" type="password" />
      <button>Create Account</button>
    </div>
  )
}