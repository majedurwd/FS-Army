const generateQueryString = require('./generateQueryString');
const hateoasGenerator = (query = {}, path, prevPage, nextPage) => {
	const links = {
		self: `${path}?${generateQueryString(query)}`,
	};
	if (prevPage) {
		links.prev = `${path}?${generateQueryString({
			...query,
			page: prevPage,
		})}`;
	}
	if (nextPage) {
		links.next = `${path}?${generateQueryString({
			...query,
			page: nextPage,
		})}`;
	}
	return links;
};

module.exports = hateoasGenerator;
