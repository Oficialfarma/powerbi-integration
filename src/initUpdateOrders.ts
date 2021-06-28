import { OrdersDTO } from "./interfaces/OrdersDTO";
import { Database } from "./repositories/Database";
import UpdateOrders from "./repositories/UpdateOrders";
import createGetOrdersController from "./useCases/GetOrders";
import createHandleOrdersController from "./useCases/HandleOrders";
import writeLogError from "./utils/writeLogError";

type ordersId = {
    orderId: string;
}

(async function () {

    const db = new Database().createConnection();
    const response = await db
        .select("COUNT(orderId) AS rows")
        .from("OrdersToUpdate")
        .build();

    const limit = 500; // Limit of orders that will be updated per block
    let actualIndex = 0; // Initial index used on limit query
    let max = limit; // Max index used on limit query
    let hasError = false; // Stores if any error occurred

    /**
     * Call the update function every 20 seconds
     */
    const interval = setInterval(async () => {
        const { rows } = response[0];
        
        if(actualIndex > rows)
        {
            clearInterval(interval);
            
            if(hasError)
            {
                process.exit(0);
            }
            else
            {
                process.exit(1);
            }
        }

        const ordersToUpdate = await db
            .select('orderId')
            .from('OrdersToUpdate')
            .where(`indice BETWEEN ${actualIndex} AND ${max}`)
            .build();
        
        actualIndex += limit;
        max += limit;
        
        if(!ordersToUpdate.length)
        {
            return;
        }
    
        const orderId = ordersToUpdate.map((order: ordersId) => order.orderId);
        let detailedOrders: OrdersDTO[];
        
        try
        {
            detailedOrders = await createGetOrdersController.handle({
                timeout: 10000,
                methodType: "get",
                orderId
            })
            
            if(detailedOrders instanceof Error)
            {
                throw detailedOrders;
            }
        }
        catch(err)
        {
            writeLogError(err + " on update orders");
            clearInterval(interval);
            hasError = true;
            process.exit(err);
        }

        const updateResponse = await createHandleOrdersController.handle(detailedOrders, 'update');
        
        if(updateResponse instanceof Error)
        {
            hasError = true;
            writeLogError(updateResponse.toString());
            clearInterval(interval);
            process.exit(0);
        }
    }, 20000);
})();