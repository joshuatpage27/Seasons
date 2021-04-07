import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay.js';
import Loading from './Loading.js';

class App extends React.Component {
	constructor(props) {
		super(props);
//This is the only time we make a direct assignment of this.state
		this.state = { lat: null, errorMessage: '' };
	}

	componentDidMount() {
		window.navigator.geolocation.getCurrentPosition(
		(position) => this.setState({ lat: position.coords.latitude }),
		(err) => this.setState({ errormessage: err.message })
		);
	};

	renderContent() {
		if (this.state.errorMessage && !this.state.lat) {
			return <div>Error: {this.state.errorMessage}</div>;
		}
		if (!this.state.errorMessage && this.state.lat) {
			return <SeasonDisplay lat={this.state.lat} />
		}
		return <Loading message="Please accept location request" />;
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
};

ReactDOM.render(
	<App />,
 document.querySelector('#root')
 );