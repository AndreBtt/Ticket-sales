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
            let response = JSON.parse(result).data
            $("#eventosSelecionados").remove();

            if(response.length > 0) {
                document.getElementById("buscaTexto").innerHTML = "Abaixo a lista dos eventos com suas apresentações"

                let prim = document.createElement("div")
                prim.id = "eventosSelecionados"
                prim.classList.add("groups")
                document.getElementById("listaEventos").appendChild(prim)

                let visitado = {}
                let data = []

                for(let i = 0; i < response.length; i++) {
                    if(visitado[response[i].evento_nome] == undefined) {
                        // primeira vez nesse evento
                        let j = data.length
                        visitado[response[i].evento_nome] = j
                        let obj = []
                        obj.push(response[i])
                        data.push(obj)
                    } else {
                        let j = visitado[response[i].evento_nome]
                        data[j].push(response[i])
                    }
                }

                for(let i = 0; i < data.length; i++) {
                    let h2 = document.createElement("h2")
                    h2.classList.add("text-center")
                    h2.setAttribute("style", "margin-top:110px;")
                    h2.innerHTML = data[i][0].evento_nome
                    document.getElementById("eventosSelecionados").appendChild(h2)

                    let div = document.createElement("div")
                    div.classList.add("ranking-header")
                    
                    let divIn = document.createElement("div")
                    divIn.classList.add("col-lg-1")
                    divIn.classList.add("col-md-1")
                    divIn.classList.add("col-xs-1")
                    divIn.innerHTML = "Código"
                    div.appendChild(divIn)
                    
                    divIn = document.createElement("div")
                    divIn.classList.add("col-lg-4")
                    divIn.classList.add("col-md-4")
                    divIn.classList.add("col-xs-4")
                    divIn.classList.add("text-center")
                    divIn.innerHTML = "Data"
                    div.appendChild(divIn)

                    divIn = document.createElement("div")
                    divIn.classList.add("col-lg-2")
                    divIn.classList.add("col-md-2")
                    divIn.classList.add("col-xs-2")
                    divIn.innerHTML = "Horário"
                    div.appendChild(divIn)

                    divIn = document.createElement("div")
                    divIn.classList.add("col-lg-2")
                    divIn.classList.add("col-md-2")
                    divIn.classList.add("col-xs-2")
                    divIn.innerHTML = "Preço"
                    div.appendChild(divIn)

                    divIn = document.createElement("div")
                    divIn.classList.add("col-lg-2")
                    divIn.classList.add("col-md-2")
                    divIn.classList.add("col-xs-2")
                    divIn.innerHTML = "Ingressos"
                    div.appendChild(divIn)

                    divIn = document.createElement("div")
                    divIn.classList.add("col-lg-1")
                    divIn.classList.add("col-md-1")
                    divIn.classList.add("col-xs-1")
                    divIn.innerHTML = "Sala"
                    div.appendChild(divIn)

                    document.getElementById("eventosSelecionados").appendChild(div)
                    
                    for(let j = 0; j < data[i].length; j++) {
                        div = document.createElement("div")
                        div.classList.add("ranking")

                        divIn = document.createElement("div")
                        divIn.classList.add("col-lg-1")
                        divIn.classList.add("col-md-1")
                        divIn.classList.add("col-xs-1")
                        divIn.innerHTML = data[i][j].codigo_apresentacao
                        div.appendChild(divIn)

                        divIn = document.createElement("div")
                        divIn.classList.add("col-lg-4")
                        divIn.classList.add("col-md-4")
                        divIn.classList.add("col-xs-4")
                        divIn.classList.add("text-center")
                        divIn.innerHTML = data[i][j].data_apresentacao
                        div.appendChild(divIn)

                        divIn = document.createElement("div")
                        divIn.classList.add("col-lg-2")
                        divIn.classList.add("col-md-2")
                        divIn.classList.add("col-xs-2")
                        divIn.innerHTML = data[i][j].horario_apresentacao
                        div.appendChild(divIn)

                        divIn = document.createElement("div")
                        divIn.classList.add("col-lg-2")
                        divIn.classList.add("col-md-2")
                        divIn.classList.add("col-xs-2")
                        divIn.innerHTML = data[i][j].preco_apresentacao
                        div.appendChild(divIn)

                        divIn = document.createElement("div")
                        divIn.classList.add("col-lg-2")
                        divIn.classList.add("col-md-2")
                        divIn.classList.add("col-xs-2")
                        divIn.innerHTML = data[i][j].ingressos_apresentacao
                        div.appendChild(divIn)

                        divIn = document.createElement("div")
                        divIn.classList.add("col-lg-1")
                        divIn.classList.add("col-md-1")
                        divIn.classList.add("col-xs-1")
                        divIn.innerHTML = data[i][j].sala_apresentacao
                        div.appendChild(divIn)

                        document.getElementById("eventosSelecionados").appendChild(div)
                    }
                }
            } else {
                // nenhum evento encontrado
                document.getElementById("buscaTexto").innerHTML = "Infelizmente não encontramos nenhum evento"
            }

            display(4)
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
    $("#codApre").val("")
    $("#dataApre").val("")
    $("#horarioApre").val("")
    $("#precoApre").val("")
    $("#qtApre").val("")
    $("#codSalaApre").val("")

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
    div.setAttribute("onclick", "detalheAprensetacao(" + apresentacaoID + ")")
    div.classList.add("butao")
    document.getElementById("listaApresentacao").appendChild(div)
    document.getElementById('apresentacaoFormModal').click();

    apresentacaoID++
}

function detalheAprensetacao(id) {
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
            document.getElementById('texto_modal').innerHTML = response.msg
            document.getElementById('ingressoFeedBackModal').click();
        }
    });

}