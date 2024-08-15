<p align="center">
  <h1>Sistema de autenticação de usuário simples</h1>
</p>

<p>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">&nbsp;
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
</p>

<p>
  Este é um sistema simples de autenticação de usuários construído com <strong>Node.js</strong>, <strong>Express</strong> e <strong>PostgreSQL</strong>. O sistema inclui funcionalidades básicas de cadastro e login de usuários, além de hash de senhas usando <strong>bcrypt</strong>.
</p>

### ✔️ Status de Desenvolvimento

<p>
  <img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=FFD700&style=for-the-badge"/>
</p>

### ⚙️ Funcionalidades

- **Cadastro de Usuários**: Permite que novos usuários se registrem com um nome de usuário, nome, email, data de nascimento e senha.
- **Login de Usuários**: Permite que usuários registrados façam login com seu email e senha.
- **Hash de Senhas**: Utiliza bcrypt para garantir que as senhas sejam armazenadas de forma segura.

### 🛠️ Tecnologias Utilizadas

- **Node.js**: Plataforma de runtime para construir o backend.
- **Express**: Framework para Node.js que simplifica o desenvolvimento do servidor.
- **PostgreSQL**: Sistema de banco de dados relacional para armazenar informações dos usuários.
- **bcrypt**: Biblioteca para hashing seguro de senhas.

### ⚡ Telas

#### Tela de Login
<p align="center">
  <img src="screenshots/login.png" alt="Tela de Login" width="700"/>
</p>

#### Tela de Cadastro
<p align="center">
  <img src="screenshots/cadastro.png" alt="Tela de Cadastro" width="700"/>
</p>

### 🚀 Próximas Implementações

- **Verificação do Nível da Senha**: Implementar uma funcionalidade para avaliar a força da senha durante o cadastro.
- **Validação de Email**: Adicionar verificação para garantir que o formato do email seja válido e possivelmente usar um serviço de verificação de email.
