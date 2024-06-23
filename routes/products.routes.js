const express = require('express')

const productsServices = require('./../services/producst.service')

const validatorHandler = require('./../middlewares/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/products.schema')

const router = express.Router()
const services = new productsServices()

router.get('/', async (req, res, next) => {
    try {
        const products = await services.find()
        res.json(products)
    } catch (error) {
        next(error)
    }
})

router.post('/', 
    validatorHandler(createProductSchema, 'body'),
    async (req, res) => {
        const body = req.body
        const product = await services.create(body)
        res.status(201).json({
            message: 'Created',
            product
        })
    }
)

router.patch('/:id', 
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async (req, res, next) => {
    try {
        const { id } = req.params
        const body = req.body
        const product = await services.update(id, body)
        res.json(product)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const rta = await services.delete(id)
    res.json({
        message: "Deleted",
        rta
    })
})

router.get('/filter', (req, res) => {
    res.send("Soy un filtro xd")
})

router.get('/:id', 
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const product = await services.findOne(id)
            res.json(product)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router