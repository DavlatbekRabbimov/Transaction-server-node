import request from 'supertest';
import fastify, { FastifyInstance } from 'fastify';
import itemRoutes from './itemRoutes';

const app: FastifyInstance = fastify();

async function setup() {
    await app.register(itemRoutes);
    await app.ready();
}

describe('Test the getItems route', () => {
    beforeAll(setup);

    test('It should respond with an array of items', async () => {
        const response = await request(app.server)
            .get('/items')
            .expect(200)
            .expect('Content-Type', /json/);
        expect(response.body).toBeInstanceOf(Array);
    }, 5000);

    afterAll(() => {
        app.close();
    });
});
