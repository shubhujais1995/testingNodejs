const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnection');
const app = express();

const port = process.env.PORT || 5005;

connectToMongoDB();

app.use(express.json());
app.use("/api/users", require("./routes/userRoute"));

app.get("/", (req, res) => {
    res.send("<h1>App is running!<h1/>")
})

app.get("/message", (req, res) => {
    res.send({
        "message": "App works fine",
        "commit": "2nd"
    })
})

app.listen(port, (req, res) => {
    console.log(`App started on port ${port}`);
});