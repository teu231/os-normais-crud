import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as sql from 'mssql';
import config from '../config';

interface Produto { Nome: string; }

export async function CreateProdutoFunction(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`HTTP function processed request for url "${request.url}"`);

    const { Nome } = await request.json() as Produto;

    try {
        let pool = await sql.connect(config);
        context.log("Database Connected Successfully");

        const result = await pool.request()
            .input('Nome', sql.NVarChar, Nome)
            .query('INSERT INTO Produto (Nome) OUTPUT inserted.ID VALUES (@Nome)');

        pool.close();

        const novoIdDoProduto = result.recordset[0].ID;

        return {
            status: 201,
            body: JSON.stringify({
                message: 'Produto criado com sucesso',
                id: novoIdDoProduto
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

app.http('CreateProdutoFunction', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'produtos',
    handler: CreateProdutoFunction
});
