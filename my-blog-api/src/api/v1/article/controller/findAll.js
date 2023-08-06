const articleService = require('../../../../lib/article');

const findAll = async (req, res, next) => {
	const page = +req.query.page || 1;
	const limit = +req.query.limit || 10;
	const sortType = req.query.sort_type || 'dsc';
	const sortBy = req.query.sort_by || 'updatedAt';
	const search = req.query.search || '';
	try {
		// Find all articles include query, pagination, hateoas
		const { data, pagination, links } = await articleService.findAll({
			page,
			limit,
			sortType,
			sortBy,
			search,
			path: req.path,
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

module.exports = findAll;
