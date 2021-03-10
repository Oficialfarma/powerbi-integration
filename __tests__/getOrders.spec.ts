import createGetOrdersController from "../src/useCases/GetOrders";
import { GetAmountPages } from "../src/utils/GetAmountPages";
import { GetOptions } from "../src/utils/GetOptions";
import { allOrdersMockResponse } from '../__mocks__/requestAllOrders.mock';

jest.mock('../src/useCases/GetOrders/index');

describe("Get orders", () => {
    
    const options = new GetOptions();
    options.setTimeActualRequest();
    
    it("Returns an Array with All orders ID", async () => {
        expect.assertions(1);
        
        await options.setLastTimeRequestFromJson();
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

    it("Returns an array of objects with all detailed orders", async () => {
        expect.assertions(1);

        await options.setLastTimeRequestFromJson();
        let urlAndoptions = options.urlOptions('getOrders');
        const mockedIds = ["12345678-01", "23456789-01", "5635156-01"];

        createGetOrdersController.handle = jest.fn().mockResolvedValue(allOrdersMockResponse);

        return await createGetOrdersController.handle({
            methodType: 'get',
            ...urlAndoptions,
            orderId: mockedIds 
        }).then(resp => {
            expect(resp).toEqual(allOrdersMockResponse);
        });
    })
});