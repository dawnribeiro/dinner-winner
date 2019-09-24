import React, { useEffect, useState } from 'react'
import axios from 'axios'
import auth from '../Auth'

export default function AllRestaurants() {
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

  return (
    <section>
      <ul>
        {restaurants.map(r => {
          return (
            <li key={r.id}>
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
