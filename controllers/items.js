
const Item = require('../models/item')
const mongoose = require('mongoose');



exports.items_get_all_item_name =  (req, res, next) => {
    Item.find()
    //.select('name')
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


  exports.items_create_item =  async (req, res, next) => {
    global.count;
    global.itemCode;
    await Item.find({catogory: req.body.catogory}).countDocuments().exec().then(res => { global.count = ++res });
    if(req.body.catogory === 'Medical Equipment'){
       global.itemCode =  global.count < 10 ?
        'ME00' + global.count
        : global.count >= 10 && global.count <= 99 ?
          'ME0' + global.count
          : 'ME' + global.count
    }else if(req.body.catogory === 'Spears'){
        global.itemCode = global.count < 10 ?
        'SP00' + global.count
        : global.count >= 10 && global.count <= 99 ?
          'SP0' + global.count
          : 'SP' + global.count
    }else if(req.body.catogory === 'Consumables'){
        global.itemCode = global.count < 10 ?
        'CM00' + global.count
        : global.count >= 10 && global.count <= 99 ?
          'CM0' + global.count
          : 'CM' + global.count
    }else {
        res.status(500).json('Catogory Not Found!')
    }
    console.log(global.itemCode)
    const item = new Item({
        _id: new mongoose.Types.ObjectId(),
        catogory: req.body.catogory,
        name: req.body.name,
        hsn: req.body.hsn,
        gst: req.body.gst,
        uom: req.body.uom,
        itemCode: global.itemCode,
        addedBy: req.body.addedBy
    });
    await item.save()
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
                uom: result.uom,
                itemCode: result.itemCode,
                addedBy: result.addedBy
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

 exports.items_update_item =  (req, res, next) => {
    const id = req.params.id;
       
    Item.update({_id: id}, { $set: { 
         catogory: req.body.category,
          name: req.body.name,
          hsn: req.body.hsn,
          gst: req.body.gst,
          uom: req.body.uom,
        } })
      .exec()
      .then(response => {
          res.status(201).json({
              message: 'Item updated'
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({error: err})
      })

    }
    exports.items_delete_item = (req, res, next) => {
        const id = req.params.id;
        Item.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Item deleted',
                result: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
    }


