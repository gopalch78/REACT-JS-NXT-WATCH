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
      return (
        <div className={sidebarClassName}>
          <ul className="side-sub-container">
            <div className="all-container">
              <li>
                <AiFillHome className="main-icon" />
              </li>
              <li className="list-item">
                <Link to="/">Home</Link>
              </li>
            </div>
            <div className="all-container">
              <li>
                <AiOutlineFire className="main-icon" />
              </li>

              <li className="list-item">
                <Link to="/trending"> Trending</Link>
              </li>
            </div>
            <div className="all-container">
              <li>
                <SiYoutubegaming className="main-icon" />
              </li>
              <li className="list-item">
                <Link to="/gaming">Gaming</Link>
              </li>
            </div>
            <div className="all-container">
              <li>
                <BiListPlus className="main-icon" />
              </li>
              <li className="list-item">Saved videos</li>
            </div>
          </ul>
          <div>
            <h1 className="contact-heading">CONTACT US</h1>
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
              Enjoy! Now you to see your <br />
              channels and <br /> recommendations
            </p>
          </div>
        </div>
      )
    }}
  </NxtContext.Consumer>
)
export default SideContainer
