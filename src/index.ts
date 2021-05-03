import createGetOrdersController from "./useCases/GetOrders";
import { GetAmountPages } from "./utils/GetAmountPages";
import { GetOptions } from "./utils/GetOptions";
const options = new GetOptions();

async function initOrdersGeneration()
{
    let paramsAndOptions;

    await options.setLastTimeRequestFromJson();
    options.setTimeActualRequest();
    paramsAndOptions = options.urlOptions('listOrders');
    const pages = await GetAmountPages.getPages(paramsAndOptions);
    
    const ordersId = await createGetOrdersController.handle({
        ...paramsAndOptions,
        methodType: "list",
        amountPages: pages
    });

    paramsAndOptions = options.urlOptions('getOrders');

    const detailedOrders = await createGetOrdersController.handle({
        ...paramsAndOptions,
        methodType: "get",
        orderId: ordersId
    });
}

initOrdersGeneration();