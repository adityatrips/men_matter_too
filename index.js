const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { default: consola } = require('consola')
const { readdirSync } = require('fs')
const path = require('path')
const connectToDb = require('./config/db')

require('dotenv').config()

const app = express()

connectToDb();

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

readdirSync(path.join(__dirname, 'routes')).forEach((file) => {
    consola.info(`Using /api/${file.split('.')[0]}`)
    app.use(`/api/${file.split('.')[0]}`, require(`./routes/${file}`))
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    consola.success(`Server is running on port ${PORT}`)
})