const express = require('express');
const router = express.Router();
// const checkAuth = require('../middleware/check-auth')
//const SalesController = require('../controllers/sales')

//pdf Generate
const pdf = require('html-pdf');
const pdfTemplate = require('../PdfFile/index');

var options = {
    format: 'A4',
    width: "11in",
    height: "17in",
    border: {
        top: "4cm",            // default is 0, units: mm, cm, in, px
      },
};
router.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), options).toFile('routes/result.pdf', (err) => {
        if (err) {
            res.send(Promise.reject());
            console.log(err)
        }
        // SalesController.helloWorld(req, res)
        res.send(Promise.resolve());
    });
});

router.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})


module.exports = router;