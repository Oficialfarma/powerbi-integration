import createGetOrdersController from "./useCases/GetOrders";
import { GetAmountPages } from "./utils/GetAmountPages";

type Params = {
    queryParams: string;
    lastTime: Date;
    actualTimeRequest: Date;
};

process.on('message', data => {

    initOrdersGeneration(data);
});

async function initOrdersGeneration({ queryParams, actualTimeRequest, lastTime }: Params)
{
    let pages: number;

    try
    {
        pages = await GetAmountPages.getPages({
            queryParams: queryParams,
            timeout: 10000,
        })
    }
    catch(err)
    {
        // process.send('Error: ', );
        process.send(`Error: ${err.toString()}`);
    }

    const ordersId = await createGetOrdersController.handle({
        queryParams: queryParams,
        timeout: 10000,
        methodType: "list",
        amountPages: pages
    });
    
    let detailedOrders: object[];

    try
    {
        detailedOrders = await createGetOrdersController.handle({
            queryParams: queryParams,
            timeout: 10000,
            methodType: "get",
            orderId: ordersId
        });
    }
    catch(err)
    {
        process.exit(1);
    }
}