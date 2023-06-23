const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { dbConnection } = require('./database/config')


// Crear el servidor de Express
const app = express()

// Base de datos
dbConnection()

// Cors
app.use(cors())

// Directorio publico
app.use( express.static('public'))

// Parseo del body
app.use( express.json())

// Rutas
app.use('/api/auth', require('./routes/auth'))


app.use('/api/events', require('./routes/events'))

app.listen( process.env.PORT, () => console.log(`Server up on port: ${ process.env.PORT  }`))