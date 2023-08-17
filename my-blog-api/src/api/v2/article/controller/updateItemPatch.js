const articleService = require('../../../../lib/article');

const updateItemPatch = async (req, res, next) => {
	const { id } = req.params;

	try {
		const article = await articleService.updateArticleV2(id, req.body);
		res.status(200).json(article);
	} catch (e) {
		next(e);
	}
};

module.exports = updateItemPatch;
