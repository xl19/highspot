import React from "react";
import { LoadingIndicator } from '../Loader/loader';

export class InfiniteScroll extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            page: 1,
            totalCount: 0,
            isLoaded: false,
            error: ''
          };
    }

    componentDidMount() {
        this.loadCards();
      }
    
      componentWillMount() {
        this.scrollListener = window.addEventListener('scroll', this.handleScroll);
      }
    
      componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
      }
    
      loadCards = () => {
        const { data, totalCount } = this.state;
        const cardsApiUrl = `https://api.elderscrollslegends.io/v1/cards?page=${this.state.page}`;
    
        if (totalCount === 0 || data.length < totalCount) {
          fetch(cardsApiUrl)
            .then(response => response.json())
              .then(
                (json) => {
                  this.setState({
                    isLoaded: true,
                    data: [...data, ...json['cards']],
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
        console.log(this.props.component);
        return this.state.isLoaded ? 
            React.createElement(
                this.props.component, { data: this.state.data }
            ) : LoadingIndicator;
    }
};