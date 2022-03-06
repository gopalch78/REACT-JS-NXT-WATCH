import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'

import SideContainer from '../SideContainer'

import GamingItem from '../GamingItem'

import NxtContext from '../../context/CreateContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GamingRoute extends Component {
  state = {
    gamingData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGamingData()
  }

  getGamingData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const gamingVideosApiUrl = `https://apis.ccbp.in/videos/gaming`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(gamingVideosApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
      }))
      this.setState({
        gamingData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetry = () => {
    this.getGamingData()
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
        const imageClassName = isDarkTheme
          ? ' https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : ' https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <div>
            <img
              alt="failure view"
              src={imageClassName}
              className="error-view-image"
            />
            <h1 className="gaming-not-found-heading">
              Oops! Something Went Wrong
            </h1>
            <p>We are having some trouble</p>
            <button
              type="button"
              className="gaming-retry-button"
              onClick={this.onClickRetry}
            >
              Retry
            </button>
          </div>
        )
      }}
    </NxtContext.Consumer>
  )

  renderGamingVideoItem = () => {
    const {gamingData} = this.state
    return (
      <ul className="un-order-home-video-container">
        {gamingData.map(each => (
          <GamingItem gameItemDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderHomeDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderGamingVideoItem()

      default:
        return null
    }
  }

  render() {
    return (
      <div data-testid="gaming">
        <NxtContext.Consumer>
          {value => {
            const {isDarkTheme} = value
            const gamingClassName = isDarkTheme ? 'gaming-dark' : 'gaming-light'
            const gamingHeadingClassName = isDarkTheme
              ? 'gaming-dark-heading'
              : 'gaming-light-heading'
            const gamingImageClassName = isDarkTheme
              ? 'gaming-icon-dark'
              : 'gaming-icon-light'
            const gamingIconClassName = isDarkTheme
              ? 'icon-dark-container'
              : 'icon-light-container'
            return (
              <>
                <div>
                  <Header />

                  <div className="game-container">
                    <div>
                      <SideContainer />
                    </div>
                    <div
                      className="gaming-combined-container"
                      data-testid="gaming"
                    >
                      <div className={gamingIconClassName}>
                        <h1 className={gamingHeadingClassName}>
                          <SiYoutubegaming className={gamingImageClassName} />
                          Gaming
                        </h1>
                      </div>
                      <div className={gamingClassName}>
                        {this.renderHomeDetails()}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          }}
        </NxtContext.Consumer>
      </div>
    )
  }
}

export default GamingRoute
