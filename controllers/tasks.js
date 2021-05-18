const formidable = require('formidable')
const jwt = require('jsonwebtoken');
const db = require("../models");
require('dotenv').config();
const Tasks = db.tasks;

exports.createTasks = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        const tasks = {
            username: fields.user,
            email: fields.email,
            text: fields.text,
            status: 0,
        };
        if (fields.token == req.cookies.auth) {
            Tasks.create(tasks)
                .then(data => {
                    res.send({
                        status: "ok",
                        message: data
                    });
                }).catch(err => {
                res.status(500).send({
                    status: "error",
                    message: {
                        username: "Поле является обязательным для заполнения",
                        email: "Неверный email",
                        text: "Поле является обязательным для заполнения"
                    }
                });
            });
        } else {
            res.send({
                status: "error",
                message: {
                    token: "Токен истёк"
                }
            });
        }

    });
};


exports.update = (req, res) => {
    let id = req.params.id;
    let auth = req.headers.authorization
    let token = auth.substring(7, auth.length);
    let decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    if (decoded.user == 'admin') {
        Tasks.update(req.body, {
            where: {id: id}
        }).then(num => {
            if (num == 1) {
                res.send({
                    message: "Tasks was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error updating Tasks with id=" + id
            });
        });
    } else {
        res.send({
            status: "error",
            message: {
                token: "Токен истёк"
            }
        });
    }
};

exports.getAll = (req, res) => {
    let auth = req.headers.authorization
    let token = auth.substring(7, auth.length);
    let decoded = jwt.verify(token, process.env.TOKEN_SECRET)

    if (decoded.user == "admin") {
        Tasks.findAll().then((data) => {
            res.send({
                status: "ok",
                message: {
                    tasks: data,
                    total_task_count: data.length
                }
            })
        }).catch(err => {
            res.status(500).send({
                message: "Error updating Tasks with id=" + id
            });
        });
    } else {
        res.send({
            status: "error",
            message: {
                token: "Токен истёк"
            }
        });
    }
};

exports.sortById = (req, res) => {

    let auth = req.headers.authorization
    let token = auth.substring(7, auth.length);
    let decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    if (decoded.user == "admin") {
        Tasks.findAll({
            order: [
                ['id', 'ASC']
            ]
        }).then((data) => {
            res.send({
                status: "ok",
                message: {
                    tasks: data,
                    total_task_count: data.length
                }
            })
        }).catch(err => {
            res.status(500).send({
                message: "Error updating Tasks with id=" + id
            });
        });
    } else {
        res.send({
            status: "error",
            message: {
                token: "Токен истёк"
            }
        });
    }
};