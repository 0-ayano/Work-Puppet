function changeCameraMode1() {
    document.getElementById("camera").src="/video1/"
}

function changeCameraMode2() {
    document.getElementById("camera").src="/video2/"
}

function changeCameraMode3() {
    document.getElementById("camera").src="/video3/"
}

function addForm() {
    let elements = document.getElementById("target")
    let copied = elements.lastElementChild.cloneNode(true)
    elements.appendChild(copied)
}

function removeForm() {
    const countForm = document.querySelectorAll("div.basket").length
    if (countForm === 1) {
        return
    } else {
        const elements = document.getElementById("target").lastElementChild
        elements.remove()
    }
}

function changeText(){
    btnText = document.getElementById("current-judgment")
    if( btnText.innerText == "ON" ){
        $.ajax({
            'url': 'serialStart/',
            'type': 'POST',
            'data': {
                'script' : "電源ON",
            },
            'dataType': 'json'
       })
       .done( function(response) {
            btnText.innerText = response.msg;
       })
       .fail(function() {
           // 通信失敗時の処理を記述
           alert("電源がONに出来ません");
       })
    }

    else if( btnText.innerText == "OFF" ){
        $.ajax({
            'url': 'serialEnd/',
            'type': 'POST',
            'data': {
                'script' : "電源OFF",
            },
            'dataType': 'json'
       })
       .done( function(response) {
            btnText.innerText = response.msg;
       })
       .fail(function() {
           // 通信失敗時の処理を記述
           alert("電源がOFFに出来ません");
       })
    }
}

function clear() {
    var table = document.getElementById("table")
    for (i=table.rows.length-1; i>0; i--){
        table.deleteRow(i);
    }

    if (typeof myLine !== 'undefined' && myLine) {
        myLine.destroy();
    }

    document.getElementById('rom').innerText = "Clear";
}

function handleDownload() {
    var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    var table = document.getElementById('table');
    var data_csv="";

    for(var i = 0;  i < table.rows.length; i++){
      for(var j = 0; j < table.rows[i].cells.length; j++){
        data_csv += table.rows[i].cells[j].innerText;
        if(j == table.rows[i].cells.length-1) data_csv += "\n";
        else data_csv += ",";
      }
    }

    var blob = new Blob([ bom, data_csv], { "type" : "text/csv" });
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, "In-Situ.csv"); 
    } else {
        let dummy_a_el = document.createElement('a');
        dummy_a_el.style.visibility = 'hidden';
        document.body.appendChild(dummy_a_el);
        dummy_a_el.href = window.URL.createObjectURL(blob);
        dummy_a_el.download = 'In-Situ.csv';
        dummy_a_el.click();
        document.body.removeChild(dummy_a_el);
    }
    delete data_csv;
}

function OpenWindow(){
    window.open('/mini.html','subwin','width=400,height=300')
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("changeCamera1").addEventListener("click", changeCameraMode1, false)
    document.getElementById("changeCamera2").addEventListener("click", changeCameraMode2, false)
    document.getElementById("changeCamera3").addEventListener("click", changeCameraMode3, false)
    document.getElementById("addElement").addEventListener("click", addForm, false)
    document.getElementById("removeElement").addEventListener("click", removeForm, false)
    document.getElementById("judgment").addEventListener("click", changeText, false)
    document.getElementById("clear").addEventListener("click", clear, false)
    document.getElementById("csvDL").addEventListener("click", handleDownload, false)
    document.getElementById("help").addEventListener("click", OpenWindow, false)
}, false);