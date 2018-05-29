import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetails from './components/video_detail';

const API_KEY = "AIzaSyBa9O5InZdtmsfc2Gq_asAvCM7YQtxJi9Q";


class App extends Component  {
  constructor(props){
    super(props);

    this.state = {
      videos : [],
      selectedVideo: null
    };

    this.videoSearch("O mere dil k chain");






  }
  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos : videos,
        selectedVideo: videos[0]
      });
    });
  }

  render(){

    const videoSearch = _.debounce((term) => {this.videoSearch(term)},300);
    return (
          <div>
            <SearchBar onSearchTermChange={(term) => videoSearch(term)}/>
            <VideoDetails video={this.state.selectedVideo} />
            <VideoList
            onVideoSelect = { selectedVideo => this.setState({selectedVideo}) }
            videos = {this.state.videos}/>
         </div>
       );
  }

}

ReactDOM.render(<App/>, document.querySelector('.container'));
