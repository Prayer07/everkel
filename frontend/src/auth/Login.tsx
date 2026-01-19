import "../styles/auth.css"

export default function Login() {
  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input placeholder="Email" />
      <input placeholder="Password" type="password" />
      <button>Login</button>
    </div>
  )
}