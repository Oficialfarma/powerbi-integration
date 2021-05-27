import { OrdersDTO } from "./interfaces/OrdersDTO";
import createFileSystemController from "./useCases/FileSystem";
import createGetOrdersController from "./useCases/GetOrders";
import createHandleOrdersController from "./useCases/HandleOrders";
import { GetAmountPages } from "./utils/GetAmountPages";

process.on('message', data => {

    initOrdersGeneration(data);
});

async function initOrdersGeneration(queryParams: string)
{
    let pages: number;

    // try
    // {
    //     pages = await GetAmountPages.getPages({
    //         queryParams: queryParams,
    //         timeout: 10000,
    //     })
    // }
    // catch(err)
    // {
    //     writeLogError(err);
    // }

    // let ordersId: string[];

    // try
    // {
    //     ordersId = await createGetOrdersController.handle({
    //         queryParams: queryParams,
    //         timeout: 10000,
    //         methodType: "list",
    //         amountPages: pages
    //     });
    // }
    // catch(err)
    // {
    //     writeLogError(err);
    // }
    
    let detailedOrders: OrdersDTO[];

    try
    {
        detailedOrders = await createGetOrdersController.handle({
            queryParams: queryParams,
            timeout: 10000,
            methodType: "get",
            // orderId: ordersId
            orderId: ['1135150878674-01']
        });
    }
    catch(err)
    {
        writeLogError(err);
    }
    console.log(detailedOrders[0].shippingData);
    // const status = await createHandleOrdersController.handle(detailedOrders);

    // if(status instanceof Error)
    // {
    //     writeLogError(status.toString());
    // }
    // else
    // {
    //     process.exit(1);
    // }
}

let retryWriteLogLimit = 5;

async function writeLogError(errorMessage: string)
{
    const datas = await createFileSystemController.handle({
        filePath: 'error.log',
        methodName: 'read'
    })
    .then(resp => resp)
    .catch(err => err);
    
    let message;

    if(datas instanceof Error)
    {
        message = errorMessage + " " + new Date();
    }
    else
    {
        message = datas + '\r\n' + errorMessage + " " + new Date();
    }
    
    await createFileSystemController.handle({
        filePath: 'error.log',
        methodName: 'write',
        errorMessage: message
    }).then(() => {
        process.exit(0);
    }).catch((err) => {
        if(retryWriteLogLimit > 0)
        {
            retryWriteLogLimit-=1;
            setTimeout(writeLogError, 2000);
        }
        else
        {
            process.exit(0);
        }
    }); 
}