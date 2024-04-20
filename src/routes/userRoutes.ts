import { FastifyInstance } from 'fastify';
import { deductUserBalanceHandler } from '../controllers/userController';

export default function userRoutes(app: FastifyInstance, opts: any, done: Function) {
    app.post('/users/deduct-balance', deductUserBalanceHandler);
    done();
}
