import {withRouter} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'

import {BsSun} from 'react-icons/bs'

import Cookies from 'js-cookie'

import NxtContext from '../../context/CreateContext'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderLogout = () => (
    <NxtContext.Consumer>
      {value => {
        const {isDarkTheme, toggleTheme} = value
        const websiteLogoImageURL = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        const navbarBgClassName = isDarkTheme
          ? 'navbar-bg-dark'
          : 'navbar-bg-light'

        return (
          <>
            <div className={navbarBgClassName}>
              <div className="header-container">
                <div>
                  <img
                    src={websiteLogoImageURL}
                    alt="dark-theme"
                    className="nxt-watch-light-dark-theme"
                  />
                </div>
                <div className="un-order-list-container">
                  <ul className="header-un-order-list">
                    {isDarkTheme ? (
                      <BsSun onClick={toggleTheme} className="icon" />
                    ) : (
                      <FaMoon onClick={toggleTheme} className="icon-1" />
                    )}

                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
                      alt="profile"
                      className="nxt-watch-Profile"
                    />

                    <button
                      type="button"
                      onClick={onClickLogout}
                      className="logout-button"
                    >
                      Logout
                    </button>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )
      }}
    </NxtContext.Consumer>
  )
  return <> {renderLogout()} </>
}

export default withRouter(Header)
