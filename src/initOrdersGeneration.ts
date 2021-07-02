import { OrdersDTO } from "./interfaces/OrdersDTO";
import createGetOrdersController from "./useCases/GetOrders";
import createHandleOrdersController from "./useCases/HandleOrders";
import { GetAmountPages } from "./utils/GetAmountPages";
import writeLogError from "./utils/writeLogError";

process.on('message', data => {

    initOrdersGeneration(data);
});

async function initOrdersGeneration(queryParams: string)
{
    let pages: number;

    try
    {
        pages = await GetAmountPages.getPages({
            queryParams: queryParams,
            timeout: 20000,
        })
    }
    catch(err)
    {
        writeLogError(err);
    }

    let ordersId: string[];

    try
    {
        ordersId = await createGetOrdersController.handle({
            queryParams: queryParams,
            timeout: 60000,
            methodType: "list",
            amountPages: pages
        });
    }
    catch(err)
    {
        writeLogError(err);
    }
    
    let detailedOrders: OrdersDTO[];

    try
    {
        detailedOrders = await createGetOrdersController.handle({
            timeout: 60000,
            methodType: "get",
            orderId: ordersId
        });
    }
    catch(err)
    {
        writeLogError(err);
    }
    
    const status = await createHandleOrdersController.handle(detailedOrders);

    if(status instanceof Error)
    {
        writeLogError(status.toString());
    }
    else
    {
        process.exit(1);
    }
}