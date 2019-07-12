//dependencies required for the app
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));

//placeholders for added task
var task = [];
//placeholders for removed task
var complete = [];

//post route for adding new task
app.post("/addtask", function(req, res) {
    var newTask = req.body.newtask;
    var completeTime = req.body.completeTime;
    //add the new task from the post route
    var today = new Date();
    var date = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear().toString().slice(-2);
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    newTask +=  ' --- Complete by: ' + completeTime  + ' --- ' + dateTime
    task.push(newTask);
    res.redirect("/");
});

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        //check if the completed task already exists in the task when checked, then remove it
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

//render the ejs and display added task, completed task
app.get("/", function(req, res) {
  res.render("index", { task: task, complete: complete });
});

app.get('/about', function(req, res) {
  res.send('About this todo app');
});

//set app to listen on port 3000
app.listen(3000, function() {
  console.log("server is running on port 3000");
});
