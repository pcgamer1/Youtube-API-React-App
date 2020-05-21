import React from 'react'
import SearchBar from './SearchBar'
import youtube from './apis/youtube'
import VideoList from './VideoList'
import VideoDetail from './VideoDetail'

require('dotenv').config()

console.log(process.env)

class App extends React.Component {

    state = { videos : [] , selectedVideo: null}

    componentDidMount() {
        this.onTextSubmit('India')
    }

    onVideoSelect = (video) => {
        this.setState({ selectedVideo:video })
        console.log(video)
    }

    onTextSubmit = async (text) => {
        const response = await youtube.get("/search", {
            params: {
              q: text,
              part: "snippet",
              maxResults: 5,
              key: process.env.REACT_APP_YOUTUBE_API_KEY,
              type: 'video'
            }
          });
          
        this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] })
    }

    render() {
        return (
            <div className='ui container'>
                <SearchBar onTextSubmit={this.onTextSubmit}/>
                <div className='ui grid'>
                    <div className='ui row'>
                        <div className='eleven wide column'>
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className='five wide column'>
                            <VideoList 
                                videos={this.state.videos} onVideoSelect={this.onVideoSelect}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App