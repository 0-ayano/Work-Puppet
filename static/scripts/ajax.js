$(function($){
    /* jQueryを使ったajaxのおまじない */
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    var csrftoken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    /* ここからがメインイベント */ 
    function ajaxPost(e, operation, values){
        try {
            if ( document.getElementById("current-judgment").innerText == "OFF" ) {
                $.ajax({
                    'url': 'ajaxPost/',
                    'type': 'POST',
                    'data': {
                    'InputOperation': operation,
                    'InputValue': values,
                    },
                    'dataType': 'json'
                })
                .done(function(response){
                    var element = document.getElementById('rom');
                    var table = document.getElementById('table');
                    var row = table.insertRow(-1);
                    var cells = new Array();

                    element.innerText = response.result;
                    cells[0] = row.insertCell(-1);
                    cells[0].innerText = document.getElementById('table').rows.length - 1;
                    cells[1] = row.insertCell(-1);
                    cells[1].innerText = response.input;
                    cells[2] = row.insertCell(-1);
                    cells[2].innerText = response.result;

                    create_Graph();
                })
                .fail(function(){
                    alert("通信エラーです。次のことを確認してください。\n- 空白がある状態で、送信している")
                })
            }
    
            else {
                alert("電源を入れてください")
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    // 不定期実行
    $('#ajax').on('click', function(e) {
        e.preventDefault()
    
        var operation = []
        var values = []
        var operation_list = document.getElementsByName('input-operation')
        var values_list = document.getElementsByName('input-value')
    
        for(var i = 0;  i < operation_list.length;  i++ ){
            operation.push(operation_list.item(i).value)
            values.push(values_list.item(i).value)
        }

        ajaxPost(e, operation, values)
    });

    // 定期実行
    $(function(){
        setInterval(function(){
            var operation = []
            var values = []
            var operation_list = document.getElementsByName('input-operation')
            var values_list = document.getElementsByName('input-value')
            var i;
        
            for(var i = 0;  i < operation_list.length;  i++ ){
                operation.push(operation_list.item(i).value)
                values.push(values_list.item(i).value)
            }

                var table = document.getElementById("table")
                if(table.rows.length > 6){
                    if ( Number(table.rows[table.rows.length-1].cells[2].innerText) !=  Number(table.rows[table.rows.length-5].cells[2].innerText) ||
                        Number(table.rows[table.rows.length-1].cells[2].innerText) !=  Number(table.rows[table.rows.length-2].cells[2].innerText) ){
                                if ( document.getElementById("current-judgment").innerText == "OFF" ) {
                                    ajaxPost("", operation, values)
                                }
                    }
                }
        },1000);
    });
});

function create_Graph(){
    var ctx = document.getElementById("graph").getContext("2d")
    var table = document.getElementById('table')

    var data = []
    var labels = []
    
    for(var i = 1;  i < table.rows.length; i++){
        data.push( Number(table.rows[i].cells[2].innerText) );
        labels.push( Number(i) )
    }

    var lineChartData = {
        labels,
        datasets : [
        {
            label: "測定値",
            fill: false,
            borderColor: 'rgb(108, 155, 210)',
            backgroundColor: 'rgb(108, 155, 210)',
            tension: 0.1,
            data,
        },
        ]

    }

    var lineChartOption = {
        plugins: {
            legend: {
                display: false,
            },
        }
    }

    if (typeof myLine !== 'undefined' && myLine) {
        myLine.destroy();
    }

    window.myLine = new Chart(ctx, {
        type: 'line',
        data: lineChartData,
        options: lineChartOption,
    })
}