import React, { Component } from "react"
import { Route, Redirect, Switch } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Vinyls from "./components/vinyls"
import VinylForm from "./components/vinyls/form"
import NavBar from "./components/navBar"
import { getVinyls } from "./services/vinylService"
import { connect } from 'react-redux'
import { setInitialVinyls } from './redux/actions/actions'

class App extends Component {

  async componentDidMount() {
    const { data } = await getVinyls()
    console.log("data", data)
    this.props.setInitialVinyls(data)
  }

  render() {
 
    return (
      <div className="container-fluid">
        <ToastContainer />
        <NavBar />
        <div className="container py-4">
          <Switch>
            <Route path="/vinyls/:id" component={VinylForm} />
            <Route path="/vinyls" component={Vinyls} />
            <Redirect from="/" exact to="/vinyls" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapDispatchToProprs = {
  setInitialVinyls
}

export default connect(null, mapDispatchToProprs)(App)
