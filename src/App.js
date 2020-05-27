import React from 'react';
import './App.scss';
import { CardList } from './components/CardList/card-list';
import { InfiniteScroll } from './components/InfiniteScroll/infinite-scroll';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="app-container">
        <InfiniteScroll component={CardList} />
      </div>
    );
  }
}

export default App;
