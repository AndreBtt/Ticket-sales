let apresentacaoID = 1
let apresentacoes = {}

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
    let cod = $("#codApre").val().trim()
    let data = $("#dataApre").val().trim()
    let horario = $("#horarioApre").val().trim()
    let preco = $("#precoApre").val().trim()
    let qt = $("#qtApre").val().trim()
    let codSala = $("#codSalaApre").val().trim()

    apresentacoes[apresentacaoID] = {}
    apresentacoes[apresentacaoID].cod = cod
    apresentacoes[apresentacaoID].data = data
    apresentacoes[apresentacaoID].horario = horario
    apresentacoes[apresentacaoID].preco = preco
    apresentacoes[apresentacaoID].qt = qt
    apresentacoes[apresentacaoID].codSala = codSala
    apresentacoes[apresentacaoID].valido = true

    var div = document.createElement("div")
    div.id = "Apresentacao" + apresentacaoID
    div.innerHTML = "Apresentacao " + apresentacaoID
    div.setAttribute("onclick", "updateAprensetacao(" + apresentacaoID + ")")
    div.classList.add("butao")
    document.getElementById("listaApresentacao").appendChild(div)
    document.getElementById('apresentacaoFormModal').click();

    apresentacaoID++
}

function updateAprensetacao(id) {
    $("#codUpdateApre").val(apresentacoes[id].cod)
    $("#dataUpdateApre").val(apresentacoes[id].data)
    $("#horarioUpdateApre").val(apresentacoes[id].horario)
    $("#precoUpdateApre").val(apresentacoes[id].preco)
    $("#qtUpdateApre").val(apresentacoes[id].qt)
    $("#codSalaUpdateApre").val(apresentacoes[id].codSala)

    document.getElementById('updateApresentacaoFormModal').click();
}

function cadastrarEvento() {
    let codEvento = $("#codEvento").val().trim()
    let nomeEvento = $("#nomeEvento").val().trim()
    let tipoEvento = $("#tipoEvento").val().trim()
    let estadoEvento = $("#estadoEvento").val().trim()
    let cidadeEvento = $("#cidadeEvento").val().trim()
    let classeEvento = $("#classeEvento").val().trim()
    let inicioEvento = $("#inicioEvento").val().trim()
    let fimEvento = $("#fimEvento").val().trim()

    let obj = {}

    obj.codigo = codEvento
    obj.nome = nomeEvento
    obj.estado = estadoEvento
    obj.cidade = cidadeEvento
    obj.classe = classeEvento
    obj.tipo = tipoEvento
    obj.data_inicio = inicioEvento
    obj.data_fim = fimEvento
    obj.apresentacoes = []

    for(let i = 1; i < apresentacaoID; i++) {
        if(apresentacoes[i].valido == true) {
            let apObj = {}
            apObj.codigo = apresentacoes[i].cod
            apObj.data = apresentacoes[i].data
            apObj.horario = apresentacoes[i].horario
            apObj.preco = apresentacoes[i].preco
            apObj.ingressos = apresentacoes[i].qt
            apObj.sala = apresentacoes[i].codSala
            obj.apresentacoes.push(apObj)
        }
    }

    $.ajax({
        url: '/criarEvento',
        type: 'POST',
        data: obj,
        success: function(result) {
            let response = JSON.parse(result)
        }
    });

}