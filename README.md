# API REST Restaurante

API REST para gerenciamento de pratos e bebidas de um restaurante, feita com Node.js, Express e MySQL. Permite cadastrar, consultar, atualizar e excluir itens do cardápio (operações CRUD).

## Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) – framework web
- [MySQL](https://www.mysql.com/) (pacote `mysql`) – acesso ao banco de dados
- [body-parser](https://www.npmjs.com/package/body-parser) – leitura do corpo das requisições (JSON e urlencoded)
- [morgan](https://www.npmjs.com/package/morgan) – log das requisições no terminal
- [cors](https://www.npmjs.com/package/cors) – controle de acesso entre origens
- [nodemon](https://nodemon.io/) – reinício automático do servidor em desenvolvimento

## Pré-requisitos

- Node.js instalado
- MySQL Server em execução (por exemplo, com o MySQL Workbench)
- Git (opcional, para clonar o projeto)

## Instalação

1. Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/Kakamc12/APIRestRestaurante.git
cd APIRestRestaurante
```

2. Instale as dependências. Se o projeto já tem o `package.json`, basta:

```bash
npm install
```

Para instalar cada dependência individualmente (por exemplo, ao criar o projeto do zero):

```bash
npm install --save mysql
npm install --save cors
npm install --save body-parser
npm install --save morgan
npm install --save-dev nodemon
npm install --save express
```

## Banco de dados

Execute o script abaixo no MySQL Workbench para criar o banco e a tabela:

```sql
CREATE DATABASE IF NOT EXISTS restaurante;
USE restaurante;

CREATE TABLE IF NOT EXISTS prato (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    categoria VARCHAR(255),
    preco DECIMAL(10,2)
);
```

## Configuração

As credenciais de conexão com o MySQL ficam no arquivo `rotas/nodemon.json`:

```json
{
    "env": {
        "MYSQL_USER": "seu_usuario",
        "MYSQL_PASSWORD": "sua_senha",
        "MYSQL_DATABASE": "restaurante",
        "MYSQL_HOST": "localhost",
        "MYSQL_PORT": 3306
    }
}
```

> **Atenção:** esse arquivo contém a senha do banco. Não o envie para um repositório público; adicione `rotas/nodemon.json` ao `.gitignore`.

## Executando

```bash
npm start
```

O servidor sobe em `http://localhost:3000`.

## Estrutura do projeto

```
.
├── app.js              # Configuração do Express, middlewares e rotas
├── server.js           # Criação do servidor HTTP (porta 3000)
├── package.json
└── rotas/
    ├── mysql.js        # Pool de conexões com o MySQL
    ├── nodemon.json    # Credenciais do banco
    └── pratoDao.js     # Rotas CRUD de pratos
```

## Endpoints

URL base: `http://localhost:3000/api.restaurante/prato-dao`

| Método | Rota      | Descrição                  |
|--------|-----------|----------------------------|
| GET    | `/getAll` | Lista todos os pratos      |
| GET    | `/getId`  | Busca um prato pelo `id`   |
| POST   | `/create` | Cadastra um novo prato     |
| POST   | `/update` | Atualiza um prato          |
| POST   | `/delete` | Exclui um prato            |

Nas requisições `POST`, envie o corpo em JSON com o header `Content-Type: application/json`.

### Listar todos os pratos

```
GET /api.restaurante/prato-dao/getAll
```

### Buscar prato por ID

```
GET /api.restaurante/prato-dao/getId?id=1
```

### Cadastrar prato

```
POST /api.restaurante/prato-dao/create
```

```json
{
    "nome": "Batata Frita",
    "categoria": "Entrada",
    "preco": "18.50"
}
```

### Atualizar prato

```
POST /api.restaurante/prato-dao/update
```

```json
{
    "id_prato": 1,
    "nome": "Bife à Milanesa",
    "categoria": "Prato Principal",
    "preco": "35.90"
}
```

### Excluir prato

```
POST /api.restaurante/prato-dao/delete
```

```json
{
    "id_prato": 1
}
```

## Exemplos de itens para cadastro

```json
{ "nome": "Bife à Parmegiana", "categoria": "Prato Principal", "preco": "42.90" }
{ "nome": "Suco de Laranja", "categoria": "Bebida", "preco": "9.00" }
{ "nome": "Pudim de Leite", "categoria": "Sobremesa", "preco": "14.00" }
{ "nome": "Salmão Grelhado", "categoria": "Prato Principal", "preco": "58.00" }
```

Cada item deve ser enviado em uma requisição separada.
