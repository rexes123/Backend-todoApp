const client = require('./connection.js')
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(3500, ()=>{
    console.log("Sever is now listening at port 3500");
})

client.connect();

app.get('/todos', (req, res)=>{
    client.query(`Select * from todos`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})
//Get todo
app.get('/todos/:id', (req, res)=>{
    client.query(`Select * from todos where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
})
//create new todos
app.post('/todos', (req, res)=> {
    const todo = req.body;
    let insertQuery = `insert into todos(id, description) 
                       values(${todo.id}, '${todo.description}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Have been added successfully')
        }
        else{ console.log(err.message) }
    })
})

//Delete todo
app.delete('/todos/:id', (req, res)=> {
    let insertQuery = `delete from todos where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Have been deleted successfully')
        }
        else{ console.log(err.message) }
    })
})

