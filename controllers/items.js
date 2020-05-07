
const Item = require('../models/item')
const mongoose = require('mongoose');



exports.items_get_all_item_name =  (req, res, next) => {
    Item.find()
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


  exports.items_create_item =  (req, res, next) => {

    const item = new Item({
        _id: new mongoose.Types.ObjectId(),
        catogory: req.body.catogory,
        name: req.body.name,
        hsn: req.body.hsn,
        gst: req.body.gst,
        uom: req.body.uom,
    });
    item.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created Item Successfully!',
            createdProduct: {
                _id: result._id,
                catogory: result.catogory,
                name: result.name,
                hsn: result.hsn,
                gst: result.gst,
                uom: result.uom       
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

exports.items_get_item_details =  (req, res, next) => {
    Item.find({name: req.params.itemName})
    .exec()
    .then(item => {
        res.status(200).json({
            item: item
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
 }

