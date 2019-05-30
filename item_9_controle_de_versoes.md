Esta etapa consiste na descrição do processo de controle de versões adotado para a realização do projeto Tickets Sale. Primeiramente há uma breve descrição sobre o que é um sistema de conrole de versões e depois uma descrição da ferramenta escolhida e comandos básicos para o uso.

## Sistema de Controle de Versões

Um sistema de controle de versão seria um sistema com a funcionalidade de gerenciar diferentes versões de um mesmo projeto. Ou seja, é trabalho com a versão do projeto, cada mudança é salva no servidor e com isso é possível obter históricos das modificações, permitir que vários programadores trabalhem no mesmo projeto e permitir um comparativo entre várias versões do projet[1].

No projeto Ticket Sales, o grupo ficou com uma certa dúvida na decisão de qual plataforma seria usada, porém para a decisão final  a plataforma [GitHub](https://github.com/), no qual disponibiliza o serviço de controle de versões mencionado anteriormente. A plataforma [GitHub](https://github.com/) é bastante utilizada por desenvolvedores ao redor do mundo, estando disponível para o público desde 2007, e abrigando mais de 100 milhões de repositórios em 2018 [2].

## Aplicação no projeto

Para o gerenciamento de versão projeto será utilizado um repositório público remoto na plataforma [GitHub](https://github.com/), no qual pode ser acessada a patir do seguinte link:

https://github.com/AndreBtt/Ticket-sales

Como a plataforma permite que vários programadores possam trabalhar no mesmo projeto facilmente, além dos integrantes terem o mesmo acesso ao repositório, o trabalho será divdido em etapas no qual os integrantes irão trabalhar igualmente no desenvolvimento.

## Utilizando o Repositório remoto da plataforma escolhida

Algumas operações básicas para utilização do controle de versões da plataforma [GitHub](https://github.com/) com base na documentação do [GitHub Guides](https://guides.github.com/).

### Obtendo uma cópia do projeto para alteração

A primeira etapa na produção utilizando um sistema de controle de versões é obter uma cópia do projeto na máquina local para começar a realizar as alterações.

O comando utilizado nor terminal para realizar uma cópia do projeto é :

```git clone https://github.com/AndreBtt/Ticket-sales.git```

Alternativamente você pode escolher fazer o download do repositório como um arquivo .zip diretamente do GitHub atravéz do link :

```https://github.com/AndreBtt/Ticket-sales/archive/master.zip```

### Salvando alterações locais

Após fazer algumas alterações necessáras, caso deseja salvar sua nova versão locamente, deve-se fazer o commit das mudanças utilizando o comando :

Este comando irá salvar todos os arquivo modificados, devido ao '.' no final do comando.

```git add . ```

Após salvar localmente, se utiliza a funcionalidade ```commmit```, essa operação adiciona uma breve descrição da modificação para ter um acompanhamento mais detalhado.

```git commit -m "Descrição da modificação"```



### Atualizando o repositório remoto

Após salvo localmente, a ideia é de subir a versão local para o servidor, fazendo com que os outros programadores tenham acesso a versão mais atualizada do sistema. Para subir algo do trabalho que esteja atualizado, qualquer linha de código, ou documento atualizado, utilize o comando push.

```git push```

## Referências
[1] Git, Medium. https://medium.com/trainingcenter/controle-de-vers%C3%A3o-git-github-e-bitbucket-afinal-o-que-%C3%A9-tudo-isso-9fa13fc13307

[2] GitHub, About. https://github.com/about
