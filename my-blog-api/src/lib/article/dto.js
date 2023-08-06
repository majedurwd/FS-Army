class ArticleDTO {
	constructor(article) {
		this.id = article._id;
		this.title = article.title;
		this.cover = article.cover ?? '';
		this.author = { id: article.author.id, name: article.author.name };
		this.link = `/articles/${article.id}`;
		this.createdAt = article.createdAt;
		this.updatedAt = article.updatedAt;
	}
}

module.exports = ArticleDTO;
