import createGetOrdersController from "./useCases/GetOrders";
import { GetAmountPages } from "./utils/GetAmountPages";
import { GetOptions } from "./utils/GetOptions";
const options = new GetOptions();

async function initOrdersGeneration()
{
    let urlAndOptions;

    await options.setLastTimeRequestFromJson();
    options.setTimeActualRequest();
    urlAndOptions = options.urlOptions('listOrders');
    const pages = await GetAmountPages.getPages(urlAndOptions);

    const ordersId = await createGetOrdersController.handle({
        ...urlAndOptions,
        methodType: "list",
        amountPages: pages
    });

    urlAndOptions = options.urlOptions('getOrders');

    const detailedOrders = await createGetOrdersController.handle({
        ...urlAndOptions,
        methodType: "get",
        orderId: ordersId
    });
}

initOrdersGeneration();