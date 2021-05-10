import createFileSystemController from "./useCases/FileSystem";
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
        writeLogError(err);
    }

    let ordersId: string[];

    try
    {
        ordersId = await createGetOrdersController.handle({
            queryParams: queryParams,
            timeout: 10000,
            methodType: "list",
            amountPages: pages
        });
    }
    catch(err)
    {
        writeLogError(err);
    }
    
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
        writeLogError(err);
    }
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
        process.exit(1);
    }).catch((err) => {
        if(retryWriteLogLimit > 0)
        {
            retryWriteLogLimit-=1;
            setTimeout(writeLogError, 2000);
        }
        else
        {
            process.exit(1);
        }
    }); 
}