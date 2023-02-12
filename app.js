const mysql=require('mysql');
const express =require('express');
const app=express();
const cors=require('cors');
var bodyParser=require('body-parser');
var jsonParser=bodyParser.json();

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


//ADD NEW CHALLAN 
app.post('/newchallan/',jsonParser,async (req,res)=>{
    console.log(req.body);

    let date=req.body.chDate;
    let ch_type=await getType(req.body.chType);
    let party=await getParty(req.body.party);
    let item=await getItem(req.body.item);
    let shade=req.body.shadeNum;
    let itemVal=req.body.shadeVal;
    let jobCharges=req.body.jobCharges;
    let total_amt=itemVal*jobCharges;
    let mySqlDate=convertDateStringToMySQLFormat(date);
    console.log(mySqlDate);

    let sql='INSERT INTO ch_main(ch_date,ch_type_id,party_id,item_id,ch_shade,item_val,job_charges,total_amt) VALUES("'+mySqlDate+'","'+ch_type+'","'+party+'","'+item+'","'+shade+'","'+itemVal+'","'+jobCharges+'","'+total_amt+'");';
    db.query(sql,(err,result)=>{
        if(err)throw err;
        res.send ("challan created");
    })
    res.end;
});
//GET CHALLAN TYPE
async function getType(chType){
    console.log(chType);
    return new Promise((resolve, reject) => {
        sql='SELECT type_id FROM type_table WHERE ch_type="'+chType+'";'
        db.query(sql,(err,result)=>{
            if(err) reject(err);
            console.log("chtype id = "+result[0].type_id);
            resolve(String(result[0].type_id));
        });
    });
};
//GET CHALLAN PARTY
async function getParty(party){
    return new Promise((resolve, reject) => {
        sql='SELECT party_id FROM party WHERE party_name="'+party+'";';
        db.query(sql,(err,result)=>{
            if(err) reject(err);
            console.log("party id = "+result[0].party_id);
            resolve(String(result[0].party_id));
        });
    });
};
//GET ITEM ID
async function getItem(item_name){
    return new Promise((resolve, reject) => {
        sql='SELECT item_id FROM item_list WHERE item_name="'+item_name+'";'
        db.query(sql,(err,result)=>{
            if(err) reject(err);
            console.log("item id = "+result[0].item_id);
            resolve(String(result[0].item_id));
        });
    });
};

//RETREIVE ALL CHALLAN LIST.
app.get('/challanList',(req,res)=>{
    sql='SELECT * FROM ch_main;'
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
    res.end;
});

//ADD NEW PARTY THROUGH THIS REQUEST.

app.post('/addparty',jsonParser,(req,res)=>{
    let partyName=req.body.partyName;
    let gstNo=req.body.gst_no;
    let sql='INSERT INTO party(party_name,party_gst) VALUES("'+partyName+'","'+gstNo+'"); '
    db.query(sql,(err,result)=>{
        if(err)throw err;
        res.send("party added succesfully");
    })
    res.end;
});

app.get('/party_list',(req,res)=>{
    sql='SELECT party_name FROM party;';
    db.query(sql,(err,result)=>{
        if(err)throw err;
        res.send(result);
        res.end;
    })
})




function convertDateStringToMySQLFormat(dateString) {
    var jsDate = new Date(dateString);
    var year = jsDate.getFullYear();
    var month = zeroPad(jsDate.getMonth() + 1, 2);
    var day = zeroPad(jsDate.getDate(), 2);
    var hours = zeroPad(jsDate.getHours(), 2);
    var minutes = zeroPad(jsDate.getMinutes(), 2);
    var seconds = zeroPad(jsDate.getSeconds(), 2);
  
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
  }
  
  function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

app.listen(8080, () => {
    console.log(`Server running `);
});