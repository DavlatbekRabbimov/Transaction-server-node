import request from 'supertest';
import fastify, {FastifyInstance} from "fastify";
import userRoutes from "./userRoutes";

const app: FastifyInstance = fastify();

async function setup() {
    await app.register(userRoutes);
    await app.ready();
}

describe('POST /users/deduct-balance', () => {
    beforeAll(setup);

    it('should deduct balance when sufficient', async () => {
        const userId = 1;
        const amount = 100;

        const response = await request(app.server)
            .post('/users/deduct-balance')
            .send({userId, amount});

        expect(response.status).toBe(200);
        expect(response.body.message).toBe(`Success: Amount: $${amount} was deducted from balance!`);
    });

    it('should return error when balance is insufficient', async () => {
        const userId = 1;
        const amount = 10000;

        const response = await request(app.server)
            .post('/users/deduct-balance')
            .send({userId, amount});

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Insufficient balance');
    });

    afterAll(() => {
        app.close();
    });

});
