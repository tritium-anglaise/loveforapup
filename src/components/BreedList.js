import React from 'react';
import PropTypes from 'prop-types';

import {fetchBreedList} from '../util/fetch-handler';

class BreedList extends React.Component {
	state = {
		breedList: []
	};

	static propTypes = {
		changeBreed: PropTypes.func.isRequired
	};

	componentDidMount() {
		fetchBreedList().then((response) => {
			let breed,
				breedList = [];

			for(breed in response.message) {
				breedList.push({
					breed: breed,
					subBreeds: response.message[breed]
				});
			}

			this.setState({
				breedList: breedList
			});
		})
	}

	render() {
		return(
			<div id="breedList">
				<ul>
					{this.state.breedList.map( breed  =>
						<li className={breed.breed === this.props.currentBreed ? 'selected' : ''}
									key={breed.breed}
								   	onClick={this.props.changeBreed}>{breed.breed}</li>)
					}
				</ul>
			</div>
		);
	}
}

export default BreedList;