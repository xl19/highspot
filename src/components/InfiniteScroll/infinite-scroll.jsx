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
        this.loadData();
    }

    componentWillMount() {
        this.scrollListener = window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    loadData = () => {
        const { data, totalCount } = this.state;

        if (totalCount === 0 || data.length < totalCount) {
            fetch(this.props.url(this.state.page))
            .then(response => response.json())
                .then(
                    (json) => {
                        this.setState({
                            isLoaded: true,
                            data: [...data, ...json[this.props.dataProperty]],
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

            this.loadData
        );
    };

    handleScroll = () => { 
        const lastElement = document.querySelector(".item-list > div.item-container:last-child");
        const lastElementOffset = lastElement.offsetTop + lastElement.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;
        
        if (pageOffset > lastElementOffset - 100) {
            this.loadMore();
        }
    };

    render() {
        return this.state.isLoaded ? <this.props.component data={this.state.data} /> : <LoadingIndicator />;
    }
};