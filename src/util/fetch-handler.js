const API_ENDPOINT = 'https://dog.ceo/api',
	ALL_BREED_PATH = '/breeds/list/all',
	BREED_PATH = '/breed',
	IMAGE_PATH = '/images/random';

function makeAPIRequest(url) {
	return new Promise(
		( resolve, reject ) => {
			fetch( url )
				.then(( response ) => {
					resolve(
						response.json()
					);
				})
		}
	)
}

function fetchBreedList() {
	let url = API_ENDPOINT + ALL_BREED_PATH;

	return makeAPIRequest(url);
}

function fetchBreedPic(breed, subBreed=false) {
	let url = API_ENDPOINT + BREED_PATH + '/' + breed;

	// if we're requesting a sub-breed pic, add that value to the
	// url prior to the IMAGE_PATH
	// regular breed request looks like: /breed/pug/images/random
	// and a sub-breed request looks like: /breed/hound/afghan/images/random
	url += subBreed ? `${subBreed}/${IMAGE_PATH}` : IMAGE_PATH;

	return makeAPIRequest(url);
}

export {fetchBreedList, fetchBreedPic};