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
    let date=req.body.chDate;
    let ch_type=await getType(req.body.chType);
    let party=await getParty(req.body.party);
    let item=await getItem(req.body.item);
    let shade=req.body.shadeNum;
    let itemVal=req.body.shadeVal;
    let jobCharges=req.body.jobCharges;
    let total_amt=itemVal*jobCharges;

    res.send(date+"\n"+
    ch_type+"\n"+
    party+"\n"+
    item+"\n"+
    shade+"\n"+
    itemVal+"\n"+
    jobCharges+"\n"+
    total_amt);
    res.end;
})

//ADD NEW PARTY THROUGH THIS REQUEST.

app.post('/addparty',(req,res)=>{
    let partyName=req.body.partyName;
    let partyAddress=req.body.partyAddress;
    let gstNo=req.body.gst_no;

    console.log(partyName+"\n"+
    partyAddress+"\n"+
    gstNo);
})

//RETREIVE ALL CHALLAN LIST.
app.get('/challanList',(req,res)=>{
    sql='SELECT * FROM ch_main;'
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
    res.end;
});

//GET CHALLAN TYPE
async function getType(chType){
    return new Promise((resolve, reject) => {
        sql='SELECT type_id FROM type_table WHERE ch_type="'+chType+'";'
        db.query(sql,(err,result)=>{
            if(err) reject(err);
            console.log("chtype id = "+result[0].type_id);
            resolve(String(result[0].type_id));
        });
    });
}
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
}
//GET ITEM ID
async function getItem(item_name){
    return new Promise((resolve, reject) => {
        sql='SELECT item_id FROM item_list WHERE item_name="'+item_name+'";'
        db.query(sql,(err,result)=>{
            if(err) reject(err);
            console.log("item id = "+result[0].item_id+" type: "+typeof result[0].item_id);
            resolve(String(result[0].item_id));
        });
    });
}
app.post('/api',jsonParser,(req,res)=>{
    console.log(req.body.name);
    res.send(req.body.name);
    res.end;
})
app.listen(8080, () => {
    console.log(`Server running `);
});