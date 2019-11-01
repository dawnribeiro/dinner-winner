import React, { useEffect, useState } from 'react'
import axios from 'axios'
import auth from '../Auth'

export default function Home() {
  const [restaurants, setRestaurants] = useState([])
  const [randomRestaurant, setRandomRestaurant] = useState([])
  const [randomLocation, setRandomLocation] = useState([])
  // const [randomType, setRandomType] = useState([])
  // const [distinctLocations, setDistinctLocations] = useState([])
  // const [distinctTypes, setDistinctTypes] = useState([])
  // const [locations, setLocations] = useState([])

  useEffect(() => {
    axios.get('api/restaurant').then(resp => {
      console.log(resp.data)
      setRestaurants(resp.data)
    })
    // axios.get('api/restaurant/distinctLocations').then(resp => {
    //   console.log(resp.data)
    //   setDistinctLocations(resp.data)
    // })
    // axios.get('api/restaurant/distinctTypes').then(resp => {
    //   console.log(resp.data)
    //   setDistinctTypes(resp.data)
    // })
  }, [])

  const getRandomRestaurant = restaurants => {
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

  // const getRandomLocations = location => {
  //   axios.get(`api/restaurant/${location}'`).then(resp => {
  //     console.log(resp.data)
  //     setLocations(resp.data)
  //   })
  //   //   if (!auth.isAuthenticated()) {
  //   //     window.location.href = '/'
  //   //   } else {

  //   // }
  //   //   }
  // }
  // let random =
  //       location[Math.ceil(Math.random() * location.length - 1)]
  //     console.log(location.length)
  //     console.log(random)
  //     if (location.length === 0) {
  //       window.location.href = '/add'
  //     } else setRandomLocation(random)

  return (
    <section className="home-container">
      <h1>Winner Winner, Chicken Dinner!!</h1>
      <div className="btn-container">
        <button
          className="random-btn"
          onClick={() => getRandomRestaurant(restaurants)}
        >
          Dinner Time
        </button>
        {/* <div className="dropdown">
          <button className="dropbtn">Location</button>
          <div className="dropdown-content">
            <ul className="btn-list">
              {distinctLocations.map(location => {
                return (
                  <li key={location}>
                    <button onClick={() => getRandomLocations(locations)}>
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
              {distinctTypes.map(type => {
                return (
                  <li key={type}>
                    <button>
                      <p>{type}</p>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div> */}
      </div>
      <h2 className="random-restaurant">{randomRestaurant.name}</h2>
    </section>
  )
}
