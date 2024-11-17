# API de Produtos

Bem-vindo à API de Produtos! Esta API permite gerenciar produtos por meio de operações como listar, criar, consultar, atualizar e deletar. A seguir, você encontrará a documentação completa com exemplos para cURL e Postman.

---

## Postman Template
O arquivo CRUD-Ada-Teste.postman_collection.json é um template para testar a API no Postman, basta importar no aplicativo.

## Endpoints

### 1. **Listar todos os produtos**
- **Método:** `GET`
- **URL:** `/api/produtos/`
- **Descrição:** Retorna uma lista de todos os produtos cadastrados.

#### Exemplo com cURL:
```bash
curl -X GET https://os-normais-crud.azurewebsites.net/api/produtos/
```

#### Exemplo no Postman:
1. Método: **GET**
2. URL: `https://os-normais-crud.azurewebsites.net/api/produtos/`
3. Clique em **Send**.

---

### 2. **Criar um produto**
- **Método:** `POST`
- **URL:** `/api/produtos/`
- **Descrição:** Cria um novo produto no sistema.
- **Requisição:**
  - **Headers:**
    - `Content-Type: application/json`
  - **Body (JSON):**
    ```json
    { "Nome": "Novo Produto" }
    ```

#### Exemplo com cURL:
```bash
curl -X POST https://os-normais-crud.azurewebsites.net/api/produtos/ \
-H "Content-Type: application/json" \
-d '{"Nome": "Novo Produto"}'
```

#### Exemplo no Postman:
1. Método: **POST**
2. URL: `https://os-normais-crud.azurewebsites.net/api/produtos/`
3. Vá até a aba **Body**:
   - Selecione **raw** e o tipo **JSON**.
   - Insira:
     ```json
     { "Nome": "Novo Produto" }
     ```
4. Clique em **Send**.

---

### 3. **Listar um produto específico**
- **Método:** `GET`
- **URL:** `/api/produtos/{id_produto}`
- **Descrição:** Retorna os detalhes de um produto específico com base no ID fornecido.

#### Exemplo com cURL:
```bash
curl -X GET https://os-normais-crud.azurewebsites.net/api/produtos/1
```

#### Exemplo no Postman:
1. Método: **GET**
2. URL: `https://os-normais-crud.azurewebsites.net/api/produtos/1`
3. Clique em **Send**.

---

### 4. **Atualizar um produto**
- **Método:** `PUT`
- **URL:** `/api/produtos/{id_produto}`
- **Descrição:** Atualiza os dados de um produto existente.
- **Requisição:**
  - **Headers:**
    - `Content-Type: application/json`
  - **Body (JSON):**
    ```json
    { "Nome": "Produto Atualizado" }
    ```

#### Exemplo com cURL:
```bash
curl -X PUT https://os-normais-crud.azurewebsites.net/api/produtos/1 \
-H "Content-Type: application/json" \
-d '{"Nome": "Produto Atualizado"}'
```

#### Exemplo no Postman:
1. Método: **PUT**
2. URL: `https://os-normais-crud.azurewebsites.net/api/produtos/1`
3. Vá até a aba **Body**:
   - Selecione **raw** e o tipo **JSON**.
   - Insira:
     ```json
     { "Nome": "Produto Atualizado" }
     ```
4. Clique em **Send**.

---

### 5. **Deletar um produto**
- **Método:** `DELETE`
- **URL:** `/api/produtos/{id_produto}`
- **Descrição:** Remove um produto do sistema com base no ID fornecido.

#### Exemplo com cURL:
```bash
curl -X DELETE https://os-normais-crud.azurewebsites.net/api/produtos/1
```

#### Exemplo no Postman:
1. Método: **DELETE**
2. URL: `https://os-normais-crud.azurewebsites.net/api/produtos/1`
3. Clique em **Send**.

---

## Estrutura do Produto

- **Id:** Identificador único (auto incrementável).
- **Nome:** Nome do produto (obrigatório e deve ser uma string).

---

