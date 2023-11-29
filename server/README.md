<<<<<<< HEAD:server/README.md
Guia de Funcionamento do Servidor - API de Social Media
=======
Projeto Orkut-SocialMedia
Autor: Wesley Santos
Tecnologias Usadas:

    Node.js: Ambiente de execução JavaScript no lado do servidor.
    Express: Framework web para Node.js, utilizado na construção de APIs RESTful.
    Prisma: ORM (Object-Relational Mapping) para interação com o banco de dados SQL.
    PostgreSQL: Sistema de gerenciamento de banco de dados relacional.
    JWT (JSON Web Token): Padrão para token de acesso utilizado na autenticação.
    Bcrypt: Biblioteca para hash de senhas.
    Multer: Middleware para upload de arquivos.
    Sharp: Biblioteca para manipulação de imagens, utilizado para redimensionamento.
    Routing Controllers: Framework para facilitar a criação de controladores em aplicações Node.js.
    Class Validator: Biblioteca para validação de dados em classes usando decorators.
    Faker: Biblioteca para geração de dados fictícios para seed do banco de dados.
    Express-static: Middleware para servir arquivos estáticos.
    Reflect-metadata: Biblioteca para reflect-metadata para TypeScript.

Instruções Necessárias:

Para instalar as dependências:

    npm install

Scripts:

Para iniciar o servidor Front-End /cliente || Back-End /server:

    npm run dev

    --Guia de Funcionamento do Servidor - API de Social Media--
>>>>>>> 8cc3542c6f01678ea057655675f7514d72088ae6:README.md
Checkers de Autorização e Usuário Atual

    authorizationChecker.ts: Verifica a autorização para ações específicas, utilizando o serviço JWT para extrair e validar o token do cabeçalho da solicitação.

    currentUserChecker.ts: Obtém e retorna o usuário atual com base no token JWT, consultando o repositório de usuários para obter as informações correspondentes.

DTOs (Objetos de Transferência de Dados)

    signIn.dto.ts: DTO para validar dados durante a autenticação (sign-in), incluindo validações para e-mail e senha.

Controladores

    auth.controller.ts: Controlador responsável pelas rotas de autenticação, incluindo métodos para sign-in, sign-up e recuperação de informações de sessão para usuários autenticados.

Serviços

    auth.service.ts: Serviço que contém a lógica de autenticação, interagindo com o repositório de usuários para verificar credenciais e criar novos usuários. Utiliza o serviço JWT.

    jwt.service.ts: Serviço para geração e validação de tokens JWT, incluindo a extração de tokens do cabeçalho da solicitação. Possui classes de erro personalizadas relacionadas a problemas com tokens JWT.

Controlador e Serviço para Manipulação de Arquivos

    FileController.ts: Controlador responsável por lidar com operações relacionadas a arquivos, como obtenção de arquivos e redimensionamento de imagens.
        Endpoint:
            GET /file/:path: Obtém um arquivo especificado no caminho. Aceita parâmetros de consulta opcionais para redimensionar a largura e altura da imagem.

    FileService.ts: Serviço que contém a lógica para manipulação de arquivos, incluindo a leitura de arquivos do sistema de arquivos, redimensionamento de imagens usando a biblioteca Sharp e retorno do conteúdo da imagem redimensionada.
        Método:
            getFile(path: string, width: number, height: number): Promise<Buffer>: Obtém o arquivo especificado no caminho, redimensionando a imagem se as dimensões forem fornecidas.

Controlador e Serviço para Operações com Posts e Comentários

    PostController.ts: Controlador responsável por operações relacionadas a posts e seus comentários.
        Endpoints:
            GET /posts: Obtém uma lista de posts com opções de paginação, ordenação e pesquisa.
            GET /posts/:id: Obtém detalhes de um post específico.
            POST /posts: Cria um novo post.
            DELETE /posts/:id: Deleta um post existente.
            PUT /posts/:id: Atualiza um post existente.
            GET /posts/:id/comments: Obtém a lista de comentários de um post específico.
            POST /posts/:id/comments: Cria um novo comentário em um post.

    PostService.ts: Serviço responsável por lógicas de negócios relacionadas a posts, como deletar e atualizar posts.
        Métodos:
            deletePost(postId: number, userId: number): Promise<any>: Deleta um post se o usuário for o autor.
            updatePost(postId: number, data: UpdatePostDto): Promise<any>: Atualiza um post se o usuário for o autor.

Controlador e Serviço para Operações com Usuários

    UserController.ts: Controlador responsável por operações relacionadas a usuários.
        Endpoints:
            GET /users/:userId: Obtém detalhes de um usuário específico.
            GET /users/:userId/friends: Obtém a lista de amigos mais recentes de um usuário.
            POST /users/avatar: Faz upload de um novo avatar para o usuário autenticado.
            PATCH /users/update-myself: Atualiza informações do usuário autenticado.
            POST /users/add-friend/:friendId: Adiciona um amigo para o usuário autenticado.
            POST /users/remove-friend/:friendId: Remove um amigo do usuário autenticado.
            GET /users/check-is-friend/:friendId: Verifica se um usuário é amigo do usuário autenticado.

    UserRepository.ts: Repositório responsável pela interação com o banco de dados para operações relacionadas a usuários.
        Métodos:
            createUser(data: CreateUserDto): Promise<any>: Cria um novo usuário.
            updateUser(userId: number, data: UpdateUserDto): Promise<any>: Atualiza informações de um usuário.
            readUser(userId: number): Promise<any>: Obtém detalhes de um usuário específico.
            findByEmail(email: string): Promise<any>: Encontra um usuário pelo endereço de e-mail.
            listUsers(): Promise<any>: Lista todos os usuários.
            checkIsFriend(userId: number, friendId: number): Promise<boolean>: Verifica se dois usuários são amigos.
            addFriend(userId: number, friendId: number): Promise<any>: Adiciona um amigo.
            removeFriend(userId: number, friendId: number): Promise<any>: Remove um amigo.
            listLatestFriends(userId: number): Promise<any>: Lista os amigos mais recentes.

    UserService.ts: Serviço responsável por lógicas de negócios relacionadas a usuários.
        Métodos:
            addFriend(userId: number, friendId: number): Promise<any>: Adiciona um amigo, verificando se já são amigos.
            removeFriend(userId: number, friendId: number): Promise<any>: Remove um amigo, verificando se são amigos.
            uploadAvatar(userId: number, avatar: Express.Multer.File): Promise<any>: Faz upload e atualiza o avatar do usuário.

Observações Gerais:

    Autenticação é necessária para várias operações.
    Uso de bcrypt para hash de senha.
    Upload de avatar usando Sharp para redimensionamento.
    Endpoints para interação com usuários, incluindo operações de amizade e atualização de perfil.
