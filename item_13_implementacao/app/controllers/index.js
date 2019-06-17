var mysql = require('mysql');

var con = mysql.createConnection({
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

    let sql = "SELECT * FROM evento WHERE "
    sql += "data_inicio >= '" + data_inicio + "' AND "
    sql += "data_fim <= '" + data_fim + "' AND "
    sql += "data_fim <= '" + data_fim + "' AND "
    sql += "estado = '" + estado + "' AND "
    sql += "cidade = '" + cidade + "'"

    con.query(sql, function (err, result, fields) {
        if (err) throw err;

        let data = '{"data" : ['

        for(let i = 0; i < result.length; i++) {
            data += '"' + result[i].nome + '"'
            if(i != result.length -1 ) data += ','
        }
        data += ']}'
        res.end(data);
    });
}

exports.criarEvento = function(req, res) {
    let info = req.body

    let codigo = info.codigo
    let nome = info.nome
    let estado = info.estado
    let cidade = info.cidade
    let classe = info.classe
    let tipo = info.tipo
    let data_inicio = info.data_inicio
    let data_fim = info.data_fim
    let apresentacoes = info.apresentacoes

    let sql = "INSERT INTO evento (id, nome, tipo, classe, estado, cidade, data_inicio, data_fim) VALUES ("
    sql += codigo + ", "
    sql += "'" + nome + "', "
    sql += "'" + tipo + "', "
    sql += classe + ", "
    sql += "'" + estado + "', "
    sql += "'" + cidade + "', "
    sql += "'" + data_inicio + "', "
    sql += "'" + data_fim + "')"

    con.query(sql, function (err, result) {
        if (err) {
            res.end('{"status" : "fail"}');
            throw err;
        }
        console.log("evento adicionado");

        sql = "INSERT INTO apresentacao (id, data, horario, preco, ingressos, sala) VALUES "

        for(let i = 0; i < apresentacoes.length; i++) {
            let ap = apresentacoes[i]
            sql += "("
            sql += ap.codigo + ", "
            sql += "'" + ap.data + "', "
            sql += "'" + ap.horario + "', "
            sql += ap.preco + ", "
            sql += ap.ingressos + ", "
            sql += ap.sala + ")"
            if(i != apresentacoes.length - 1) {
                sql += ", "
            }
        }

        con.query(sql, function (err, result) {
            if (err) {
                res.end('{"status" : "fail"}');
                throw err;
            }

            console.log("apresentacoes adicionadas");

            sql = "INSERT INTO evento_apresentacao (evento_id, apresentacao_id) VALUES "

            for(let i = 0; i < apresentacoes.length; i++) {
                let ap = apresentacoes[i]
                sql += "("
                sql += codigo + ", "
                sql += ap.codigo + ")"
                if(i != apresentacoes.length - 1) {
                    sql += ", "
                }
            }

            con.query(sql, function (err, result) {
                if (err) {
                    res.end('{"status" : "fail"}');
                    throw err;
                }

                console.log("evento_apresentacoes adicionadas");
                res.end('{"status" : "success"}');
            });
        });
    });
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