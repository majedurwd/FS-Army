const Article = require('../../model/Article');
const { notFound, badRequest } = require('../../utils/error');

const updateArticleV2 = async (id, operations = []) => {
	const article = await Article.findById(id);
	if (!article) {
		throw notFound();
	}

	const restrictedPath = ['id', '_id', 'author', 'createdAt', 'updatedAt'];

	for (let operation of operations) {
		const { op, path, value } = operation;
		if (restrictedPath.includes(path)) {
			throw badRequest(`Path (${path}) not permitted`);
		}

		switch (op) {
			case 'replace':
				article[path] = value;
				break;
			case 'add':
				article.set(path, value);
				break;
			case 'remove':
				delete article._doc[path];
				break;
			default:
				throw badRequest(`Ivalid Operation ${op}`);
		}
	}
	await article.save();
	return article._doc;
};

module.exports = {
	updateArticleV2,
};
