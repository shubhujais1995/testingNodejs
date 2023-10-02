const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnection');
const app = express();

const port = process.env.PORT || 5005;

connectDB();

app.use(express.json());
app.use("/api/users", require("./routes/userRoute"));

app.listen(port, (req, res) => {
    console.log(`App started on port ${port}`);
});