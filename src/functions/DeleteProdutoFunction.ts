import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as sql from 'mssql';
import config from '../config';

export async function DeleteProdutoFunction(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`HTTP function processed request for url "${request.url}"`);
    context.log("Database Config:", config);

    const id = parseInt(request.params.id, 10);

    if (isNaN(id)) {
        return {
            status: 400,
            body: 'ID inválido'
        };
    }

    try {
        let pool = await sql.connect(config);
        context.log("Database Connected Successfully");

        await pool.request()
            .input('Id', sql.Int, id)
            .query('DELETE FROM Produto WHERE Id = @Id');

        pool.close();

        return {
            status: 200,
            body: 'Produto deletado com sucesso'
        };
    } catch (err) {
        context.log("Erro ao conectar ao banco de dados:", err);

        return {
            status: 500,
            body: 'Erro ao conectar ao banco de dados'
        };
    }
};

app.http('DeleteProdutoFunction', {
    methods: ['DELETE'],
    route: 'produtos/{id}', // Rota simplificada para capturar o ID
    authLevel: 'anonymous',
    handler: DeleteProdutoFunction
});
