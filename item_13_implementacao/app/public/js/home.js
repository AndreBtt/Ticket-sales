$(document).ready(function() {



})

function display(id) {
    for(let i = 0; i < 10; i++) {
        if(i == id) continue
        if($("#" + i).not(":hidden")) {
            $("#" + i).hide(1000);
        }
    }

    if($("#" + id).is(":hidden")){
        $("#" + id).show(1000);
    } else{
        $("#" + id).hide(1000);
    }
}

function buscar() {
    let estado = $("#estado1").val().trim()
    let cidade = $("#cidade1").val().trim()
    let data_inicio = $("#data_inicio1").val().trim()
    let data_fim = $("#data_fim1").val().trim()

    let obj = {}
    obj.estado = estado,
    obj.cidade = cidade,
    obj.data_inicio = data_inicio,
    obj.data_fim = data_fim

    $.ajax({
        url: '/buscarEvento',
        type: 'POST',
        data: obj,
        success: function(result) {
            let response = JSON.parse(result)
            console.log(response.data)
            if(response.data.length > 0) {

                for(let i = 0; i < response.data.length; i++) {
                    var li = document.createElement("li")
                    li.classList.add("lista")
                    li.innerText = response.data[i]
                    document.getElementById("listaEventos").appendChild(li)
                }

                display(4)

            } else {
                // nenhum evento encontrado
            }
        }
    });
}