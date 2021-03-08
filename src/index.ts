import { GetAmountPages } from "./utils/GetAmountPages";
import { GetOptions } from "./utils/GetOptions";
const options = new GetOptions();

async function initOrdersGeneration()
{
    await options.setLastTimeRequestFromJson();
    options.setTimeActualRequest();
    let urlAndOptions = options.urlOptions('listOrders');
    const pages = GetAmountPages.getPages(urlAndOptions);
}

initOrdersGeneration();