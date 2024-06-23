const express = require('express')
const cors = require('cors')
const routerApi = require('./routes')
const { logErr, errHandler, boomErrorHandler } = require('./middlewares/error.handler')
const app = express()

const port = 3000

const whiteList = ['http://localhost:8080', 'https://static.platzi.com']
const options = {
    origin: (origin, callback) => {
        if(whiteList.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error('No allowed'))
        }
    }
}

app.use(cors(options))
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Primer server con express")
})

app.get('/route', (req, res) => {
    res.send("Other route")
})

routerApi(app)

//app.use(logErr)
app.use(boomErrorHandler)
app.use(errHandler)

app.listen(port, () => {
    console.log("Listening in port: " + port)
})