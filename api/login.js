// api/login.js
const { MongoClient } = require('mongodb');

const uri = 'SUA_STRING_DE_CONEXÃO_DO_MONGODB';
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        try {
            await client.connect();
            const database = client.db('nome_do_seu_banco');
            const collection = database.collection('usuarios');

            const user = await collection.findOne({ username, password });
            if (user) {
                res.status(200).json({ message: 'Login bem-sucedido!' });
            } else {
                res.status(401).json({ message: 'Credenciais inválidas.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro no servidor.' });
        } finally {
            await client.close();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
