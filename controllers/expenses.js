
const Expense = require('../models/expenses')
const mongoose = require('mongoose');


exports.expenses_get_all_expenses = (req, res, next) => {

    var date = new Date()
  var dateOnMonthStart = new Date(date.toISOString().split('-')[0] +'-'+ date.toISOString().split('-')[1]+'-'+ '01' +'T'+ '00:00:00.000Z')
    Expense.aggregate([
        { 
            $match: { date: { $gte: dateOnMonthStart, $lte: date }} 
        },
        {
        $group:
        {
            _id: "$type",
            sum: { $sum: "$amount" },
            count: { $sum: 1 }
        }
    },
    {
        $sort : { type: 1 }
      }
    ]).
        then(response => {
            var total = 0;
            var transportationCount=0;
            var transportationSum = 0;
            var consumablesSum = 0;
            var consumablesCount = 0;
            var utilitySum = 0;
            var utilityCount = 0;
            for(var i = 0; i< response.length; i++) {
                if(response[i]._id === 'Transportation'){
                    transportationSum = response[i].sum
                    transportationCount = response[i].count
                }
                else if(response[i]._id === 'Consumables'){
                    consumablesSum = response[i].sum
                    consumablesCount = response[i].count
                }
                else if(response[i]._id === 'Utility'){
                    utilitySum = response[i].sum
                    utilityCount = response[i].count
                }
                
                total += response[i].sum
            }
            const result = {
                transportation: {
                    sum: transportationSum,
                    count: transportationCount
                },
                utility: {
                    sum: utilitySum,
                    count: utilityCount
                },
                consumables: {
                    sum: consumablesSum,
                    count: consumablesCount
                },
                total: total
            }
            res.status(200).json(result)
        }).
        catch(err => res.status(500).json(err))
}

exports.expenses_get_by_name_expenses = (req, res, next) => {

    var date = new Date()
  var dateOnMonthStart = new Date(date.toISOString().split('-')[0] +'-'+ date.toISOString().split('-')[1]+'-'+ '01' +'T'+ '00:00:00.000Z')
    Expense.aggregate([
        { 
            $match: { $and: [ { date: { $gte: dateOnMonthStart, $lte: date } }, { addedBy: req.params.name} ] } 
        },
        {
        $group:
        {
            _id: "$type",
            sum: { $sum: "$amount" },
            count: { $sum: 1 }
        }
    },
    {
        $sort : { type: 1 }
      }
    ]).
        then(response => {
            var total = 0;
            var transportationCount=0;
            var transportationSum = 0;
            var consumablesSum = 0;
            var consumablesCount = 0;
            var utilitySum = 0;
            var utilityCount = 0;
            for(var i = 0; i< response.length; i++) {
                if(response[i]._id === 'Transportation'){
                    transportationSum = response[i].sum
                    transportationCount = response[i].count
                }
                else if(response[i]._id === 'Consumables'){
                    consumablesSum = response[i].sum
                    consumablesCount = response[i].count
                }
                else if(response[i]._id === 'Utility'){
                    utilitySum = response[i].sum
                    utilityCount = response[i].count
                }
                
                total += response[i].sum
            }
            const result = {
                transportation: {
                    sum: transportationSum,
                    count: transportationCount
                },
                utility: {
                    sum: utilitySum,
                    count: utilityCount
                },
                consumables: {
                    sum: consumablesSum,
                    count: consumablesCount
                },
                total: total
            }
            res.status(200).json(result)
        }).
        catch(err => res.status(500).json(err))
}

exports.expenses_get_by_name_details_expenses = (req, res, next) => {

    var date = new Date()
  
    var dateOnMonthStart = new Date(date.toISOString().split('-')[0] +'-'+ date.toISOString().split('-')[1]+'-'+ '01' +'T'+ '00:00:00.000Z')
    
    if(req.params.name === 'all'){
        Expense.aggregate([
            { 
                $match: { date: { $gte: dateOnMonthStart, $lte: date } } 
            },
        {
            $sort : { date: 1 }
          }
        ]).
            then(response => {
                
                
                res.status(200).json(response)
            }).
            catch(err => res.status(500).json(err))
    }else {
        Expense.aggregate([
            { 
                $match: { $and: [ { date: { $gte: dateOnMonthStart, $lte: date } }, { addedBy: req.params.name} ] } 
            },
        {
            $sort : { date: 1 }
          }
        ]).
            then(response => {
                
                
                res.status(200).json(response)
            }).
            catch(err => res.status(500).json(err))
    }
    
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
            res.status(500).json({ error: err });
        });
}

