const articleService = require('../../../../lib/article');

const create = async (req, res, next) => {
	const { title, body, cover, status } = req.body;

	try {
		const article = await articleService.create({
			title,
			body,
			cover,
			status,
			user: req.user,
		});

		const response = {
			code: 201,
			message: 'Article created successfully',
			data: { ...article._doc },
			links: {
				self: `/articles/${article.id}`,
				author: `/articles/${article.id}/author`,
				comment: `/articles/${article.id}/comments`,
			},
		};
		res.status(201).json(response);
	} catch (e) {
		next(e);
	}
};

module.exports = create;
