import {Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'

import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
  </Switch>
)

export default App
