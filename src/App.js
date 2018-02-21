import React from 'react';
import BreedList from './components/BreedList';
import BreedView from './components/BreedView';

class App extends React.Component {
	state = {
		currentBreed: null
	};

	changeBreed = (e) => {
		this.setState({
			currentBreed: e.target.innerText.toLowerCase()
		});
	};

	render() {
		return (
			<div>
				<BreedList currentBreed={this.state.currentBreed} changeBreed={this.changeBreed} />
				<BreedView currentBreed={this.state.currentBreed} changeBreed={this.changeBreed}/>
			</div>
		);
	}
}

export default App;
