import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {IoIosClose} from 'react-icons/io'

import {BsSearch} from 'react-icons/bs'

import HomeVideoItem from '../HomeVideoItem'

import Header from '../Header'

import SideContainer from '../SideContainer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {videosData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getVideosData()
  }

  getVideosData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const homeVideosApiUrl = `https://apis.ccbp.in/videos/all?search=`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(homeVideosApiUrl, options)
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
    console.log(updatedData)
    this.setState({
      videosData: updatedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Opps! Something Went Wrong</h1>
      <p>We are having some trouble to complete your request.</p>
      <p>Please try again.</p>
      <button type="button" className="button">
        Retry
      </button>
    </div>
  )

  renderHomeVideoItem = () => {
    const {videosData} = this.state
    return (
      <ul className="un-order-home-video-container">
        {videosData.map(each => (
          <HomeVideoItem homeItemDetails={each} key={each.id} />
        ))}
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
      <div>
        <Header />
        <div className="side-by-side-container">
          <div className="side-first-container">
            <SideContainer />
          </div>
          <div className="premium-non-premium-container">
            <div className="side-second-container">
              <img
                src=" https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="dark"
                className="nxt-image"
              />
              <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
              <button type="button">GET IT NOW</button>
            </div>

            <div className="home-video-container">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="search-"
                  className="input-field"
                />
                <button type="button" className="search-button">
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.renderHomeDetails()}
            </div>
          </div>
          <IoIosClose className="close" />
        </div>
      </div>
    )
  }
}

export default Home
