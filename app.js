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

//ADD NEW CHALLAN 
app.post('/newchallan',(req,res)=>{
    let date=req.body.chDate;
    let ch_type=getType(req.body.chType);
    let party=getParty(req.body.party);
    let item=getItem(req.body.item);
    let shade=req.body.shadeNum;
    let itemVal=req.body.shadeVal;
    let jobCharges=req.body.jobCharges;
    let total_amt=itemVal*jobCharges;

    console.log(date+"\n"+
    ch_type+"\n"+
    party+"\n"+
    item+"\n"+
    shade+"\n"+
    itemVal+"\n"+
    jobCharges+"\n"+
    total_amt);

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
function getType(chType){
    sql='SELECT type_id FROM type_table WHERE ch_type="'+chType+'";'
    db.query(sql,(err,result)=>{
        if(err) throw err;
        return result;
    })
}
//GET CHALLAN PARTY
function getParty(party){
    sql='SELECT party_id FROM party WHERE party_name="'+party+'";'
    db.query(sql,(err,result)=>{
        if(err) throw err;
        return result;
    })
}
//GET ITEM ID
function getItem(item_name){
    sql='SELECT item_id FROM item_list WHERE item_name="'+item_name+'";'
    db.query(sql,(err,result)=>{
        if(err) throw err;
        return result;
    })
}

app.listen(8080, () => {
    console.log(`Server running `);
});