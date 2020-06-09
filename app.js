const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/user');
const vendorRoutes = require('./routes/vendors')
const customersRoutes = require('./routes/customers');
const itemsRoute = require('./routes/items');
const stockRoute = require('./routes/stock');
const pdfInvoice = require('./routes/invoice_pdf');

app.use(cors());

mongoose.connect('mongodb+srv://satsol:' + process.env.MONGO_ATLAS_PW + '@cluster0-wmljt.mongodb.net/test?retryWrites=true&w=majority');

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Routes which handle requests 

app.use('/orders', orderRoutes);
app.use('/user', userRoutes);
app.use('/vendors', vendorRoutes);
app.use('/customers', customersRoutes);
app.use('/items', itemsRoute);
app.use('/stock', stockRoute);
app.use('/pdf', pdfInvoice);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {

    res.status(error.status || 500);
    res.json({
        error: {
            descrption: 'Invalid Route',
            message: error.message
        }
    });

});



module.exports = app;