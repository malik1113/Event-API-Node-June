const express = require("express")
const logger = require("morgan")
const connectToMongoDB = require("./database/connectToMongoDB")

const app = express()

const PORT = 3000;

// Middleware
app.use(logger("dev"))
app.use(express.json())

// Routers
const userRouter = require("./routes/users/userRoute")

app.use("/api/users", userRouter)

const eventRouter = require("./routes/events/eventRoute")

app.use("/api/events", eventRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on Port: ${PORT}`)

    connectToMongoDB();
})