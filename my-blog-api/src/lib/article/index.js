const { Article } = require('../../model');
const defaults = require('../../config/defaults');

const findAllItems = async ({
	page = defaults.page,
	limit = defaults.limit,
	sortType = defaults.sortType,
	sortBy = defaults.sortBy,
	search = defaults.search,
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
	return articles.map((article) => ({ ...article._doc, id: article.id }));
};

const countItem = ({ search = defaults.search }) => {
	const filter = {
		title: { $regex: search, $options: 'i' },
	};
	return Article.count(filter);
};

const create = async ({
	title,
	body = '',
	cover = '',
	status = 'draft',
	user,
}) => {
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
	await article.save();
	return {
		...article._doc,
		id: article.id,
	};
};

const findSingleItem = async ({ id, expand = '' }) => {
	if (!id) throw new Error('Id is required');
	expand = expand.split(',').map((item) => item.trim());
	const article = await Article.findById(id);
	if (expand.includes('author')) {
		await article.populate({
			path: 'author',
			select: 'name',
		});
	}
	if (expand.includes('comment')) {
		await article.populate({
			path: 'comments',
		});
	}
	return {
		...article._doc,
		id: article.id,
	};
};

module.exports = {
	findAllItems,
	findSingleItem,
	countItem,
	create,
};
