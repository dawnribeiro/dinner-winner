import React, { Component } from 'react'
import { Route } from 'react-router'
import { Layout } from './components/Layout'
import Home from './components/Home'
import Testing from './Testing'
import Add from './components/Add'
import auth from './Auth'
import axios from 'axios'

export default class App extends Component {
  static displayName = App.name

  componentWillMount() {
    if (auth.isAuthenticated()) {
      axios.defaults.headers.common = {
        Authorization: auth.authorizationHeader()
      }
    }
  }

  render() {
    return (
      <Layout>
        <Route path="/login" render={() => auth.login()} />
        <Route
          path="/logout"
          render={() => {
            auth.logout()
            return <p />
          }}
        />
        <Route
          path="/callback"
          render={() => {
            auth.handleAuthentication(() => {
              // // NOTE: Uncomment the following lines if you are using axios
              // //
              // Set the axios authentication headers
              axios.defaults.headers.common = {
                Authorization: auth.authorizationHeader()
              }
            })
            return <p />
          }}
        />
        <Route exact path="/" component={Home} />
        <Route path="/add" component={Add} />
        <Route path="/hello" component={Testing} />
      </Layout>
    )
  }
}
