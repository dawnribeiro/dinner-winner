import React, { useEffect, useState } from 'react'
import axios from 'axios'
import auth from '../Auth'

export default function Home() {
  const [restaurants, setRestaurants] = useState([])
  const [randomRestaurant, setRandomRestaurant] = useState([])

  useEffect(() => {
    axios.get('api/restaurant').then(resp => {
      console.log(resp.data)
      setRestaurants(resp.data)
    })
  }, [])

  const getRandom = restaurants => {
    if (!auth.isAuthenticated()) {
      window.location.href = '/'
    } else {
      let random =
        restaurants[Math.ceil(Math.random() * restaurants.length - 1)]
      console.log(restaurants.length)
      console.log(random)
      if (restaurants.length === 0) {
        window.location.href = '/add'
      } else setRandomRestaurant(random)
    }
  }

  return (
    <section className="home-container">
      <h1>Winner Winner, Chicken Dinner!!</h1>
      <button className="random-btn" onClick={() => getRandom(restaurants)}>
        Dinner Time
      </button>
      <h2>{randomRestaurant.name}</h2>
    </section>
  )
}
