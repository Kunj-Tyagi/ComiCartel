const express = require("express");
const app = express();
const errorhandler = require("./middleware/errorhandler");
const dotenv = require("dotenv").config();
const connectdb=require("./config/dbConnection");

connectdb();
const port = process.env.PORT;

app.use(express.json());
app.use("/api/comics", require("./routes/comicRoutes"));
app.use(errorhandler);

app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
});
