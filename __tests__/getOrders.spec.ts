import { describe, test, expect } from '@jest/globals';

import createGetOrdersController from "../src/useCases/GetOrders";
import { GetOptions } from "../src/utils/GetOptions";
import { allOrdersMockResponse } from '../__mocks__/requestAllOrders.mock';

describe("Get orders", () => {
    
    const options = new GetOptions();
    options.setTimeActualRequest();
    
    test("Returns an Array with All orders ID", async () => {
        expect.assertions(1);
        
        await options.setLastTimeRequestFromJson();
        let urlAndOptions = options.urlOptions("listOrders");
        const pages = 1;
        
        return await createGetOrdersController.handle({
            methodType: "list",
            ...urlAndOptions,
            amountPages: pages
        }).then(resp => {
            let ids = 0;
            
            resp.map((el: any) => {
                if(typeof el === 'string') ids++;
            });

            expect(ids).toStrictEqual(resp.length);
        });
    });

    test("Returns an array of objects with all detailed orders", async () => {
        expect.assertions(1);

        await options.setLastTimeRequestFromJson();
        let urlAndoptions = options.urlOptions('getOrders');
        const mockedId = ["1080883513398-01"];

        return await createGetOrdersController.handle({
            methodType: 'get',
            ...urlAndoptions,
            orderId: mockedId 
        }).then(resp => {
            const expected = Object.keys(allOrdersMockResponse);
            const result = Object.keys(resp);

            expect(result).toEqual(expected);
        });
    });
});