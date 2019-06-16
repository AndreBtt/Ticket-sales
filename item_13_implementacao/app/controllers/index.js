var mysql = require('mysql');

var con = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: "root",
    password: "andre1995",
    database: "Ticket"
});

exports.home = function(req, res) {
    res.render('home')
}

exports.eventos = function(req, res) {
    if(req.method == "GET") {
        // buscar eventos

        let info = req.body

        let data_inicio = info.data_inicio
        let data_fim = info.data_fim
        let estado = info.estado
        let cidade = info.cidade

        con.connect(function(err) {
            if (err) throw err;

            let sql = "SELECT * FROM evento WHERE "
            sql += "data_inicio >= '" + data_inicio + "' AND "
            sql += "data_fim <= '" + data_fim + "' AND "
            sql += "data_fim <= '" + data_fim + "' AND "
            sql += "estado = '" + estado + "' AND "
            sql += "cidade = '" + cidade + "'"

            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                console.log(result);
            });
        });
    } else if(req.method == "POST") {
        // criar evento

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

        con.connect(function(err) {
            if (err) throw err;

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

                sql = "INSERT INTO apresentacao (id, data, horario, preco, ingressos, sala) VALUES ("

                for(let i = 0; i < apresentacoes.length; i++) {
                    let ap = apresentacoes[i]
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

                    sql = "INSERT INTO evento_apresentacao (evento_id, apresentacao_id) VALUES ("

                    for(let i = 0; i < apresentacoes.length; i++) {
                        let ap = apresentacoes[i]
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
        })
    }
}

exports.ingresso = function(req, res) {
    let info = req.body

    let codigo = info.codigo
    let quantidade = info.quantidade

    let sql = "SELECT * FROM evento WHERE "

}