const params = {
	page: '2',
	limit: '3',
	sort_type: 'dsc',
	sort_by: 'updatedAt',
};

const queryString = Object.keys(params)
	.map((key) => {
		encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
	})
	.join('&');

const objKeys = Object.keys(params)
	.map(
		(key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
	)
	.join('&');
console.log(objKeys);
