import React from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardsResponse: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    const cardsApi = 'https://api.elderscrollslegends.io/v1/cards';
    
    fetch(cardsApi)
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            cardsResponse: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoaded ? <CardList 
          cards={this.state.cardsResponse.cards}>
        </CardList>
         : undefined
        }
      </div>
    );
  }
}

export default App;
