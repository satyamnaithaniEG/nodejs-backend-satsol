exports.helloWorld = (req, res)=>{
    console.log(req.body.length)
    var obj = req.body.filter(function(data) {
        return data!= '';
      });
      console.log(obj)

}