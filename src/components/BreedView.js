import React from 'react';
import PropTypes from 'prop-types';

// fetch api polyfill for slightly older browsers
import 'whatwg-fetch';

import {fetchBreedPic} from '../util/fetch-handler';

class BreedView extends React.Component {
	state = {
		breedPic: null,
		loading: false
	};

	static propTypes = {
		changeBreed: PropTypes.func.isRequired,
		currentBreed: PropTypes.string
	};

	fetchAndUpdatePic = () => {
		this.setState({
			loading: true
		});

		fetchBreedPic(this.props.currentBreed).then((response) => {
			this.setState({
				breedPic: response.message
			});
		});
	};

	clearLoadingFlag = () => {
		this.setState({
			loading: false
		})
	};

	componentDidUpdate(prevProps) {
		// without this check React will continually be surprised by the new
		// pup pic and request a new one immediately after the src of the
		// last was set.
		if(this.props.currentBreed !== prevProps.currentBreed ){
			// clear the picture when switching between breeds
			this.setState({
				breedPic: null
			});

			this.fetchAndUpdatePic();
		}
	}

	// load a pic when the user first clicks a breed from the breed list
	componentWillMount() {
		this.fetchAndUpdatePic();
	}

	render() {
		if(this.props.currentBreed){
			return(
				<div id="breedView">
					<h3>{this.props.currentBreed}</h3>

					<img onLoad={this.clearLoadingFlag} src={this.state.breedPic} alt=""/>

					<button onClick={this.fetchAndUpdatePic} disabled={this.state.loading}>Let's See Another!</button>
				</div>
			);
		} else {
			return(
				<div id="breedView">
					<h3 className="no-breed">Please select a breed from the list to the left.</h3>
				</div>
			)
		}


	}
}

export default BreedView;