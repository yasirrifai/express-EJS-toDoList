const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.set('view engine', 'ejs');
const items = [];
const workingList = [];
app.get("/", function(req, res) {

const day = date.getDate();


res.render("list", {
  listTitle: day,
  itemName: items
});
})

app.post("/", function(req,res) {
  const item = req.body.toDo;
  if(req.body.list === "Working") {
    workingList.push(item);
    res.redirect("/work");
  }
  else {
    items.push(item);
    res.redirect("/");
  }

})

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Working list",
    itemName: workingList
  })
})

app.get("/about", function(req, res) {
  res.render("about")
})
app.listen(3000, function() {
  console.log("Listening on port 3000");
})
