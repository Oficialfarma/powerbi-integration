import { Database } from "./Database";

export default class UpdateOrders extends Database
{
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