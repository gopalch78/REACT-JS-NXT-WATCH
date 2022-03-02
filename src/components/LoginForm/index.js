import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import NxtContext from '../../context/CreateContext'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    isChecked: false,
  }

  onChecked = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password, isChecked} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type={isChecked ? 'text' : 'password'}
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  renderForm = () => (
    <NxtContext.Consumer>
      {value => {
        const {isDarkTheme, toggleTheme} = value
        const {isChecked, errorMsg, showSubmitError} = this.state
        const onChangeImage = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

        const activeDarkLightClassName = isDarkTheme ? 'active-Dark' : 'Light'

        return (
          <div className="login-form-container">
            <div className="login-container">
              <form
                className={activeDarkLightClassName}
                onSubmit={this.submitForm}
              >
                <img
                  src={onChangeImage}
                  alt="website logo"
                  className="watch"
                  onClick={toggleTheme}
                />
                <div className="input-container">
                  {this.renderUsernameField()}
                </div>
                <div className="input-container">
                  {this.renderPasswordField()}
                </div>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    className="checkbox"
                    id="isChecked"
                    value={isChecked}
                    checked={isChecked}
                    onChange={this.onChecked}
                  />
                  <label htmlFor="isChecked" className="show-password">
                    Show Password
                  </label>
                </div>

                <button type="submit" className="login-button">
                  Login
                </button>
                {showSubmitError && (
                  <p className="error-message">*{errorMsg}</p>
                )}
              </form>
            </div>
          </div>
        )
      }}
    </NxtContext.Consumer>
  )

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return <>{this.renderForm()}</>
  }
}
export default LoginForm
