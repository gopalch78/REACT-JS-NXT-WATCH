import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import ReactPlayer from 'react-player'

import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'

import Header from '../Header'

import SideContainer from '../SideContainer'

import NxtContext from '../../context/CreateContext'

import './index.css'

const apiStatusConstantsVideo = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoItemData: [],
    apiStatus: apiStatusConstantsVideo.initial,
    isLike: false,
    isDislike: false,
    isSaved: false,
  }

  componentDidMount() {
    this.getVideoItemDetails()
  }

  getVideoItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstantsVideo.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedVideoDetailsData = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      }

      this.setState({
        videoItemData: updatedVideoDetailsData,
        apiStatus: apiStatusConstantsVideo.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstantsVideo.failure,
      })
    }
  }

  onClickRetry = () => {
    this.getVideoItemDetails()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <NxtContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const videoImageClassName = isDarkTheme
          ? ' https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : ' https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <div className="product-details-error-view-container">
            <img
              alt="failure view"
              src={videoImageClassName}
              className="error-view-image"
            />
            <h1 className="product-not-found-heading">
              Oops! Something Went Wrong
            </h1>
            <p>
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button
              type="button"
              className="button"
              onClick={this.onClickRetry}
            >
              Retry
            </button>
          </div>
        )
      }}
    </NxtContext.Consumer>
  )

  renderVideoPopUpReactDetails = () => {
    const {videoItemData, isLike, isDislike, isSaved} = this.state

    const {
      title,
      videoUrl,
      name,
      profileImageUrl,
      subscriberCount,
      viewCount,
      publishedAt,
      description,
    } = videoItemData
    return (
      <NxtContext.Consumer>
        {value => {
          const {isDarkTheme, saveVideoButtonClicked} = value
          const backgroundClassName = isDarkTheme
            ? 'react-player-dark'
            : 'react-player-light'

          const headingClassName = isDarkTheme
            ? 'react-player-heading-dark'
            : 'react-player-heading-light'

          const likeClassName = isLike ? 'selected' : 'not-selected'
          const disLikeClassName = isDislike ? 'selected' : 'not-selected'
          const saveClassName = isSaved ? 'selected' : 'not-selected'
          const saveButtonIconClassName = isSaved ? 'selected' : 'not-select'
          const saveButtonText = isSaved ? 'Saved' : 'Save'
          const buttonColorLikeClassName = isLike ? 'button-color ' : 'button'
          const buttonColorDisLikeClassName = isDislike
            ? 'button-dis-color'
            : 'button-dis'

          const onSaveButtonClicked = () => {
            this.setState(prevState => ({
              isSaved: !prevState.isSaved,
            }))

            saveVideoButtonClicked(videoItemData)
          }

          const onLikeButtonClicked = () => {
            this.setState({isLike: true, isDislike: false})
          }

          const onDislikeButtonClicked = () => {
            this.setState({isDislike: true, isLike: false})
          }

          return (
            <div className={backgroundClassName}>
              <ReactPlayer url={videoUrl} controls width="100%" height="70vh" />
              <p className={headingClassName}>{title}</p>
              <div className="react-player-like-dislike-save-container">
                <div className="view-published-container">
                  <p>{viewCount}</p>
                  <p>{publishedAt}</p>
                </div>

                <div className="like-dislike-save-container">
                  <AiOutlineLike
                    className={` icon-in-video-item ${likeClassName}`}
                  />

                  <button
                    type="button"
                    className={buttonColorLikeClassName}
                    onClick={onLikeButtonClicked}
                  >
                    Like
                  </button>

                  <AiOutlineDislike
                    className={`icon-in-video-item ${disLikeClassName}`}
                  />
                  <button
                    type="button"
                    className={buttonColorDisLikeClassName}
                    onClick={onDislikeButtonClicked}
                  >
                    Dislike
                  </button>
                  <BiListPlus
                    className={`icon-in-video-item ${saveButtonIconClassName}`}
                  />
                  <button
                    type="button"
                    onClick={onSaveButtonClicked}
                    className={saveClassName}
                  >
                    {saveButtonText}
                  </button>
                </div>
              </div>
              <hr />
              <div className="image-container">
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className="profile"
                />
                <div className="name-container">
                  <p>{name}</p>
                  <div>
                    <p>{subscriberCount}subscribers</p>
                  </div>
                </div>
              </div>
              <p>{description}</p>
            </div>
          )
        }}
      </NxtContext.Consumer>
    )
  }

  renderVideoDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstantsVideo.success:
        return this.renderVideoPopUpReactDetails()
      case apiStatusConstantsVideo.failure:
        return this.renderFailureView()
      case apiStatusConstantsVideo.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div data-testid="videoItemDetails">
          <Header />
          <div className="video-item-container">
            <div>
              <SideContainer />
            </div>
            <div className="w-100">{this.renderVideoDetails()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default VideoItemDetails
