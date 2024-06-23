const express = require('express')

const productsRoutes = require('./products.routes')
const usersRoutes = require('./users.routes')
const categoryRoutes = require('./category.routes')
const { raw } = require('express')

function routerApi(app) {
    const router = express.Router()
    app.use('/api/v1', router)
    router.use('/products', productsRoutes)
    router.use('/users', usersRoutes)
    router.use('/category', categoryRoutes)
}

module.exports = routerApi