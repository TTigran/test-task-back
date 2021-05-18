const db = require("../models");
const formidable = require('formidable');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Admin = db.admins;

exports.login = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        Admin.findAll({
            where: {
                username: fields.username,
                password: fields.password
            }
        }).then(data => {
            let token = jwt.sign(  {user: fields.username}, process.env.TOKEN_SECRET);
            res.cookie('auth', token)
            res.render('index.ejs',{token: String(token)})
        }).catch(err => {
            res.send({
                status: "error",
                message: "Не передано имя разработчика"
            });
        });
    });
};

