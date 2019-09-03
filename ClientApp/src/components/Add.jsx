import React, { useEffect, useState } from 'react'
// import axios from 'axios'

export default function Add() {
  return (
    <section>
      <h1>Add a new restaurant</h1>
      <input type="text" placeholder="Name" />
      <input type="text" placeholder="Location" />
    </section>
  )
}
