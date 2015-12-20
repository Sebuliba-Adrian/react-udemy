var express = require("express")
  , bodyParser = require("body-parser")
  , app = express();

app.set("port", (process.env.PORT || 4444));

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(app.get("port"), function() {
  console.log("server started on ", app.get("port"));
});
