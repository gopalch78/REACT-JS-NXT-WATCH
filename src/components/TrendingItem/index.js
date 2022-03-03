import './index.css'

const TrendingItem = props => {
  const {TrendingItemDetails} = props
  const {
    title,
    name,
    profileImageUrl,
    thumbnailUrl,
    viewCount,
    publishedAt,
  } = TrendingItemDetails

  return (
    <li className="list-home-item-container">
      <div className="image-container">
        <img
          src={thumbnailUrl}
          alt=" video thumbnail"
          className="thumbnail-url"
        />
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
    </li>
  )
}
export default TrendingItem
