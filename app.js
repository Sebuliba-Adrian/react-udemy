var express = require("express")
  , bodyParser = require("body-parser")
  , app = express()
  , fs = require("fs")
  , React = require("react")
  , ReactDOM = require("react-dom/server")
  , exphbs = require("express-handlebars");

require("babel-core/register");

var PRODUCTS_JSON = "products.json";

app.set("port", (process.env.PORT || 4444));
//app.set("views", "views");

app.engine("handlebars", exphbs());

app.set("view engine", "handlebars");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/products", function(req, res) {
  fs.readFile(PRODUCTS_JSON, function(err, file){
    res.setHeader("Cache-Control", "no-cache");
    res.json(JSON.parse(file));
  });
});

app.post("/api/products", function(req, res) {
  fs.readFile(PRODUCTS_JSON, function(err, file){
    var products = JSON.parse(file);

    products.push(req.body);

    fs.writeFile(PRODUCTS_JSON, JSON.stringify(products, null, 3), function(err) {
      res.setHeader("Cache-Control", "no-cache");
      res.json(products);
    })
  });
});

var HelloComponent = React.createFactory(require('./components/mycomponent').MyComponent);
var markup = ReactDOM.renderToString(HelloComponent());

app.get("/react-server", function(req, res) {
  res.render("home", {
    markup: markup
  });
})

app.get("/github", function(req, res) {
  res.render("github");
});

app.listen(app.get("port"), function() {
  console.log("server started on ", app.get("port"));
});
