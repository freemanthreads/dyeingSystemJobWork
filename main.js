

let button = document.getElementById('testApi');

// button.addEventListener("click",function showList(){
//     console.log("button clicked");
//     fetch("http://localhost:8080/challanList")
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.log(error));
// })
function submitData(){
    let ch_num=document.getElementById("ch_num").value;
    // let ch_date=new Date(document.getElementById('ch_date'));
    let dateInput=document.getElementById("ch_date").value;
    var ch_date=new Date(Date.parse(dateInput.value));
    let ch_type=document.getElementById('ch_type').value;
    let ch_party=document.getElementById('ch_party').value;
    let ch_item=document.getElementById('ch_item').value;
    let shade_num=document.getElementById("shade_num").value;
    let item_amount=document.getElementById('item_amount').value;
    let price=document.getElementById('price').value;
    let total_amt=item_amount*price;

    console.log(
        "ch_num : "+ ch_num +
        "\n ch_date : "+ ch_date +
        "\n ch_type : "+ ch_type +
        "\n ch_party : "+ ch_party +
        "\n ch_item : "+ ch_item +
        "\n shade : "+ shade_num +
        "\n item_amount : "+ item_amount +
        "\n price : "+ price +
        " \ntotal : "+ total_amt
    );
}

function addParty(){
    var partyName=document.getElementById('ch_party').value;
    var partyAddress=document.getElementById('party_address').value;
    var gst_no=document.getElementById('party_gst').value;

    var xhr= new XMLHttpRequest();
    xhr.open("GET","https://api.sampleapis.com/codingresources/codingResources");
    xhr.onreadystatechange=()=>{
        if(xhr.readState==4&&xhr.status==200){
        console.log(xhr.responseText);
        }
        else{
        console.log("error");
        }
    }
    xhr.onload=()=>{
        console.log(JSON.parse(xhr.response));
    }
    xhr.send();
};