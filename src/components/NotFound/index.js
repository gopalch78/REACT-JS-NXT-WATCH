import {Link} from 'react-router-dom'
import Header from '../Header'
import SideContainer from '../SideContainer'
import NxtContext from '../../context/CreateContext'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <div>
        <SideContainer />
      </div>
      <NxtContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const notClassName = isDarkTheme
            ? 'not-found-image-paragraph-button-dark-container'
            : 'not-found-image-paragraph-button-light-container'
          const notImageUrl = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
          const headingClassName = isDarkTheme
            ? 'not-heading-dark'
            : 'not-heading-light'
          const paragraphClassName = isDarkTheme
            ? 'not-paragraph-dark'
            : 'not-paragraph-light'
          const imageClassName = isDarkTheme ? 'dark-image' : 'light-image'
          const notButton = isDarkTheme ? 'not-button-dark' : 'not-button-light'
          return (
            <div className={notClassName}>
              <img
                src={notImageUrl}
                alt="not found"
                className={imageClassName}
              />
              <h1 className={headingClassName}>Page Not Found</h1>
              <p className={paragraphClassName}>
                we are sorry, the page you requested could not be found.
              </p>
              <button type="button" className={notButton}>
                <Link to="/">Home</Link>
              </button>
            </div>
          )
        }}
      </NxtContext.Consumer>
    </div>
  </>
)

export default NotFound
