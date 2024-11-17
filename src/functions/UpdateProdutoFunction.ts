import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as sql from 'mssql';
import config from '../config';

interface Produto {
    Nome: string;
}

export async function UpdateProdutoFunction(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`HTTP function processed request for url "${request.url}"`);

    // Obter o ID da URL
    const id = request.params.id;

    // Validar o ID
    if (!id || isNaN(Number(id))) {
        return {
            status: 400,
            body: 'O ID fornecido na URL é inválido.'
        };
    }

    // Obter o corpo da requisição
    const { Nome } = await request.json() as Produto;

    // Validar o campo Nome
    if (!Nome) {
        return {
            status: 400,
            body: 'O campo "Nome" é obrigatório.'
        };
    }

    try {
        let pool = await sql.connect(config);
        context.log("Database Connected Successfully");

        const result = await pool.request()
            .input('Id', sql.Int, Number(id))
            .input('Nome', sql.NVarChar, Nome)
            .query('UPDATE Produto SET Nome = @Nome WHERE Id = @Id');

        pool.close();

        if (result.rowsAffected[0] === 0) {
            return {
                status: 404,
                body: 'Produto não encontrado.'
            };
        }

        return {
            status: 200,
            body: JSON.stringify({
                message: 'Produto atualizado com sucesso',
                id: id
            })
        };
    } catch (err) {
        context.log("Erro ao conectar ao banco de dados:", err);

        return {
            status: 500,
            body: 'Erro ao conectar ao banco de dados'
        };
    }
};

app.http('UpdateProdutoFunction', {
    methods: ['PUT'],
    authLevel: 'anonymous',
    route: 'produtos/{id}', // Parâmetro "id" definido na rota
    handler: UpdateProdutoFunction
});
