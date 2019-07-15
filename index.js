//dependencies required for the app
const express = require("express");
const db = require('./queries')
const bodyParser = require("body-parser");
const app = express();
const todoRoutes = express.Router()

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));

//placeholders for added task
var task = [];
//placeholders for removed task
var complete = [];

//post route for adding new task
// app.post("/addtask", function(req, res) {
//     var newTask = req.body.newtask;
//     var completeTime = req.body.completeTime;
//     //add the new task from the post route
//     var today = new Date();
//     var date = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear().toString().slice(-2);
//     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     var dateTime = date + ' ' + time;
//     newTask +=  ' --- Complete by: ' + completeTime  + ' --- ' + dateTime
//     task.push(newTask);
//     res.redirect("/");
// });

// add a todo item
todoRoutes.route('/add').post(function (req, res) {
  let newTask = req.body.newtask;
  debugger
  db.create(
    {
      task: req.body.newtask,
      complete: false
    },
    function (error, todo) {
      if (error) {
        res.status(400).send('Unable to create todo list')
      }
      res.status(200).json(todo)
      task.push(newTask);
    }
  )
})

// delete a todo item

todoRoutes.route('/delete/:id').get(function (req, res, next) {
  let id = req.params.id
  db.findByIdAndRemove(id, function (err, todo) {
    if (err) {
      return next(new Error('Todo was not found'))
    }
    res.json('Successfully removed')
  })
})

todoRoutes.route('/update/:id').post(function (req, res, next) {
  var id = req.params.id
  db.findById(id, function (error, todo) {
    if (error) {
      return next(new Error('Todo was not found'))
    } else {
      todo.task = req.body.task
      todo.completed = req.body.completed

      db.save({
        function (error, todo) {
          if (error) {
            res.status(400).send('Unable to update todo')
          } else {
            res.status(200).json(todo)
          }
        }
      })
    }
  })
})

// app.get('/tasks', db.getTasks)
// app.get('/tasks/:id', db.getTaskById)
// app.post('/tasks', db.createTask)
// app.put('/tasks/:id', db.updateTask)
// app.delete('/tasks/:id', db.deleteTask)

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
