const articleService = require('../../../../lib/article');
const { hateoasGenerator } = require('../../../../utils');

const findAll = async (req, res, next) => {
	const page = +req.query.page || 1;
	const limit = +req.query.limit || 10;
	const sortType = req.query.sort_type || 'dsc';
	const sortBy = req.query.sort_by || 'updatedAt';
	const search = req.query.search || '';
	try {
		const { data, pagination } = await articleService.findAll({
			page,
			limit,
			sortType,
			sortBy,
			search,
		});
		const query = {
			page,
			limit,
			sort_type: sortType,
			sort_by: sortBy,
			search,
			...req.query,
		};

		// Generate HATEOAS Links
		const links = hateoasGenerator(
			query,
			req.path,
			pagination.prevPage,
			pagination.nextPage
		);
		// const totalItems = await articleService.countDoc({ search });

		// response generation
		// const data = articles.map((article) => ({
		// 	...article,
		// 	link: `/articles/${article.id}`,
		// }));

		// pagination
		// const totalPage = Math.ceil(totalItems / limit);
		// const pagination = {
		// 	page,
		// 	limit,
		// 	totalItems,
		// 	totalPage,
		// };

		// if (page < totalPage) {
		// 	pagination.next = page + 1;
		// }
		// if (page > 1) {
		// 	pagination.prev = page - 1;
		// }

		// // HATEOAS Links
		// const links = {
		// 	self: `${req.path}?${articleService.generateQueryString({
		// 		...req.query,
		// 	})}`,
		// };
		// if (pagination.next) {
		// 	const query = articleService.generateQueryString({
		// 		...req.query,
		// 		page: page + 1,
		// 	});
		// 	links.next = `${req.path}?${query}`;
		// }
		// if (pagination.prev) {
		// 	const query = articleService.generateQueryString({
		// 		...req.query,
		// 		page: page - 1,
		// 	});
		// 	links.prev = `${req.path}?${query}`;
		// }

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
