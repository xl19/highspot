import React from 'react';
import './App.scss';
import { CardList } from './components/CardList/card-list';
import { InfiniteScroll } from './components/InfiniteScroll/infinite-scroll';
import { cardsApiUrl } from './constants';
import { SearchBox } from './components/SearchBox/search-box';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchField: ''
    };
  }

  render() {
    return (
      <div className="app-container">
        <SearchBox 
          placeholder="Search cards" 
          handleChange={e => this.setState({
            searchField: e.target.value
          })} />

        <InfiniteScroll 
          component={CardList} 
          url={cardsApiUrl} 
          dataProperty={'cards'} 
          searchField={this.state.searchField} 
        />
      </div>
    );
  }
}

export default App;
