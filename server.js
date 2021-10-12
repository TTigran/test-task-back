const express = require("express");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/index");
const path = require('path');
const cors = require("cors");
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

const app = express();
const db = require("./models");
const Admin = db.admins
require('dotenv').config();

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

app.set('views engine', 'ejs');


app.use(cookieParser())
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use("/test-task-backend/v2", usersRouter);
app.use(bodyParser.urlencoded({extended: true}));

app.get("/ping",(req,res)=>{
    res.json({ping:'pong'});
})

db.sequelize.sync({force: true}).then(() => {
    console.log("Drop and re-sync db.");
});

const isAuth = (req, res, next) => {
    if (req.cookies.auth) {
        res.render('index.ejs', {token: String(req.cookies.auth)})
    } else {
        res.sendFile(path.join(__dirname + '/public/index.html'));
    }
    next()
}


const recordAdminDefault = (req, res, next) => {

    Admin.create({username: "admin", password: "123"})
        .then(data => {
            console.log("Created Admin user password OK")
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Tasks."
        });
    });
    next()

}

app.get('/test-task-backend', recordAdminDefault, isAuth, function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`);
});
