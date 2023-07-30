const Article = require("../models/Article")
const databaseConnection = require("../db")

const findArticles = async ({
    page,
    limit,
    sortType ,
    sortBy,
    searchTerm,
}) => {
    const articleInstance = new Article(databaseConnection.db.articles)
    
    let articles
    // filter based search term
    if (searchTerm) {
        articles = await articleInstance.search(searchTerm)
    } else {
        articles = await articleInstance.find()
    }
    // sorting
    articles = await articleInstance.sort(articles, sortType, sortBy)

    // pagination
    const {
        result,
        totalItems,
        totalPage,
        hasNext,
        hasPrev
    } = await articleInstance.pagination(articles, page, limit)

    return {
        totalItems,
        totalPage,
        hasNext,
        hasPrev,
        articles: result
    }
}

const transformdArt = (articles) => {
    return articles.map(article => {
        let transformdArt = { ...article }
        delete transformdArt.body
        return transformdArt
    })
}



module.exports = {
    findArticles,
    transformdArt
}