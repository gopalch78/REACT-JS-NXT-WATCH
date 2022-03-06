import {Link} from 'react-router-dom'
import {AiFillHome, AiOutlineFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import NxtContext from '../../context/CreateContext'
import './index.css'

const SideContainer = () => (
  <NxtContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const sidebarClassName = isDarkTheme
        ? 'sidebar-dark-container'
        : 'sidebar-light-container'
      const linkClassName = isDarkTheme ? 'link-dark' : 'link-light'
      const iconClassName = isDarkTheme ? 'color-icon-dark' : 'color-icon-light'
      return (
        <div className={sidebarClassName}>
          <ul className="side-sub-container">
            <div className="all-container">
              <li>
                <AiFillHome className={iconClassName} />
              </li>

              <li className="link list-item-home">
                <Link to="/" className={linkClassName}>
                  Home
                </Link>
              </li>
            </div>
            <div className="all-container">
              <li>
                <AiOutlineFire className={iconClassName} />
              </li>

              <li className="list-item-trend">
                <Link to="/trending" className={linkClassName}>
                  Trending
                </Link>
              </li>
            </div>
            <div className="all-container">
              <li>
                <SiYoutubegaming className={iconClassName} />
              </li>
              <li className="list-item-game">
                <Link to="/gaming" className={linkClassName}>
                  Gaming
                </Link>
              </li>
            </div>
            <div className="all-container">
              <li>
                <BiListPlus className={iconClassName} />
              </li>
              <li className="list-item-save">
                <Link to="/saved-videos" className={linkClassName}>
                  Saved videos
                </Link>
              </li>
            </div>
          </ul>
          <div>
            <p className="contact-heading">CONTACT US</p>
            <ul className="contact-us-container">
              <li>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                  className="logo"
                />
              </li>

              <li>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                  alt="twitter logo"
                  className="logo"
                />
              </li>

              <li>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
                  alt="linked in logo"
                  className="logo"
                />
              </li>
            </ul>
            <p className="contact-paragraph">
              Enjoy! Now to see your <br /> channels and <br />
              recommendations!
            </p>
          </div>
        </div>
      )
    }}
  </NxtContext.Consumer>
)
export default SideContainer
