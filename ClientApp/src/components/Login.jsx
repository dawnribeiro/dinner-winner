import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <section className="login-section">
      <h3 className="login">Login to begin</h3>
      <button className="login-btn">
        <Link tag={Link} className="text-dark" to="/login">
          Login
        </Link>
      </button>
    </section>
  )
}
