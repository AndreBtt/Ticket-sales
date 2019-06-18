let mysql = require('mysql');
let Apresentacao = require('./apresentacao')

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

function Evento(codigo, nome, estado, cidade, classe, tipo, data_inicio, data_fim, apresentacoes) {
    this.codigo = codigo;
    this.nome = nome;
    this.estado = estado;
    this.cidade = cidade;
    this.classe = classe;
    this.tipo = tipo;
    this.data_inicio = data_inicio;
    this.data_fim = data_fim;
    this.apresentacoes = []
    for(let i = 0; i < apresentacoes.length; i++) {
        let a = apresentacoes[i]
        this.apresentacoes.push(new Apresentacao(a.codigo, a.data, a.horario, a.preco, a.ingressos, a.sala))
    }
}

Evento.prototype.adicionar_evento = function() {
    cria_evento(this.codigo, this.nome, this.estado, this.cidade, this.classe, this.tipo, this.data_inicio, this.data_fim)
    cria_apresentacoes(this.apresentacoes)
    criar_relacao(this.codigo, this.apresentacoes)
};

function cria_evento(codigo, nome, estado, cidade, classe, tipo, data_inicio, data_fim) {
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
            return "falha ao criar evento"
        }
        console.log("evento adicionado");
    });
}

function cria_apresentacoes(apresentacoes) {
    let sql = "INSERT INTO apresentacao (id, data, horario, preco, ingressos, sala) VALUES "
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
            return "falha ao criar apresentacoes"
        }
        console.log("apresentacoes adicionadas");
    });
}

function criar_relacao(codigo, apresentacoes) {
    let sql = "INSERT INTO evento_apresentacao (evento_id, apresentacao_id) VALUES "
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
            return "falha interna no banco de dados"
        }
        console.log("evento_apresentacoes adicionadas");
    });
}

module.exports = Evento