
let clicked = false;
function displayData() {
    let i = 0;
    if (clicked == true) {
        i = challans.length - 1;
    }
    let challans = [{
        chNum: 100,
        chDate: "1-1-2022",
        partyName: "Freeman"
    },
    {
       
        chNum: 101,
        chDate: "1-1-2022",
        partyName: "Budhigiri"
    },
    {
        chNum: 102,
        chDate: "1-1-2022",
        partyName: "Rashmi"
    }
    ]
    let newObj = {
        chNum: document.getElementById("ch_num").value,
        chDate: document.getElementById("ch_date").value,
        partyName: document.getElementById("ch_party").value
    }
    challans.push(newObj);
    console.log(challans);




    for (i; i < challans.length; i++) {
        var table = document.getElementById('chTable'),
            newRow = table.insertRow(table.length),
            td1 = newRow.insertCell(0),
            td2 = newRow.insertCell(1),
            td3 = newRow.insertCell(2);
        td1.innerHTML = challans[i].chNum;
        td2.innerHTML = challans[i].chDate;
        td3.innerHTML = challans[i].partyName;
    }
    clicked = true;


}


