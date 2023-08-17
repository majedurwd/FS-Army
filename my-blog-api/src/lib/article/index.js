const { Article } = require('../../model');
const defaults = require('../../config/defaults');
const { notFound } = require('../../utils/error');
const { updateArticleV2 } = require('./updateArticleV2');

/**
 * Find All Items
 * @param {*} param
 */
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

/**
 * Create new article
 * @param {*}
 */
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

/**
 * Find a single item
 * @param {*}
 */
const findSingleItem = async ({ id, expand = '' }) => {
	if (!id) throw new Error('Id is required');
	expand = expand.split(',').map((item) => item.trim());
	const article = await Article.findById(id);
	if (!article) {
		throw notFound();
	}
	if (expand.includes('author')) {
		await article.populate({
			path: 'author',
			select: 'name',
			strictPopulate: false,
		});
	}
	if (expand.includes('comment')) {
		await article.populate({
			path: 'comments',
			strictPopulate: false,
		});
	}
	return {
		...article._doc,
		id: article.id,
	};
};

const updateOrCreate = async (
	id,
	{ title, body, author, cover = '', status = 'draft' }
) => {
	const article = await Article.findById(id);
	if (!article) {
		const article = await create({
			title,
			body,
			cover,
			status,
			user: author,
		});
		return { article, code: 201 };
	}

	const payload = {
		title,
		body,
		cover,
		status,
		author: author.id,
	};
	article.overwrite(payload);
	await article.save();
	return { article: { ...article._doc, id: article.id }, code: 200 };
};

const updatePropertices = async (id, { title, body, cover, status }) => {
	const article = await Article.findById(id);
	if (!article) {
		throw notFound();
	}

	// article.title = title ?? article.title;
	// article.body = body ?? article.body;
	// article.cover = cover ?? article.cover;
	// article.status = status ?? article.status;

	// Another way
	const payload = { title, body, cover, status };
	Object.keys(payload).forEach((key) => {
		article[key] = payload[key] ?? article[key];
	});

	await article.save();
	return { ...article._doc, id: article.id };
};

const removeItem = async (id) => {
	const article = await Article.findById(id);
	if (!article) {
		throw notFound();
	}

	// TODO:
	// Asynchronously Delete all associated comments

	return Article.findByIdAndDelete(id);
};

module.exports = {
	findAllItems,
	findSingleItem,
	countItem,
	create,
	updateOrCreate,
	updatePropertices,
	removeItem,
	updateArticleV2,
};
