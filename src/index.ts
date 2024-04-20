import Fastify from 'fastify';
import itemRoutes from './routes/itemRoutes';
import userRoutes from './routes/userRoutes';
import migrate from 'node-pg-migrate';
import dotenv from 'dotenv';

dotenv.config();

const app = Fastify();

app.register(itemRoutes);
app.register(userRoutes);

const port = process.env.PORT || 3000;

migrate({
    direction: 'up',
    dir: 'migrations',
    migrationsTable: 'pgmigrations',
    databaseUrl: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
}).then(() => {
    const options = {
        port: Number(port)
    };
    app.listen(options, () => {
        console.log(`Server listening on port http://localhost:${port}`)
    })
});
