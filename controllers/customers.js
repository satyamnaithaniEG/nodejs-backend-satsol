
const Customer = require('../models/customers')
const mongoose = require('mongoose');


exports.customers_get_all_customers= (req, res, next) => {
    Customer.find()
    //.select('name')
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
        console.log(err);
        res.status(500).json({
            error:err
        })
  
    })
}


  exports.customers_create_customers = async (req, res, next) => {
    global.count;
    await Customer.find().countDocuments().exec().then(res => { global.count = ++res });

    const customer = new Customer({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        code: global.count < 10 ?
        'CR00' + global.count
        : global.count >= 10 && global.count <= 99 ?
          'CR0' + global.count
          : 'CR' + global.count,
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
    await customer.save()
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

