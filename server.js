const app = require("./app")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config({
    path : "./config.env"
})

const DB = process.env.DATABASE.replace('<db_password>', process.env.DB_PASSWORD)

mongoose.connect(DB)
.then(() => console.log('DB connection successful'))

const PORT = process.env.PORT || 8000 

app.listen(PORT, () => {
    console.log(`Server starting on PORT ${PORT}`)
})