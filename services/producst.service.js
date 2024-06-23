const { faker, fakerRO } = require('@faker-js/faker')
const boom = require('@hapi/boom')

class productsServices {
    constructor () {
        this.products = []
        this.generate()
    }

    generate () {
        const limit = 100 
        for (let index = 0; index < limit; index++) {
            this.products.push({
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.url(),
                isBlock: faker.datatype.boolean()
            })
        }
    }

    async create (data) {
        const product = {
            id: faker.string.uuid(),
            ...data
        }
        this.products.push(product)
        return product
    }

    find () {
        return this.products
    }

    findOne (id) {
        const index = this.products.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('No mk, esa vaina no existe')
        } if (this.products[index].isBlock) {
            throw boom.conflict('Pos we, no we, no vas a ver ni mergas')
        }
        return this.products[index]
    }

    async update (id, changes) {
        const index = this.products.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('Not found')
        }
        const product = this.products[index]
        this.products[index] = {
            ...product,
            ...changes
        }
        return this.products[index]
    }

    async delete (id) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound('Product not found')
        }
        this.products.splice(index, 1);
        return { id };
    }
}

module.exports = productsServices