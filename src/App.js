import React, { Component } from 'react';
import RouteWithSubRoutes from './router/RouteWithSubRoutes'
import { indexRoutes } from './router'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
class App extends Component {
  constructor(props){
    super(props)
  }
  render () {
    console.log(this, '__this')
    return (
      <Router>
          <React.Fragment>
              <Switch>
                  {
                    indexRoutes && indexRoutes.map((route, index) => (
                      <RouteWithSubRoutes key={index} {...route} />
                    ))
                  }
              </Switch>
          </React.Fragment>
      </Router>
    )
  }
}

export default App;
