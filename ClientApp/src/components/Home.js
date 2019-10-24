import React, { useEffect, useState } from 'react'
import axios from 'axios'
import auth from '../Auth'

export default function Home() {
  const [restaurants, setRestaurants] = useState([])
  const [randomRestaurant, setRandomRestaurant] = useState([])
  const [locations, setLocations] = useState([])

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
      <div className="btn-container">
        <button className="random-btn" onClick={() => getRandom(restaurants)}>
          All
        </button>
        <div className="dropdown">
          <button className="dropbtn" onClick={() => getLocations(locations)}>
            Location
          </button>
          <div className="dropdown-content">
            <ul className="btn-list">
              <li>
                <button>1</button>
              </li>
            </ul>
            {/* <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a> */}
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Type</button>
          <div className="dropdown-content">
            <ul className="btn-list">
              <li>
                <button>1</button>
              </li>
            </ul>
            {/* <a href="#">Link 4</a>
            <a href="#">Link 5</a>
            <a href="#">Link 6</a> */}
          </div>
        </div>
      </div>
      <h2 className="random-restaurant">{randomRestaurant.name}</h2>
    </section>
  )
}
