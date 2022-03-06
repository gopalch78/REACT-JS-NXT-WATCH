import {Link} from 'react-router-dom'

import './index.css'

const TrendingItem = props => {
  const {TrendingItemDetails} = props
  const {
    title,
    id,
    name,
    profileImageUrl,
    thumbnailUrl,
    viewCount,
    publishedAt,
  } = TrendingItemDetails

  return (
    <div className="list-home-item-container">
      <div className="image-container">
        <Link to={`/videos/${id}`}>
          <img
            src={thumbnailUrl}
            alt="video thumbnail"
            className="thumbnail-url"
          />
        </Link>
      </div>
      <div className="profile-name-title-container">
        <div>
          <img
            src={profileImageUrl}
            alt="channel logo"
            className="channel-logo"
          />
        </div>
        <div className="title-name-container">
          <p className="title">{title}</p>
          <p className="name">{name}</p>

          <div>
            <p className="view-count">{viewCount}</p>
            <p className="published">{publishedAt}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TrendingItem
