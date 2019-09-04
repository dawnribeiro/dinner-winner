import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AllRestaurants from './AllRestaurants'

export default function Add() {
  const [restaurant, setRestaurant] = useState([])

  const createRestaurant = e => {
    const data = { ...restaurant }
    axios.post('/api/Restaurant', data).then(resp => {
      console.log(resp.data)
    }, [])
    e.preventDefault()
    e.target.reset()
  }

  const updateValue = e => {
    const name = e.target.name
    const value = e.target.value
    setRestaurant(data => {
      data[name] = value
      return data
    })
  }

  return (
    <section>
      <h1>Add a new restaurant</h1>
      <form onSubmit={createRestaurant}>
        <label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={e => updateValue(e)}
          />
        </label>
        <label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={e => updateValue(e)}
          />
        </label>
        <button>Add</button>
      </form>
      <AllRestaurants />
    </section>
  )
}
