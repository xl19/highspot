import React from 'react';
import './App.scss';
import { CardList } from './components/CardList/card-list';
import { InfiniteScroll } from './components/InfiniteScroll/infinite-scroll';
import { cardsApiUrl } from './constants';
import { SearchBox } from './components/SearchBox/search-box';

// This is the main React component used to launch the application
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchTerm: ''
    };
  }

  render() {
    return (
      <div className="app-container">
        <SearchBox 
          placeholder="Search cards" 
          handleChange={e => this.setState({
            searchTerm: e.target.value
          })} />

        <InfiniteScroll 
          component={CardList} 
          url={cardsApiUrl} 
          dataProperty={'cards'} 
          searchTerm={this.state.searchTerm} 
        />
      </div>
    );
  }
}

export default App;
