
const Vendor = require('../models/vendor')
const mongoose = require('mongoose');


exports.vendors_get_all_vendor_name =  (req, res, next) => {
    Vendor.find()
    .select('name')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            items: docs.map(doc => {
                return {
                    name: doc
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


  exports.vendors_create_vendor =  (req, res, next) => {

    const vendor = new Vendor({
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
    vendor.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created Vendor Successfully!',
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

