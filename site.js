$("form").on("submit", function (e) {

    var myFile = document.getElementById("upload").files[0];

    var reader = new FileReader();

    reader.readAsArrayBuffer(myFile);

    reader.onload = function (event) {

        var arr = new Uint8Array(reader.result);

        let str = "";
        for (var i = 0; i < arr.byteLength; i++) {
            str += String.fromCharCode(arr[i]);
        }

        var obj = JSON.parse(str);

        var tables = new Array();
        var rows = new Array();
        for (let value of Object.keys(obj)) {
            rows.push(value);
        }
        tables.push(rows);
        rows = new Array();
        for (let value of Object.values(obj)) {
            rows.push(value);
        }
        tables.push(rows);
        var copyData = ArrayCopy(tables);
        createTable(tables);
        btnEdit(tables.length);
        createTableCopy(copyData);

    };

    
  e.preventDefault();
});



function createTable(sheet_data) {

    document.getElementById('json_card').style.display = "none";

    if (sheet_data.length > 0) {
        var table_output = '<table class="table table-striped table-responsive table-bordered">';

        for (var row = 0; row < sheet_data.length; row++) {

            table_output += '<tr>';

            for (var cell = 0; cell < sheet_data[row].length; cell++) {

                if (row == 0) {

                    table_output += '<th>' + sheet_data[row][cell] + '</th>';

                }
                else {

                    table_output += '<td contenteditable="false">' + sheet_data[row][cell] + '</td>';
                }

            }

            table_output += '</tr>';

        }

        table_output += '</table>';

        document.getElementById('json_data').innerHTML = table_output;
    }

}

function createTableCopy(sheet_data) {

    if (sheet_data.length > 0) {
        var table_output = '<table class="table table-striped table-bordered table-responsive" id="table_2" style="border:dotted" >';

        for (var row = 0; row < sheet_data.length; row++) {
            table_output += '<tr>';

            for (var cell = 0; cell < sheet_data[row].length; cell++) {
                if (row == 0) {

                    table_output += '<th>' + sheet_data[row][cell] + '</th>';

                }
                else {

                    table_output += '<td class="edited" contenteditable="true">' + sheet_data[row][cell] + '</td>';
                }

            }

            table_output += '</tr>';

        }

        table_output += '</table>';

        document.getElementById('json_data_editable').innerHTML = table_output;
    }

}


function ArrayCopy(sheet_data) {
    var newArray = [];
    if (sheet_data.length > 0) {

        for (var row = 0; row < sheet_data.length; row++) {
            var col = [];

            for (var cell = 0; cell < sheet_data[row].length; cell++) {
                col[cell] = sheet_data[row][cell];

            }
            newArray[row] = col;
        }
    }
    return newArray;
}



function btnEdit(S_length) {

    if (S_length > 0) {
        document.getElementById('editable').style.display = "inline-block";
    }
}


function editClicked() {
    document.getElementById('editable').style.display = "none";
    document.getElementById('save').style.display = "inline-block";
    myFunction();
    document.getElementById('json_data_editable').style.display = "inline-block";
    // dynamicContentChange();
}


function saveClicked() {
    document.getElementById('json_data').style.display = "none";
    document.getElementById('json_data_editable').style.display = "inline-block";
    document.getElementById('editable').style.display = "none";
    document.getElementById('save').style.display = "none";
    changeEditableFalse();
    var element = document.getElementById("json_data_editable");
    element.classList.remove("col-md-6");
    element.classList.add("col-md-12");
    document.getElementById('table_2').style.border='solid';

}


function changeEditableFalse() {
    var arr = document.getElementsByClassName('edited');
    for (var row = 0; row < arr.length; row++) {
        arr[row].setAttribute("contenteditable", "false");
    }
}


function myFunction() {
    var element = document.getElementById("json_data");
    element.classList.remove("col-md-12");
    element.classList.add("col-md-6");
    element.classList.add("ml-auto");
    element.classList.add("table-responsive");
    var element = document.getElementById("json_data_editable");
    element.classList.remove("col-md-12");
    element.classList.add("col-md-6");
    element.classList.add("table-responsive");
}


//spinner code

$(document).on({
    ajaxStart: function(){
        $("body").addClass("loading"); 
    },
    ajaxStop: function(){ 
        $("body").removeClass("loading"); 
    }    
});

//file load naming
var loadJsonFiles = function (event) {

    var icon='<i class="material-icons" style="font-size:auto;color:green;display: inline-block; float: left">done</i>'
    document.getElementById('uploadLabel').innerHTML = event.target.files[0].name+icon;

};
 