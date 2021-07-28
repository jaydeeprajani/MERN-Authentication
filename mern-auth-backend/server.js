const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const favicon = require("serve-favicon");
const path = require("path");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

connectDB();

const PORT = process.env.PORT || 5000

app.use(favicon(path.join(__dirname,'public','favicon.ico')));

app.use(cors());

// app.get("/",(req,res)=>{
//     res.send("API is Running");
// })

app.use(bodyParser.urlencoded ({ extended:true }));
app.use(bodyParser.json());


app.use("/users",require("./routes/auth"));



// Server production assets

if(process.env.NODE_ENV === "production")
{
    app.use(express.static(path.join("mern-auth/build")));
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname,"mern-auth","build","index.html"));
    });
}


app.listen(PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));