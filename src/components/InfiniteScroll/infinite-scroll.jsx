import React from "react";
import { LoadingIndicator } from '../Loader/loader';

export class InfiniteScroll extends React.Component {
    constructor(props) {
        super(props);

        this.itemsPerTime = 20;

        this.state = {
            data: [],
            page: 1,
            currentCount: this.itemsPerTime,
            totalCount: 0,
            pageSize: 0,
            searchField: '',
            isLoaded: false,
            error: ''
        };
    }

    componentDidMount() {
        this.scrollListener = window.addEventListener('scroll', this.handleScroll);
        this.loadData();
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
                            totalCount: json._totalCount,
                            pageSize: json._pageSize
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
            if (this.state.currentCount % this.state.pageSize === 0) {
                this.loadMore();
            }

            this.setState({
                currentCount: this.state.currentCount + this.itemsPerTime
            });
        }
    };

    render() {
        const filteredData = this.state.data.filter(
            element => element.name.toLowerCase().includes(this.props.searchField.toLowerCase())
        );
        const slicedData = filteredData.slice(0, this.state.currentCount);

        return this.state.isLoaded ? <this.props.component data={slicedData} /> : <LoadingIndicator />;
    }
};