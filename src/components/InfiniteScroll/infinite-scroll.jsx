import React from "react";
import { LoadingIndicator } from '../Loader/loader';

/* This component implements an "infinite scrolling" mechanism and is completely data agnostic.
 * It can be re-used and fed with any data set where the state shape has a compatible structure.
*/
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
            searchTerm: '',
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

        // We only fetch more data if the current data set length is smaller than the total count
        if (totalCount === 0 || data.length < totalCount) {
            fetch(this.props.url(this.state.page))
            .then(response => response.json())
                .then(
                    (json) => {
                        // Append additional data to the current state with the spread operator.
                        // We dynamically pass the name of the property containing the actual data as a prop,
                        // which keeps the component data agnostic.
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

    // Let's go to the next page.
    loadMoreData = () => {
        this.setState(
            prevState => ({
                page: prevState.page + 1,
                scrolling: true
            }),

            this.loadData
        );
    };

    // We dynamically calculate the offset of the last element in the list, to detect the end of the page
    handleScroll = () => { 
        const lastElement = document.querySelector(".item-list > div.item-container:last-child");
        const lastElementOffset = lastElement.offsetTop + lastElement.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;
        const spaceBuffer = 100;
        
        /* If we reached the end of the page, check the current count and load more data from the API. 
         * 100 pixels have been hard-coded and represent an extra space buffer to detect
         * when the user reaches the end of the page while scrolling down.
         */ 
        if (pageOffset > lastElementOffset - spaceBuffer) {
            // If the current count is multiple than the page size, it's time to make another API call
            if (this.state.currentCount % this.state.pageSize === 0) {
                this.loadMoreData();
            }

            // Update the current count to reflect how many items we are showing in the UI
            this.setState({
                currentCount: this.state.currentCount + this.itemsPerTime
            });
        }
    };

    render() {
        // Filter the current data set by the current search term typed by the user
        const filteredData = this.state.data.filter(
            element => element.name.toLowerCase().includes(this.props.searchTerm.toLowerCase())
        );

        // Only show a predefined number of items per each request - starting with 20 in our case.
        const slicedData = filteredData.slice(0, this.state.currentCount);

        return this.state.isLoaded ? <this.props.component data={slicedData} /> : <LoadingIndicator />;
    }
};