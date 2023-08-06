const paginationService = ({ page = 1, limit = 10, totalItems }) => {
	if (totalItems < 1) {
		const error = new Error('Total page less then one ');
		throw error;
	}
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

module.exports = paginationService;
