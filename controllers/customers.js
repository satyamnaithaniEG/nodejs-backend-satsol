
const Customer = require('../models/customers')
const mongoose = require('mongoose');


  exports.customers_create_customers =  (req, res, next) => {

    const customer = new Customer({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        code: req.body.code,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        gst: req.body.gst,
        dl: req.body.dl,
        contact: req.body.contact,
        person: req.body.person
    });
    customer.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created Customer Successfully!',
            createdProduct: {
                _id: result._id,
                name: result.name,
                code:result.code,
                address: result.address,
                city: result.city,
                state: result.state,
                zip: result.zip,
                gst: result.gst,
                dl: result.gst,
                contact: result.contact,
                person: result.person
                
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

