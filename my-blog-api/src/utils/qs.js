const generateQueryString = (query) => {
	if (!query) return '';
	return Object.keys(query)
		.map(
			(key) =>
				encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
		)
		.join('&');
};

module.exports = { generateQueryString };
