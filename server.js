const express = require("express");
const app = express();
const http = require("http");
const server=http.createServer(app);
const fs = require("fs");
// const e = require("express");
app.use(express.json());
app.get("/todo",(req,res)=>{
    readAllTodos(function (err, data) {
        if (err) {
          res.status(500).send("error");
          return;
        }
        // res.status(200).send(JSON.stringify(data));
        res.status(200).json(data);
      });
    });

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
  });
  app.get("/sc.js",(req,res)=>{
    res.sendFile(__dirname+"/public/sc.js");
  });
 app.get("/style.css",(req,res)=>{
  res.sendFile(__dirname+"/public/style.css");
});
app.post("/",(req,res)=>{

    const todo=req.body;
    console.log(todo);
    saveData(todo,function(err){
        if(err){
            res.status(500).send("error");
            return;
        }
        res.status(200).send("ok");
    });
});
app.post("/delete",(req,res)=>{
    removeTask(req.body, function (err) {
        if (err) {
            res.status(500).send("error");
            return;
            }
            
    res.status(200).send("ok");
});}
);
app.post("/update",(req,res)=>{ 
    updateCheckedTodo(req.body,function(err){
        if(err){
        res.status(500).send("error");
        return;
        }
        res.status(200).send("ok");
    });
    });
function saveData(todo,callback){
    readAllTodos(function (err, data) {
        if (err) {
          callback(err);
          return;
        }
    
        data.push(todo);
    
        fs.writeFile("./files.txt", JSON.stringify(data,null,2), function (err) {
          if (err) {
            callback(err);
            return;
        }
        callback(null);
      });
    });
}

function readAllTodos(callback){
  fs.readFile("./files.txt",function(err,data){
      if (err) {
          callback(err);
          return;
        }
    
        if (data.length === 0) {
          data = "[]";
        }
    
        try {
          data = JSON.parse(data);
          callback(null, data);
        } catch (err) {
          callback(err);
        }
      });
    }
server.listen("5000",()=>{
console.log("Server started at 5000");
});

function removeTask(body){
    const {property,value}=body;
    fs.readFile("./files.txt", 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
  
      try {
        const parsedData = JSON.parse(data);
        const neededData = parsedData.filter(item => item[property] !== value);
        const updatedData = JSON.stringify(neededData, null, 2);
  
        fs.writeFile("./files.txt", updatedData, 'utf8', (err) => {
          if (err) {
            console.error('Error writing to the file:', err);
          } else {
            console.log(`Task : '${value}' removed.`);
          }
        });
      } catch (err) {
        console.error(err);
      }
    });
}
function updateCheckedTodo(body){

    //read from file and if content matches then change its ckecked status
    const {property,value} = body;
    fs.readFile("./files.txt", 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
  
      try {
        const parsedData = JSON.parse(data);
        const neededData = parsedData.filter(item => item[property] === value);
  console.log(parsedData)
        parsedData.forEach((item)=>{  
          if(item[property]===value){
            item.completed=!item.completed;
          }
        });
        console.log(parsedData);
        const updatedData = JSON.stringify(parsedData, null, 2);
  
        fs.writeFile("./files.txt", updatedData, 'utf8', (err) => {
          if (err) {
            console.error('Error writing to the file:', err);
          } else {
            console.log(`Task : '${value}' status updated!`);
          }
        });
      } catch (err) {
        console.error(err);
      }
    }
  
  )};