import React, { useEffect, useState } from 'react'
import axios from 'axios'
import auth from '../Auth'

export default function Home() {
  const [restaurants, setRestaurants] = useState([])
  const [randomRestaurant, setRandomRestaurant] = useState([])
  const [randomLocation, setRandomLocation] = useState([])
  const [randomType, setRandomType] = useState([])

  const [locations, setLocations] = useState([])
  const [types, setTypes] = useState([])

  useEffect(() => {
    axios.get('api/restaurant').then(resp => {
      console.log(resp.data)
      setRestaurants(resp.data)
    })
    axios.get('api/restaurant/locations').then(resp => {
      console.log(resp.data)
      setLocations(resp.data)
    })
    axios.get('api/restaurant/types').then(resp => {
      console.log(resp.data)
      setTypes(resp.data)
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

  // const getLocations = locations => {
  //   if (!auth.isAuthenticated()) {
  //     window.location.href = '/'
  //   } else {
  //   }
  // }

  return (
    <section className="home-container">
      <h1>Winner Winner, Chicken Dinner!!</h1>
      <div className="btn-container">
        <button className="random-btn" onClick={() => getRandom(restaurants)}>
          All
        </button>
        <div className="dropdown">
          <button className="dropbtn">Location</button>
          <div className="dropdown-content">
            <ul className="btn-list">
              {locations.map(location => {
                return (
                  <li key={location.id}>
                    <button>
                      <p>{location}</p>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Type</button>
          <div className="dropdown-content">
            <ul className="btn-list">
              {types.map(type => {
                return (
                  <li key={type.id}>
                    <button>
                      <p>{type}</p>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
      <h2 className="random-restaurant">{randomRestaurant.name}</h2>
    </section>
  )
}
