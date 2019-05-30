## Declaração do Projeto

O projeto consiste em um sistema de compra e venda de ingressos para eventos dos mais variados tipos. Deve ser possível criar novos eventos que serão anunciados no sistema, além de um usuário conseguir comprar os ingressos para esses eventos.

## Stakeholders

Para esse sistema, temos dois Stakeholders, os anunciantes, os clientes e os visitantes.

Os anunciantes são responsáveis por anunciar os eventos. Ele pode especificar o tipo do evento (show, esporte), localização, preço, horário, dentre vários outros recursos.

Os clientes são o responsáveis pela compra do ingresso para o evento específico. Deve ser possível ver os eventos disponíveis, selecionar e comprar o ingresso para o evento.

Os visitantes são as pessoas que entram no site e apenas olham os anúncios, mas não compram e não cadastram evento algum. Grande parte das vezes, os visitantes são usuários não cadastrados no sistema.

## Necessidades e Funcionalidades

O usuário deve conseguir cadastrar um usuário, descadastrar um usuário, cadastrar um evento, alterar um evento, requistar informações sobre um evento e comprar ingresso.

O sistema tem suporte diferente para **usuários não cadastrados** e **usuários cadastrados**

Usuários não cadastrados possuem acesso aos dados dos eventos e para isso é nescessário uma busca no sistema fornecendo data de início e fim, estado e cidade.

Uma lista é fornecida para o usuário com os eventos disponíveis no período (data de início e término), estado e cidade especificada por ele. 

Para a compra do ingresso é nescessário o cadastro no sistema.

Para se cadastrar o usuário deve fornecer CPF, Senha, Número do cartão de crédito, Código de segurança do cartão de crédito e Validade do cartão de crédito.

Após o cadastro o usuário pode acessar sua conta fornecendo seu CPF e senha.