require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const swaggerUI = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerDoc = YAML.load('./swagger.yaml')

const databaseConnection = require("./db")
const articleService = require("./services/articles")

const app = express()
app.use(morgan("dev"))
app.use(express.json())

const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }'
  };
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc, swaggerOptions))

app.use((req, _res, next) => {
    req.user = {
        id: 999,
        name: "Majedur Rahman"
    }
    next()
})

app.get("/health", (_req, res) => {
    res.status(200).json({
        health: "OK"
    })
})

app.post("/api/v1/auth/signup", (req, res) => {
    res.status(200).json({
        path: "/auth/signup",
        method: "POST"
    })
})

app.post("/api/v1/auth/signin", (req, res) => {
    res.status(200).json({
        path: "/auth/signin",
        method: "POST"
    })
})

app.get("/api/v1/articles", async (req, res) => {
    // 1. extract query params
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const sortType = req.query.sort_type || "asc"
    const sortBy = req.query.sort_by || "updatedAt"
    const searchTerm = req.query.search || ""
    // 2. call article service to fetch all articles
    let {
        totalItems,
        totalPage,
        hasNext,
        hasPrev,
        articles
    } = await articleService.findArticles({ page, limit, sortType, sortBy, searchTerm })

    let response = {
        code: 200,
        data: articleService.transformdArt(articles),
        pagination: {
            page,
            limit,
            totalItems,
            totalPage,
        },
        links: {
            self: req.url,
        }
    }

    if (hasPrev) {
        response.pagination.prev = page - 1
        response.links.prev = `/api/v1/articles?page=${page - 1}&limit=${limit}`
    }
    if (hasNext) {
        response.pagination.next = page + 1
        response.links.next = `/api/v1/articles?page=${page + 1}&limit=${limit}`
    }
    res.status(200).json(response)
})
app.post("/api/v1/articles", async (req, res) => {
    // destructure the request body
    const { title, body, cover, status } = req.body

    // invoke the service function
    const article = await articleService.createArticle({
        title,
        body,
        authorId: req.user.id,
        cover,
        status
    })

    // generate response
    const response = {
        code: 201,
        message: "Article created successfully",
        data: article,
        links: {
            self: `${req.url}/${article.id}`,
            author: `${req.url}/${article.id}/author`,
            comments: `${req.url}/${article.id}/comments`
        }
    }
    res.status(201).json(response)
})
app.get("/api/v1/articles/:id", (req, res) => {
    res.status(200).json({
        path: `/articles/${req.params.id}`,
        method: "GET"
    })
})
app.put("/api/v1/articles/:id", (req, res) => {
    res.status(200).json({
        path: `/articles/${req.params.id}`,
        method: "PUT"
    })
})
app.patch("/api/v1/articles/:id", (req, res) => {
    res.status(200).json({
        path: `/articles/${req.params.id}`,
        method: "PATCH"
    })
})
app.delete("/api/v1/articles/:id", (req, res) => {
    res.status(200).json({
        path: `/articles/${req.params.id}`,
        method: "DELETE"
    })
});
    

(async () => {
    await databaseConnection.connect()
    console.log("Database Connected");
    app.listen(4000, () => {
        console.log("Server is listening on port 4000");
    })
})();