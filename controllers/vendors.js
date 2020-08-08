
const Vendor = require('../models/vendor')
const mongoose = require('mongoose');

exports.vendors_get_all_vendors =  (req, res, next) => {
    Vendor.find()
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            items: docs.map(doc => {
                return {
                  data: doc
                }
            })
        }
        res.status(200).json(response)
    
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}


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


  exports.vendors_create_vendor =  async (req, res, next) => {
    global.count;
    await Vendor.find().countDocuments().exec().then(res => { global.count = ++res });
    const vendor = new Vendor({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        code: global.count < 10 ?
        'VR00' + global.count
        : global.count >= 10 && global.count <= 99 ?
          'VR0' + global.count
          : 'VR' + global.count,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        gst: req.body.gst,
        dl: req.body.dl,
        contact: req.body.contact,
        person: req.body.person,
        addedBy: req.body.addedBy
    });
    await vendor.save()
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
                person: result.person,
                addedBy: result.addedBy
                
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

