import React from 'react';
import './App.scss';
import { CardList } from './components/CardList/card-list';
import { InfiniteScroll } from './components/InfiniteScroll/infinite-scroll';
import { cardsApiUrl } from './constants';

function App() {
    return (
      <div className="app-container">
        <InfiniteScroll component={CardList} url={cardsApiUrl} dataProperty={'cards'} />
      </div>
    );
}

export default App;
