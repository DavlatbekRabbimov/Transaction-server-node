import {FastifyInstance} from 'fastify';
import {getItemsHandler} from '../controllers/itemController';

export default function itemRoutes(app: FastifyInstance, opts: any, done: Function) {
    app.get('/items', getItemsHandler);
    done();
}
