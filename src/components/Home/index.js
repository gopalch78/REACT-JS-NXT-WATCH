import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {IoIosClose} from 'react-icons/io'

import {BsSearch} from 'react-icons/bs'

import HomeVideoItem from '../HomeVideoItem'

import Header from '../Header'

import SideContainer from '../SideContainer'

import NxtContext from '../../context/CreateContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    videosData: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    bannerVisible: true,
  }

  componentDidMount() {
    this.getVideosData()
  }

  getVideosData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const homeVideosApiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
        videosData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickRetry = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.getVideosData)
  }

  onClickRemove = () => {
    this.setState({bannerVisible: false})
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

  renderHomeVideoItem = () => {
    const {videosData, searchInput} = this.state
    const searchResults = videosData.filter(each =>
      each.name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <ul className="un-order-home-video-container">
        {searchResults.length > 0 ? (
          searchResults.map(each => (
            <HomeVideoItem homeItemDetails={each} key={each.id} />
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
    const {searchInput, bannerVisible} = this.state
    const bannerClass = bannerVisible ? '' : 'hide'
    return (
      <div>
        <Header />

        <div className="side-by-side-container" data-testid="home">
          <div className="side-first-container">
            <SideContainer />
          </div>
          <div>
            <div className="premium-non-premium-container">
              <div
                className={`side-second-container ${bannerClass}`}
                data-testid="banner"
              >
                <div className="image-close-container">
                  <img
                    src=" https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                    alt="nxt watch logo"
                    className="nxt-image"
                  />
                  <button
                    type="button"
                    className="close-button"
                    onClick={this.onClickRemove}
                    data-testid="close"
                  >
                    <IoIosClose className="close" />
                  </button>
                </div>
                <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                <button type="button">GET IT NOW</button>
              </div>
            </div>
            <div className="home-video-container">
              <div className="search-container">
                <input
                  type="search"
                  placeholder="search-"
                  className="input-field"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
                <button
                  type="button"
                  className="search-button"
                  data-testid="searchButton"
                >
                  <BsSearch
                    className="search-icon"
                    onClick={this.onClickRetry}
                  />
                </button>
              </div>
              {this.renderHomeDetails()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
