import { FastifyRequest, FastifyReply } from "fastify";
import { deductUserBalance } from '../services/userService';

interface RequestBody {
    userId: number;
    amount: number;
}

export async function deductUserBalanceHandler(request: FastifyRequest<{ Body: RequestBody }>, reply: FastifyReply) {
    const { userId, amount } = request.body;

    try {
        await deductUserBalance(userId, amount);
        reply.send({ message: `Success: Amount: $${amount} was deducted from balance!` });
    } catch (error) {
        reply.status(400).send({ error: (error as Error).message });
    }
}
