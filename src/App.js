import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home'
import VideoItemDetails from './components/VideoITemDetails'

import TrendingRoute from './components/TrendingRoute'
import GamingRoute from './components/GamingRoute'
import SavedRoute from './components/SavedRoute'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import NxtContext from './context/CreateContext'

import './App.css'

class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideosList: [],
  }

  toggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  saveVideoButtonClicked = id => {
    const {savedVideosList} = this.state
    const videoObject = savedVideosList.find(each => each.id === id)

    if (videoObject) {
      const filteredList = savedVideosList.filter(
        eachItem => eachItem.id !== id,
      )
      this.setState({
        savedVideosList: filteredList,
      })
    } else {
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, id],
      }))
    }
  }

  render() {
    const {isDarkTheme, savedVideosList} = this.state
    return (
      <NxtContext.Provider
        value={{
          isDarkTheme,
          savedVideosList,
          toggleTheme: this.toggleTheme,
          saveVideoButtonClicked: this.saveVideoButtonClicked,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />

          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute exact path="/saved-videos" component={SavedRoute} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </NxtContext.Provider>
    )
  }
}

export default App
