const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../models/user");



exports.users_get_all =  (req, res, next) => {
    User.find()
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    email: doc.email,
                    password: doc.password
                    
                }
            })
           
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}

exports.users_signup_user =  (req, res, next) => {

    User.find({ email: req.body.email})
        .exec()
        .then(user => {
            if(user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail Exist!'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                        .then( result => {
                            console.log(result)
                            res.status(201).json({
                                message: 'User created'
                            })
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err,
                                message: 'Auth failed'
                            })
                        })
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
                message: 'Auth failed'
            }
        )
        })


}

exports.users_login_user = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(
        
        user => {
            console.log(req.body.email)
            console.log(req.body.password)
            console.log(user[0].password)

            if(user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed. No email  exist'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err) {
                  
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                console.log(result)
                console.log(err)
                if(result) {

                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, process.env.JWT_KEY,
                     {
                        expiresIn: "1h"
                    }
                    );

                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    })
                }
                res.status(401).json({
                    message: 'Auth failed'
                })
            })

        }
    )
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
            message: 'Auth failed'
        })
    })
}

exports.users_delete_user =  (req, res, next) => {
    User.remove({_id: req.params.userId})
    .exec()
    .then( result => {
        res.status(200).json({
            message: "User deleted"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}