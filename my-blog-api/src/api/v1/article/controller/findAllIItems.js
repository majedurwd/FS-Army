const articleService = require('../../../../lib/article');
const { qs, query } = require('../../../../utils');
const defaults = require('../../../../config/defaults');

const findAllItems = async (req, res, next) => {
	const page = +req.query.page || defaults.page;
	const limit = +req.query.limit || defaults.limit;
	const sortType = req.query.sort_type || defaults.sortType;
	const sortBy = req.query.sort_by || defaults.sortBy;
	const search = req.query.search || defaults.search;
	try {
		// Find all articles include query, pagination, hateoas
		const articles = await articleService.findAllItems({
			page,
			limit,
			sortType,
			sortBy,
			search,
		});
		const data = query.getTransformedItems({
			items: articles,
			selection: [
				'id',
				'title',
				'cover',
				'author',
				'createdAt',
				'updatedAt',
			],
			path: req.path,
		});

		// pagination
		const totalItems = await articleService.countItem({ search });
		const pagination = query.getPagination({ page, limit, totalItems });

		// HATEOAS Links
		const links = query.getHATEOASForAllItems({
			page,
			url: req.url,
			path: req.path,
			query: req.query,
			hasPrev: !!pagination.prevPage,
			hasNext: !!pagination.nextPage,
		});

		// Response
		res.status(200).json({
			data,
			pagination,
			links,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = findAllItems;
