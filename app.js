const express = require("express")
const bodyParser = require("body-parser")

const authRoutes = require("./routes/authRoutes")

const app = express()
app.use(express.json())

app.use('/api/auth', authRoutes)

app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500,
    error.message = error.message || "error"

    res.status(error.statusCode).json({
        "status" : "error",
        "message" : error.message
    })
})

module.exports = app