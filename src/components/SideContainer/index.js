import {AiFillHome, AiOutlineFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'

import './index.css'

const SideContainer = () => (
  <div className="side-container">
    <ul className="side-sub-container">
      <div className="all-container">
        <li>
          <AiFillHome className="main-icon" />
        </li>
        <li className="list-item">Home</li>
      </div>
      <div className="all-container">
        <li>
          <AiOutlineFire className="main-icon" />
        </li>

        <li className="list-item">Trending</li>
      </div>
      <div className="all-container">
        <li>
          <SiYoutubegaming className="main-icon" />
        </li>
        <li className="list-item">Gaming</li>
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
export default SideContainer
