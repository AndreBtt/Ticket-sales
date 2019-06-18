let mysql = require('mysql');
let Evento = require('../model/evento');

let con = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: "root",
    password: "andre1995",
    database: "Ticket"
});

con.connect(function(err) {
    if (err) throw err
});

exports.home = function(req, res) {
    res.render('home')
}

exports.buscarEvento = function(req, res) {
    let info = req.body

    let data_inicio = info.data_inicio
    let data_fim = info.data_fim
    let estado = info.estado
    let cidade = info.cidade

    let sql = `select 
        evento.nome as evento_nome,
        apresentacao.id as codigo_apresentacao,
        apresentacao.data as data_apresentacao,
        apresentacao.horario as horario_apresentacao,
        apresentacao.preco as preco_apresentacao,
        apresentacao.ingressos as ingressos_apresentacao,
        apresentacao.sala as sala_apresentacao
        from
            evento_apresentacao
        inner join
            evento
        inner join
            apresentacao
        where
            evento.id = evento_apresentacao.evento_id AND
            apresentacao.id = evento_apresentacao.apresentacao_id AND
            evento.data_inicio >= '` + data_inicio + `' AND
            evento.data_fim <= '` + data_fim + `' AND
            evento.estado = '` + estado + `' AND
            evento.cidade = '` + cidade + `'`

    con.query(sql, function (err, result, fields) {
        if (err) throw err;

        let data = '{"data" : ['

        for(let i = 0; i < result.length; i++) {
            data += "{ "
            data += '"evento_nome": ' + '"' + result[i].evento_nome + '", '
            data += '"codigo_apresentacao": ' + result[i].codigo_apresentacao + ', '
            data += '"data_apresentacao": ' + '"' + result[i].data_apresentacao + '", '
            data += '"horario_apresentacao": ' + result[i].horario_apresentacao + ', '
            data += '"preco_apresentacao": ' + result[i].preco_apresentacao + ', '
            data += '"ingressos_apresentacao": ' + result[i].ingressos_apresentacao + ', '
            data += '"sala_apresentacao": ' + result[i].sala_apresentacao + "}"
            if(i != result.length -1 ) data += ','
        }
        data += ']}'
        res.end(data);
    });
}

exports.criarEvento = function(req, res) {
    let info = req.body
    let evento = new Evento(info.codigo, info.nome, info.estado, info.cidade, info.classe, info.tipo, info.data_inicio, info.data_fim, info.apresentacoes)
    evento.adicionar_evento()
}

exports.comprarIngresso = function(req, res) {
    let info = req.body

    let codigo = info.codigo
    let quantidade = info.quantidade

    let sql = "SELECT (ingressos) FROM apresentacao WHERE id = " + codigo

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        if(result == "") {
            res.end('{"msg" : "Nao existe apresentacao com esse codigo"}');
        } else {
            let ingressos = result[0].ingressos 
            if(quantidade > ingressos) {
                res.end('{"msg" : "A apresentacao nao possui ingressos suficientes"}');
            } else {
                let resultante = ingressos - quantidade
                sql = "UPDATE apresentacao SET ingressos = " + resultante + " WHERE id = " + codigo
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("ingressos atualizado");
                    res.end('{"msg" : "Seus ingressos foram comprados!"}');
                });
            }
        }
    });
}