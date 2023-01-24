const mysql=require('mysql');
const express =require('express');
const app=express();
const cors=require('cors');

const db=mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'password',
    database:'jobworkdb'
});
db.connect(function(err){
    if(err){
        console.log("database connectivity error"+err.stack);
        return;
    }
    else{
        console.log("database connectivity succesfull");
    }
});
app.use(cors());
app.get('/',(req,res)=>{
    res.sendFile('/index.html',{root:__dirname});
});
app.get('/challanList',(req,res)=>{
    sql='SELECT * FROM ch_main;'
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
    res.end;
});
app.listen(8080, () => {
    console.log(`Server running `);
});