This React project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The app has been designed to be highly modular so the components can be re-used. The following are the main components involved:

1) App - which is the main container component that wraps and launches the whole application. It represents the starting point of our app.
2) Card - which represents the card component.
3) CardList - which iterates over the provided input data set to display a collection of cards.
4) SearchBox - where the user can type a card name to filter the collection with.
5) InfiniteScroll - which handles the heavy lifting of the app, including fetching the data from the API through a pagination mechanism, handling scroll events and rendering the filtered collection based on the current input search term.

Card, CardList and SearchBox are functional components that do not require state, which has instead been defined in the App and InfiniteScroll class components. This keeps the design clean by also maintaining a clear separation of concerns for each module/component in our application.

When the user searches for a card name, that will be passed as a prop to the InfiniteScroll component, which in turn will show the updated card collection. The other state changes are reflected when the user scolls the page; the code makes an initial async call to fetch the cards API endpoint when the InfiniteScroll component has mounted (which is done in the componentDidMoun life cycle method). This process occurs through pagination, and the code initially fetches the data from the first page - that is sliced down to the first 20 items. 

As the user scrolls down, 20 more cards are displayed (without more fetching at this time, since the data has already been fetched as part of the page), and we keep displaying 20 more cards until we reach the end of the page, at which point we make another API call to fetch the items from the next page (assuming the current count hasn't exceeded the total count).

The InfiniteScroll component has been designed to be extremely flexible and re-usable against other scenarios that involve scrolling through / display / filtering a data collection, without being tied to the specifics of a particular entity definition. In fact, once we pass the endpoint we want to fetch the card data from, the code would work identically for other entity types that involve a similar scenario and where the state definition has the same shape/structure. Going one step beyond, we could also rename the Card and CardList components to be Item and ItemList instead - since their code representation is not really bound to a card, but can be abstracted one step further to any type of item in general.

Last but not least, the app is also responsive and displays nicely both when shrinking down the browser window and when on a mobile device. In terms of perceived performance, the app is quick and nicely shows the benefits of a Single Page Application, where state changes are reflected very efficiently through React updates made by the Virtual DOM under the hood.

Potential improvements / TODOs:
1) Fix the vertical disalignment of some cards, since some of the related images occupy a different position within the image itself.
2) At times and unfrequently, it has been noticed that after scrolling down for a while, it's necessary to scroll back for just a tiny bit before scrolling back down continues to fetch more data. This is likely due to something related to the way we calculate the offset of the last element in the list and the space buffer involved in the calculation. 
3) The loading indicator seems to work fine at the top of the card collection, but doesn't seem to show up later when scrolling down and making more fetch calls.

Component implementation alternatives:
1) Initially, the use of React Bootstrap and of the React Infinite Scroll Component were considered - in order to maximize code re-usability based on existing npm modules on the Web. However I found it more interesting and better suited to fulfill the requirements of the app to build new custom components - that have been designed to be re-used across other scenarios and input data sets.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all module dependencies, as specified by package.json.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
