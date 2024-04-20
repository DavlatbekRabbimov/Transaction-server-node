import pool from '../config/database';
import { User } from '../model/user';
import {SELECT_USER, UPDATE_USER_BALANCE} from "../sql/queries";
export async function deductUserBalance(userId: number, amount: number) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query<User>(SELECT_USER, [userId]);
        const user = result.rows[0];
        if (!user) throw new Error('User not found');
        const newBalance = user.balance - amount;
        if (newBalance < 0) throw new Error('Insufficient balance');

        await client.query(UPDATE_USER_BALANCE, [newBalance, userId]);
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}
