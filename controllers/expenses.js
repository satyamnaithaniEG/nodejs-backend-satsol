
const Expense = require('../models/expenses')
const mongoose = require('mongoose');


exports.expenses_get_all_expenses= (req, res, next) => {
    Expense.find()
    //.select('name')
    .exec()
    .then(docs => {
        var total = 0;
        for(var i =0; i<docs.length;i++){
            total = total + docs[i].amount
        }
      const response = {
          count: docs.length,
          items: docs.map(doc => {
              return {
                data: doc,
              }
          }),
          total: total
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


  exports.expenses_create_expense = (req, res, next) => {
   

    const expense = new Expense({
        _id: new mongoose.Types.ObjectId(),
        type: req.body.type,
        amount: req.body.amount,
        date: new Date,
        description: req.body.description,
        addedBy: req.body.addedBy
    });
     expense.save()
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

