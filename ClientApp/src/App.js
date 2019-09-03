import React, { Component } from 'react'
import { Route } from 'react-router'
import { Layout } from './components/Layout'
import { Home } from './components/Home'
import Testing from './Testing'
import Add from './components/Add'

export default class App extends Component {
  static displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/add" component={Add} />
        <Route path="/hello" component={Testing} />
      </Layout>
    )
  }
}
