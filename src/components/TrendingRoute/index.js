import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import SideContainer from '../SideContainer'

import TrendingItem from '../TrendingItem'

import NxtContext from '../../context/CreateContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingRoute extends Component {
  state = {
    trendingData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingData()
  }

  getTrendingData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const homeVideosApiUrl = `https://apis.ccbp.in/videos/trending`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(homeVideosApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))
      this.setState({
        trendingData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetry = () => {
    this.getTrendingData()
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
            <p>We are having some trouble</p>
            <p>Please try again.</p>
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

  renderHomeVideoItem = () => {
    const {trendingData} = this.state

    return (
      <ul className="un-order-home-video-container">
        {trendingData.length > 0 ? (
          trendingData.map(each => (
            <TrendingItem TrendingItemDetails={each} key={each.id} />
          ))
        ) : (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt=" no videos"
            />
            <h1>No Search results found</h1>
            <p>Try different key words or remove search filter</p>
            <button type="button" onClick={this.onClickRetry}>
              Retry
            </button>
          </div>
        )}
      </ul>
    )
  }

  renderHomeDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomeVideoItem()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div data-testid="trending">
        <Header />
        <div className="side-by-side-container">
          <div className="side-first-container">
            <SideContainer />
          </div>
          <div className="premium-non-premium-container">
            <div className="home-video-container">
              <h1>Trending</h1>
              <div className="search-container">{this.renderHomeDetails()}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TrendingRoute
