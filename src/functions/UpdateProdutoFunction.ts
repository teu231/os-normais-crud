import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as sql from 'mssql';
import config from '../config';


interface Produto {
    Id: number,
    Nome: string,
};

export async function UpdateProdutoFunction(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`HTTP function processed request for url "${request.url}"`);

    const { Id, Nome } = await request.json() as Produto;

    try {
        let pool = await sql.connect(config);
        context.log("Database Connected Successfully");

        await pool.request()
            .input('Id', sql.Int, Id)
            .input('Nome', sql.NVarChar, Nome)
            .query('UPDATE Produto SET Nome = @Nome WHERE Id = @Id');

        pool.close();

        return {
            status: 200,
            body: 'Produto atualizado com sucesso'
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
    route: 'produtos/{id}',
    handler: UpdateProdutoFunction
});
