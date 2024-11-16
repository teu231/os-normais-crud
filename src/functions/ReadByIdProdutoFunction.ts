import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as sql from 'mssql';
import config from '../config';


export async function ReadByIdProdutoFunction(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`HTTP function processed request for url "${request.url}"`);

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

        let result = await pool.request()
            .input('Id', sql.Int, id)
            .query('SELECT Id, Nome FROM Produto WHERE Id = @Id');

        pool.close();

        if (result.recordset.length === 0) {
            return {
                status: 404,
                body: 'Produto não encontrado'
            };
        }

        return {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result.recordset[0])
        };
    } catch (err) {
        context.log("Erro ao conectar ao banco de dados:", err);

        return {
            status: 500,
            body: 'Erro ao conectar ao banco de dados'
        };
    }
};

app.http('ReadByIdProdutoFunction', {
    methods: ['GET'],
    route: 'produtos/{id}',
    authLevel: 'anonymous',
    handler: ReadByIdProdutoFunction
});
