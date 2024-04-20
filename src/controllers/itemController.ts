import { getItems } from '../services/itemService';
import { FastifyRequest, FastifyReply } from "fastify";

export async function getItemsHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const items = await getItems();
        reply.send(items);
    } catch (error) {
        const err = error as Error;
        reply.status(500).send({ error: 'Internal Server Error', message: err.message });
    }
}
