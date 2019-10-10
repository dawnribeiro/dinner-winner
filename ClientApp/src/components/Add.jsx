import React, { useEffect, useState } from 'react'
import axios from 'axios'
import auth from '../Auth'
// import AllRestaurants from './AllRestaurants'

export default function Add() {
  const [restaurant, setRestaurant] = useState([])
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      window.location.href = '/'
    } else {
      axios.get('api/restaurant').then(resp => {
        setRestaurants(resp.data)
        console.log(resp.data)
      })
    }
  }, [])

  const deleteRestaurant = r => {
    let deletedRestaurant = r.id
    axios.delete(`api/restaurant/${deletedRestaurant}`).then(resp => {
      setRestaurants(oldRestaurants =>
        oldRestaurants.filter(f => f.id !== r.id)
      )
    })
  }

  const createRestaurant = e => {
    const data = { ...restaurant }
    axios.post('/api/Restaurant', data).then(resp => {
      console.log(resp.data)
    }, [])
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
            required
            name="name"
            placeholder="Name"
            onChange={e => updateValue(e)}
          />
        </label>
        <label>
          <input
            type="text"
            required
            name="location"
            placeholder="Location"
            onChange={e => updateValue(e)}
          />
        </label>
        <input
          type="text"
          required
          name="Type"
          placeholder="Type"
          onChange={e => updateValue(e)}
        />
        <label></label>
        <button>Add</button>
      </form>
      {/* <AllRestaurants /> */}
      <ul>
        {restaurants.map(r => {
          return (
            <li key={r.id} className="restaurants">
              <h3>{r.name}</h3>
              <p>{r.location}</p>
              <button onClick={() => deleteRestaurant(r)}>Delete</button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
