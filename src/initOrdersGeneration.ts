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
    const pages = await GetAmountPages.getPages({
        queryParams: queryParams,
        timeout: 10000,
    }).catch(err => {
        if(err) process.exit(0);
    });
    console.log(pages)
    // const ordersId = await createGetOrdersController.handle({
    //     queryParams: data.queryparams,
    //     timeout: 10000,
    //     methodType: "list",
    //     amountPages: pages
    // });


    // const detailedOrders = await createGetOrdersController.handle({
    //     queryParams: data.queryparams,
    //     timeout: 10000,
    //     methodType: "get",
    //     orderId: ordersId
    // });
}