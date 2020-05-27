import React from 'react';
import './App.scss';
import { CardList } from './components/CardList/card-list';
import { LoadingIndicator } from './components/Loader/loader';
import { Infinitescroll } from './components/InfiniteScroll/infinite-scroll';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      isLoaded: false,
      data: [],
      per: 3,
      page: 1,
      total_pages: null,
    };
  }

  componentDidMount() {
    this.loadCards();
    
    this.scrollListener = window.addEventListener("scroll", e => {
      this.handleScroll(e);
    });
  }

  loadCards = () => {
    // const { per, page, data } = this.state;
    // https://api.elderscrollslegends.io/v1/cards?page=2
    const cardsApiUrl = 'https://api.elderscrollslegends.io/v1/cards?page=2';
      fetch(cardsApiUrl)
        .then(response => response.json())
          .then(
            (json) => {
              // console.log(data);
              this.setState({
                isLoaded: true,
                // data: [...json, ...json.cards],
                data: json,
                scrolling: false,
                pageCount: json._totalCount
              });
            },
            (error) => {
              this.setState({
                isLoaded: false,
                error
              });
            }
          );
  };

  loadMore = () => {
    alert('loading more data');
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        scrolling: true
      }),

      this.loadCards
    );
  };

  handleScroll = () => { 
    var lastLi = document.querySelector(".card-list > div.card-container:last-child");
    var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
    var pageOffset = window.pageYOffset + window.innerHeight;
    
    if (pageOffset > lastLiOffset) {
          this.loadMore();
      }
  };

  render() {
    return (
      <div className="app-container">
        <Infinitescroll />
        {this.state.isLoaded ? <CardList 
          cards={this.state.data.cards}>
        </CardList>
         : <LoadingIndicator />
        }
      </div>
    );
  }
}

export default App;
