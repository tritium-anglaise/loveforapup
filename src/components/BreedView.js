import React from 'react';
import PropTypes from 'prop-types';

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
			})
		});
	};

	componentDidUpdate(prevProps) {
		// without this check React will continually be surprised by the new
		// pup pic and request a new one immediately after the src of the
		// last was set.
		if(this.props.currentBreed !== prevProps.currentBreed ){
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

					<img src={this.state.breedPic} alt=""/>

					<button onClick={this.fetchAndUpdatePic}>Let's See Another!</button>
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