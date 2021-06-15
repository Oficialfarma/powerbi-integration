import { Database } from "./Database";

/**
 * @classdesc class to create the limit of the orders table
 */
export default class UpdateOrders extends Database
{
    /**
     * @description create the limit query
     * @param actualIndex initial index of clause between
     * @param maxIndex final index of clause between
     * @returns class instance
     */
    specialLimit(actualIndex: number, maxIndex: number)
    {
        const query = `
            WITH OrderTable AS
            (
                SELECT *,
                indice = ROW_NUMBER() OVER (ORDER BY orderId) 
                FROM Orders
            )
            SELECT orderId
            FROM OrderTable
            WHERE indice BETWEEN ${actualIndex} AND ${maxIndex} AND statusDescription<>'Faturado' AND statusDescription<>'Cancelado'
            ORDER BY orderId;
        `;

        this.queriesToExecute.push(query);

        return this;
    }
}