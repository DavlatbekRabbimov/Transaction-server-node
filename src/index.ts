import Fastify from 'fastify';
import itemRoutes from './routes/itemRoutes';
import userRoutes from './routes/userRoutes';
import migrate from 'node-pg-migrate';

const app = Fastify();

app.register(itemRoutes);
app.register(userRoutes);

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
    app.listen({port: 8181}, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
});
