import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <section>
      <h3>Login to begin</h3>
      <button>
        <Link tag={Link} className="text-dark" to="/login">
          Login
        </Link>
      </button>
    </section>
  )
}
