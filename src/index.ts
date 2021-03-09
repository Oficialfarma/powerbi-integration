import createGetOrdersController from "./useCases/GetOrders";
import { GetAmountPages } from "./utils/GetAmountPages";
import { GetOptions } from "./utils/GetOptions";
const options = new GetOptions();

async function initOrdersGeneration()
{
    await options.setLastTimeRequestFromJson();
    options.setTimeActualRequest();
    let urlAndOptions = options.urlOptions('listOrders');
    const pages = await GetAmountPages.getPages(urlAndOptions);

    const getOrders = await createGetOrdersController.handle({
        ...urlAndOptions,
        methodType: "list",
        amountPages: pages
    });
}

initOrdersGeneration();