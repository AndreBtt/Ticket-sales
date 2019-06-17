let apresentacaoID = 1

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
    obj.estado = estado
    obj.cidade = cidade
    obj.data_inicio = data_inicio
    obj.data_fim = data_fim

    $.ajax({
        url: '/buscarEvento',
        type: 'POST',
        data: obj,
        success: function(result) {
            let response = JSON.parse(result)
            console.log(response.data)
            $("#listaEventos").remove();

            if(response.data.length > 0) {
                var ul = document.createElement("ul")
                ul.id = "listaEventos"
                ul.classList.add("lista")

                for(let i = 0; i < response.data.length; i++) {
                    var li = document.createElement("li")
                    li.innerText = response.data[i]
                    ul.appendChild(li)
                }
                document.getElementById("eventos").appendChild(ul)
                document.getElementById('buscaFeedBackModal').click()

            } else {
                // nenhum evento encontrado
                var h2 = document.createElement("h2")
                h2.id = "listaEventos"
                h2.classList.add("texto_lista")
                h2.innerText = "Nenhum evento encontrado"

                document.getElementById("eventos").appendChild(h2)
                document.getElementById('buscaFeedBackModal').click()
            }
        }
    });
}

function comprarIngresso() {
    let codigo = $("#codIngresso").val().trim()
    let quantidade = $("#qtIngresso").val().trim()

    let obj = {}
    obj.codigo = codigo
    obj.quantidade = quantidade

    $.ajax({
        url: '/comprarIngresso',
        type: 'POST',
        data: obj,
        success: function(result) {
            let response = JSON.parse(result)
            document.getElementById('texto_modal').innerHTML = response.msg
            document.getElementById('ingressoFeedBackModal').click();
        }
    });

}

function novaApresentacao() {
    document.getElementById('apresentacaoFormModal').click();
}

function criarApresentacao() {
    let cod = $("#codApre").text().trim()
    let data = $("#dataApre").text().trim()
    let horario = $("#horarioApre").text().trim()
    let preco = $("#precoApre").text().trim()
    let qt = $("#qtApre").text().trim()
    let codSala = $("#codSalaApre").text().trim()

    // criar a apresentacao, add num mapa, incrementa o ID

    var div = document.createElement("div")
    div.innerHTML = "Apresentacao " + apresentacaoID
    div.setAttribute("onclick", "updateAprensetacao(" + apresentacaoID + ")")
    document.getElementById("listaApresentacao").appendChild(div)
}

function updateAprensetacao(id) {
    console.log(id)
}