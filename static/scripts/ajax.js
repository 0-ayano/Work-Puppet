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
    function ajaxPost(e, operation, values, tempo){
        try {
            if ( document.getElementById("current-judgment").innerText == "OFF" ) {
                $.ajax({
                    'url': 'ajaxPost/',
                    'type': 'POST',
                    'data': {
                    'InputOperation': operation,
                    'InputValue'    : values,
                    'tempo'         :tempo,
                    },
                    'dataType': 'json'
                })
                .done(function(response){
                    var element = document.getElementById('rom');
                    var table = document.getElementById('table');

                    for(var i = 0;  i < response.result.length;  i++ ){
                        var row = table.insertRow(-1);
                        var cells = new Array();
                        
                        element.innerText = response.result[i];
                        cells[0] = row.insertCell(-1);
                        cells[0].innerText = document.getElementById('table').rows.length - 1;
                        cells[1] = row.insertCell(-1);
                        cells[1].innerText = response.input[i];
                        cells[2] = row.insertCell(-1);
                        cells[2].innerText = response.result[i];

                        create_Graph();
                    }
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
        var operation_list = document.getElementsByName('input-operation')
        var values_list = document.getElementsByName('input-value')

        var maxValue = 255
        var minValue = 0
        var sec      = 100
        var width    = 5
        var tempo    = sec/1000
    
        if ( document.getElementById("current-judgment").innerText == "OFF" ) {
            for(var i = 0;  i < operation_list.length;  i++ ){
                var value = values_list.item(i).value
                
                switch(Number(operation_list.item(i).value)){
                    case  0: ajaxPost(e, 0, 0, tempo);                  break;
                    case  1: maxValue = value;                          break;
                    case  2: minValue = value;                          break;
                    case  3: width    = value;                          break;
                    case  4: tempo    = value/1000;                     break;
                    case 10: ajaxPost(e, 10, value, tempo);             break;
                    case 20: AutoRun(e, value, tempo, minValue, width); break;
                }
            }
        }

        else {
            alert("電源を入れてください")
        }
    });

    async function AutoRun(e, value, tempo, minValue, width){
        for (var i = minValue; i <= value; i+=width){
            ajaxPost(e, 10, i, tempo)
            await sleep( (tempo/2 + 0.5)*1000 );
        }

        for (var i = value; i >= minValue; i-=width){
            ajaxPost(e, 10, i, tempo)
            await sleep( (tempo/2 + 0.5)*1000 );
        }
    }

    function sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
});

function create_Graph(){
    var ctx = document.getElementById("graph").getContext("2d")
    var table = document.getElementById('table')

    var data = []
    var labels = []
    
    for(var i = 1;  i < table.rows.length; i++){
        data.push( Number(table.rows[i].cells[2].innerText) );
        labels.push( Number(table.rows[i].cells[1].innerText) )
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