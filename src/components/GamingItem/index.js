import {Link} from 'react-router-dom'

import NxtContext from '../../context/CreateContext'

import './index.css'

const GamingItem = props => {
  const {gameItemDetails} = props
  const {title, thumbnailUrl, id, viewCount} = gameItemDetails
  return (
    <NxtContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const titleClassName = isDarkTheme ? 'title-dark' : 'title-light'
        return (
          <li className="list-gaming-container">
            <div className="image-gaming-container">
              <Link to={`/videos/${id}`}>
                <img
                  src={thumbnailUrl}
                  alt=" video thumbnail"
                  className="gaming-thumbnail-url"
                />
              </Link>
            </div>
            <div className="title-view-count-container">
              <p className={titleClassName}>{title}</p>
              <p className={titleClassName}>{viewCount} Watching Worldwide</p>
            </div>
          </li>
        )
      }}
    </NxtContext.Consumer>
  )
}
export default GamingItem
