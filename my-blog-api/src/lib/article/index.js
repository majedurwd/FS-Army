const { Article } = require('../../model');
const ArticleDTO = require('./dto');
const { paginationService, hateoasGenerator } = require('../../utils');

const findAll = async ({
	page = 1,
	limit = 10,
	sortType = 'dsc',
	sortBy = 'updatedAt',
	search = '',
}) => {
	const sortStr = `${sortType === 'dsc' ? '-' : ''}${sortBy}`;
	const skipNum = page * limit - limit;
	const filter = {
		title: { $regex: search, $options: 'i' },
	};
	const articles = await Article.find(filter)
		.populate({ path: 'author', select: 'name' })
		.sort(sortStr)
		.skip(skipNum)
		.limit(limit);
	const data = articles.map((article) => new ArticleDTO(article));

	// Generate pagination object
	const totalItems = await countDoc(filter);
	const pagination = paginationService({
		page,
		limit,
		totalItems,
	});

	return { data, pagination };
};

const countDoc = (filter) => {
	return Article.count(filter);
};

const create = ({ title, body = '', cover = '', status = 'draft', user }) => {
	if (!title || !user) {
		const error = new Error('Invalid parameters');
		error.status = 400;
		throw error;
	}

	const article = new Article({
		title,
		body,
		cover,
		status,
		author: user.id,
	});
	return article.save();
};

module.exports = {
	findAll,
	create,
};
