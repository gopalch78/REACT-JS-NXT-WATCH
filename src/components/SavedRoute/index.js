import {Component} from 'react'

import {AiOutlineFire} from 'react-icons/ai'

import Header from '../Header'

import SideContainer from '../SideContainer'

import TrendingItem from '../TrendingItem'

import NxtContext from '../../context/CreateContext'

class SavedRoute extends Component {
  renderSavedRoute = () => (
    <NxtContext.Consumer>
      {value => {
        const {savedVideosList} = value

        return (
          <>
            <Header />
            <div data-testid="savedVideos">
              <SideContainer />
              <div>
                {savedVideosList.length === 0 ? (
                  <div>
                    <img
                      alt="no saved videos"
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    />
                    <h1>No saved videos found</h1>
                    <p>Save your videos by clicking a button</p>
                  </div>
                ) : (
                  <div>
                    <AiOutlineFire className="header-icon" />
                    <h1>Saved Videos</h1>
                    <ul>
                      {savedVideosList.map(each => (
                        <TrendingItem key={each} TrendingItemDetails={each} />
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </>
        )
      }}
    </NxtContext.Consumer>
  )

  render() {
    return <>{this.renderSavedRoute()}</>
  }
}

export default SavedRoute
