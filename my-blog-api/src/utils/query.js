const defaults = require('../config/defaults');
const { generateQueryString } = require('./qs');
const getPagination = ({
	page = defaults.page,
	limit = defaults.limit,
	totalItems = defaults.totalItems,
}) => {
	const totalPage = Math.ceil(totalItems / limit);
	const pagination = {
		page,
		limit,
		totalItems,
		totalPage,
	};
	if (page < totalPage) {
		pagination.nextPage = page + 1;
	}
	if (page > 1) {
		pagination.prevPage = page - 1;
	}
	return pagination;
};

const getHATEOASForAllItems = ({
	page = 1,
	url = '/',
	path = '',
	query = {},
	hasPrev,
	hasNext,
}) => {
	const links = {
		self: url,
	};
	if (hasPrev) {
		const queryStr = generateQueryString({ ...query, page: page - 1 });
		links.prev = `${path}?${queryStr}`;
	}
	if (hasNext) {
		const queryStr = generateQueryString({ ...query, page: page + 1 });
		links.next = `${path}?${queryStr}`;
	}
	return links;
};

const getTransformedItems = ({ items = [], selection = [], path }) => {
	if (!Array.isArray(items) || !Array.isArray(selection)) {
		throw new Error('Invalid Arguments');
	}
	if (selection.length === 0) {
		return items.map((item) => ({ ...item, link: `${path}/${item.id}` }));
	}

	return items.map((item) => {
		const result = {};
		selection.forEach((key) => {
			result[key] = item[key];
		});
		result.link = `${path}/${item.id}`;
		return result;
	});
};

module.exports = {
	getPagination,
	getHATEOASForAllItems,
	getTransformedItems,
};
