import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <section>
      <Link tag={Link} className="text-dark" to="/login">
        Login
      </Link>
    </section>
  )
}
