import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
    let random = restaurants.id
    setRandomRestaurant([Math.ceil(Math.random() * random.length())])
  }

  return (
    <section>
      <h1>Winner Winner, Chicken Dinner!!</h1>
      <button onClick={() => getRandom(restaurants)}></button>
    </section>
  )
}
