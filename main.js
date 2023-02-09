// let button = document.getElementById('testApi');

function showList() {
    console.log("button clicked");
    fetch("http://localhost:8080/challanList")
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

//FUNCTION TO SUBMIT DATA FOR NEW CHALLAN.
function submitData() {
    let ch_num = document.getElementById("ch_num").value;
    // let ch_date=new Date(document.getElementById('ch_date'));
    let dateInput = document.getElementById("ch_date").value;
    var ch_date = changeDate(dateInput);
    let ch_type = document.getElementById('ch_type').value;
    let ch_party = document.getElementById('ch_party').value;
    let ch_item = document.getElementById('ch_item').value;
    let shade_num = document.getElementById("shade_num").value;
    let item_amount = document.getElementById('item_amount').value;
    let price = document.getElementById('price').value;

    let dataJson = {
        "ch_num": ch_num,
        "chDate": ch_date,
        "chType": ch_type,
        "party": ch_party,
        "item": ch_item,
        "shadeNum": shade_num,
        "shadeVal": item_amount,
        "jobCharges": price
    }
    console.log(dataJson)
    addChallanAPI(dataJson);
}

//API TO SEND DATA TO SERVER THROUGH POST.
function addChallanAPI(dataJson) {
    console.log(dataJson);
    fetch('http://localhost:8080/newchallan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataJson),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

function addParty() {
    var partyName = document.getElementById('ch_party').value;
    var partyAddress = document.getElementById('party_address').value;
    var gst_no = document.getElementById('party_gst').value;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/addparty");
    xhr.onreadystatechange = () => {
        if (xhr.readState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
        }
        else {
            console.log("error");
        }
    }
    xhr.onload = () => {
        console.log(JSON.parse(xhr.response));
    }
    xhr.send();
};

function changeDate(dateInput) {
    var dateEntered = new Date(dateInput);
    const f=new Intl.DateTimeFormat("en-uk",{
        datestyle:"full",        
    })
   return f.format(dateEntered);
}