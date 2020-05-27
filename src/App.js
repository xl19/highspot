import React from 'react';
import './App.scss';
import { CardList } from './components/CardList/card-list';
import { LoadingIndicator } from './components/Loader/loader';
import { Infinitescroll } from './components/InfiniteScroll/infinite-scroll';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cards: [],
      page: 1,
      totalCount: 0,
      isLoaded: false
    };
  }

  componentDidMount() {
    this.loadCards();
    
    this.scrollListener = window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  loadCards = () => {
    const { cards, totalCount } = this.state;
    const cardsApiUrl = `https://api.elderscrollslegends.io/v1/cards?page=${this.state.page}`;

    if (totalCount === 0 || cards.length < totalCount) {
      fetch(cardsApiUrl)
        .then(response => response.json())
          .then(
            (json) => {
              console.log(json);
              this.setState({
                isLoaded: true,
                cards: [...cards, ...json.cards],
                scrolling: false,
                totalCount: json._totalCount
              });
            },
            (error) => {
              this.setState({
                isLoaded: false,
                error
              });
            }
          );
    }
  };

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        scrolling: true
      }),

      this.loadCards
    );
  };

  handleScroll = () => { 
    const lastCard = document.querySelector(".card-list > div.card-container:last-child");
    const lastCardOffset = lastCard.offsetTop + lastCard.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    
    if (pageOffset > lastCardOffset - 100) {
          this.loadMore();
      }
  };

  render() {
    return (
      <div className="app-container">
        <Infinitescroll />
        {this.state.isLoaded ? <CardList 
          cards={this.state.cards}>
        </CardList>
         : <LoadingIndicator />
        }
      </div>
    );
  }
}

export default App;
