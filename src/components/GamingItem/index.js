import NxtContext from '../../context/CreateContext'

import './index.css'

const GamingItem = props => {
  const {gameItemDetails} = props
  const {title, thumbnailUrl, viewCount} = gameItemDetails
  return (
    <NxtContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const titleClassName = isDarkTheme ? 'title-dark' : 'title-light'
        return (
          <li className="list-gaming-container">
            <div className="image-gaming-container">
              <img
                src={thumbnailUrl}
                alt=" video thumbnail"
                className="gaming-thumbnail-url"
              />
            </div>
            <div className="title-view-count-container">
              <p className={titleClassName}>{title}</p>
              <p className=" gaming-view-count">
                {viewCount} Watching Worldwide
              </p>
            </div>
          </li>
        )
      }}
    </NxtContext.Consumer>
  )
}
export default GamingItem
