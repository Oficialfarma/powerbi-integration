import createGetOrdersController from "../src/useCases/GetOrders";
import { GetAmountPages } from "../src/utils/GetAmountPages";
import { GetOptions } from "../src/utils/GetOptions";

jest.mock('../src/useCases/GetOrders/index');

describe("Get orders", () => {
    it("Returns an Array with All orders ID", async () => {
        expect.assertions(1);

        const options = new GetOptions();
        await options.setLastTimeRequestFromJson();
        options.setTimeActualRequest();

        let urlAndOptions = options.urlOptions("listOrders");
        const pages = await GetAmountPages.getPages(urlAndOptions);
        
        createGetOrdersController.handle = jest.fn().mockResolvedValue([
            '123456-01', '1236548-01', '5698125-65'
        ]);
        
        return await createGetOrdersController.handle({
            methodType: "list",
            ...urlAndOptions,
            amountPages: pages
        }).then(resp => {
            expect(resp.length).toBeGreaterThan(1);
        });
    });
});