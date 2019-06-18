const test = require('tape')

test('(Unitário) Usuário', (t) => {

    var usu = new usuario("Thiago Veras", "012.345.678-20", "coxinha13", "1234.5678.0123.1452", "451", "12-2032")

    usu.nome = "André Luis"

    t.assert(usu.nome === "André Luis", "Nome correto")
    t.assert(usu.cpf === "012.345.678-20", "CPF correto")
    t.assert(usu.senha === "coxinha13", "Senha correta")
    t.assert(usu.nCartao === "1234.5678.0123.1452", "Número de cartão correto")
    t.assert(usu.codSegCartao === 451, "Código de segurança correto")
    t.assert(usu.validCartao === "12-2032", "Código de validade correto")

    t.end()  
})

test('(Unitário) Apresentação', (t) => {

    var apre = new apresentacao(3,"Justin Bieber", "25-11-2019", "16:00", 100.00, 300, 4)

    apre.nome = "Racionais MC's"

    t.assert(apre.cod === 3, "Código correto")
    t.assert(apre.nome === "Racionais MC's", "Nome correto")
    t.assert(apre.data === "25-11-2019", "Data correta")
    t.assert(apre.hora === "16:00", "Hora correta")
    t.assert(apre.preco === 100, "Preço correto")
    t.assert(apre.qnt === 300, "Quantidade disponível correta")
    t.assert(apre.sala === 4, "Sala correto")


    t.end()  
})

test('(Unitário) Evento', (t) => {

    var event = new evento(1, "Rock in Brasília",new Array(apre1,apre2,apre3),  "Eixão", 18, "DF", "Brasília", "25-11-2019", "25-11-2019", "Musica")
    var apre = new apresentacao(3,"Justin Bieber", "25-11-2019", "16:00", 100.00, 300, 4)

    apre.nome = "Racionais MC's"

    t.assert(apre.cod === 3, "Código correto")
    t.assert(apre.nome === "Racionais MC's", "Nome correto")
    t.assert(apre.data === "25-11-2019", "Data correta")
    t.assert(apre.hora === "16:00", "Hora correta")
    t.assert(apre.preco === 100, "Preço correto")
    t.assert(apre.qnt === 300, "Quantidade disponível correta")
    t.assert(apre.sala === 4, "Sala correto")


    t.end()  
})


test('(Integração) Usuário', (t) => {

    var usu = new usuario("Thiago Veras", "012.345.678-20", "coxinha13", "1234.5678.0123.1452", "451", "12-2032")

    var apre1 = new apresentacao(3, "Racionais MC's", "25-11-2019", "16:00", 100.00, 300, 4)
    var apre2 = new apresentacao(2, "Justin Bieber", "25-11-2019", "17:00", 125.50, 400, 3)
    var apre3 = new apresentacao(1, "Falcão", "25-11-2019", "18:00", 140.00, 500, 4)

    var eve = new evento(1, "Rock in Brasília",new Array(apre1,apre2,apre3),  "Eixão", 18, "DF", "Brasília", "25-11-2019", "25-11-2019", "Musica")

    // TODO : Definir o retorno da função de compra de ingresso 
    t.assert(usu.comprarIngresso(eve.apre[0].cod, 50) === true, "Compra realizada com sucesso")
    t.assert(usu.comprarIngresso(eve.apre[2].cod, 800) === false, "Erro detectado com sucesso")

    t.end()  
})


