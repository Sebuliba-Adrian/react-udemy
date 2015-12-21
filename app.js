var express = require("express")
  , bodyParser = require("body-parser")
  , app = express()
  , fs = require("fs");

var PRODUCTS_JSON = "products.json";

app.set("port", (process.env.PORT || 4444));

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/products', function(req, res) {
  fs.readFile(PRODUCTS_JSON, function(err, file){
    res.setHeader("Cache-Control", "no-cache");
    res.json(JSON.parse(file));
  });
});

app.post('/api/products', function(req, res) {
  fs.readFile(PRODUCTS_JSON, function(err, file){
    var products = JSON.parse(file);

    products.push(req.body);
    fs.writeFile(PRODUCTS_JSON, JSON.stringify(products, null, 3), function(err) {
      res.setHeader("Cache-Control", "no-cache");
      res.json(products);
    })
  });
});

app.listen(app.get("port"), function() {
  console.log("server started on ", app.get("port"));
});
