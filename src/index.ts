import { GetAmountPages } from "./utils/GetAmountPages";
import { GetOptions } from "./utils/GetOptions";
const options = new GetOptions();

async function initOrdersGeneration()
{
    await options.setLastTimeRequestFromJson();
    let urlAndOptions = options.urlOptions();

    const pages = GetAmountPages.getPages(urlAndOptions);
}

initOrdersGeneration();