# Ticket-sales

Ticket sales é o projeto da disciplina de engenharia de software da Universidade de Brasilia.

O grupo responsável por desenvolver é constituido pelos membros :
-   **André Luiz Bittencourt**
-   **Thiago Veras Machado**
-   **Luan Pignata**

## Descrição do Projeto

Sistema de venda de ingressos e criação de eventos.

### Eventos

O sitema tem suporte para quatro tipos diferentes de eventos:
-   Teatro
-   Esporte
-   Show nacional
-   Show internacional

Cada evento possui as seguintes características :
-   Código único do evento
-   Nome
-   Classe e faixa etária
-   Estado em que ocorre
-   Cidade em que ocorre
-   No mínimo **uma** e no máximo **dez** apresentações

Para cada aprensentação exibida em um evento as seguintes caracteristicas devem ser especificadas :
-   Código único da apresentação
-   Data
-   Horário
-   Preço
-   Código da sala

### Usuários

O sistema tem suporte diferente para **usuários não cadastrados** e **usuários cadastrados**

#### Usuários não cadastrados

Usuários não cadastrados possuem acesso aos dados dos eventos e para isso é nescessário uma busca no sistema fornecendo os dados :
-   Data de início
-   Data de término
-   Estado
-   Cidade

Uma lista é fornecida para o usuário com os eventos disponíveis no período (data de início e término), estado e cidade especificada por ele. 

A lista possui o seguinte formato :
-   Nome do evento
-   Apresentações do evento
    -   Código da aprensetação
    -   Data da aprensetação
    -   Horário da aprensetação
    -   Preço do ingresso   
    -   Quantidade de ingressos disponíveis   
    -   Número da sala onde ocorrerá a aprensetação       

Para a compra do ingresso é nescessário o cadastro no sistema.

#### Usuários cadastrados

Para se cadastrar o usuário deve fornecer os seguintes dados :
-   CPF
-   Senha
-   Número do cartão de crédito
-   Código de segurança do cartão de crédito
-   Validade do cartão de crédito

Após o cadastro o usuário pode acessar sua conta fornecendo seu CPF e senha.

Uma vez cadastrado o usuário pode :

1.  **Compra de ingressos**

    Para a compra dos ingressos o usuário deve fornecer os seguintes dados :
    -   Código da apresentação
    -   Quantidade de ingressos
    
    O sistema verificará se existe a quantidade de ingressos desejada para a apresentação e retornará uma lista com os códigos dos ingressos.

2.  #### **Cadastrar evento**

    Para a criação de um novo evento o usuário deve ser responsável por **menos de cinco eventos** e fornecer as seguintes informações :
    -   Código do evento
    -   Nome do evento
    -   Estado onde vai ocorrer
    -   Cidade onde vai ocorrer
    -   Classe e faixa etária
    -   Apresentações
        -   Código da aprensetação
        -   Data da aprensetação
        -   Horário da aprensetação
        -   Preço do ingresso
        -   Quantidade de ingressos disponíveis
        -   Código da sala onde ocorrerá a aprensetação     

3.  **Alterar evento**

    Para editar um evento o usuário deve ser o responsável pela criação dele.

    Se algum ingresso para qualquer apresentação do evento já tiver sido vendido, o evento nao poderá ser mais editado.

    Para editar um evento deve ser fornecidos os dados usados em sua [criação](#Cadastrar-evento) alterando os dados que deseja modificar.

4.  **Descadastrar evento**

    Para descadastrar um evento o usuário deve ser o responsável pela criação dele.

    Se algum ingresso para qualquer apresentação do evento já tiver sido vendido, o evento nao poderá ser mais descadastrado.

    Para descadastrar um evento seu código deve ser fornecido, todos os dados do evento serão deletados.

5. **Informação sobre um evento criado**

    O usuário responsável por um evento pode requisitar informações sobre seu evento.

    Para obter informações é nescessário fornecer o código do evento.

    Uma lita é fornecida para o usuário com os seguintes dados de todas as apresentações do evento :
    -   Código da apresentação
    -   Quantidade de ingressos vendidos
    -   CPF de cada comprador

6.  **Descadastrar conta**

    Para descadastrar sua conta o usuário não pode ser responsável por nenhum evento.

    Após o descadastro todas as informações do usuário são deletadas do sistema.    