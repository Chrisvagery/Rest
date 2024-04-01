# Rest

API REST com Autenticação JWT em Node.js, Express e MySQL

Este é um exemplo de uma API REST simples desenvolvida em Node.js usando o framework Express e um banco de dados MySQL. A API inclui recursos para registro de usuário, login, logout, acesso a recursos protegidos e exclusão de usuário.

Funcionalidades
Registro de Usuário: Os usuários podem se registrar fornecendo um nome de usuário e senha.
Login: Os usuários podem fazer login fornecendo seu nome de usuário e senha, recebendo um token JWT válido em resposta.
Logout: Os usuários autenticados podem fazer logout, invalidando seu token JWT.
Acesso a Recursos Protegidos: Alguns recursos da API estão protegidos e só podem ser acessados com um token JWT válido.
Exclusão de Usuário: Os usuários podem ser excluídos fornecendo seu ID de usuário 

Install dependencies
$ npm install express mysql dotenv jsonwebtoken bcryptjs

Para alterar a forma como a senha de um usuário é armazenada no banco de dados mysql. 
ALTER USER 'seu_usuario'@'localhost' IDENTIFIED WITH mysql_native_password BY 'sua_senha';


Tecnologias Utilizadas
Node.js
Express.js
MySQL
JWT (JSON Web Tokens)
bcryptjs (para criptografia de senhas)

Configuração
Configure o banco de dados MySQL e atualize as informações de conexão em db.js.
Execute o servidor usando npm start.

Endpoints
POST /api/users/register: Registro de usuário.
POST /api/users/login: Login de usuário.
GET /api/users/logout: Logout de usuário.
GET /api/users/protected: Acesso a recursos protegidos.
DELETE /api/users/:userId: Exclusão de usuário.

Testando a API
Você pode testar a API usando ferramentas como Thunder Client ou Postman. Certifique-se de seguir as instruções de uso para cada endpoint, incluindo a inclusão de cabeçalhos necessários (por exemplo, token JWT para endpoints protegidos).