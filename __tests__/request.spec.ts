import { describe, test, expect } from "@jest/globals";

import { Requests } from '../src/providers/Requests';
import { GetOptions } from "../src/utils/GetOptions";

const requests = new Requests();
const options = new GetOptions();
options.setTimeActualRequest();

describe("VTEX Error connection", () => {
   
    test(`#TimeoutDelay Throw a timeout error`, async () => {
        await options.setLastTimeRequestFromJson();
        const urlAndOptions = options.urlOptions("listOrders");
        
        const result = await requests.makeRequest({
            ...urlAndOptions,
            timeout: 1
        }).catch(resp => {
            return resp;
        });

        expect(result).toEqual(new Error("Timeout error"));
    });

    test('#makeRequest Return successfully request response', async () => {
        await options.setLastTimeRequestFromJson();
        const urlAndOptions = options.urlOptions("listOrders");

        const response = await requests.get(
            urlAndOptions.url + urlAndOptions.queryParams + "&page=1",
            urlAndOptions.options
        ).then(resp => {
            return resp;
        });

        const expectedKeys = ['list', 'facets', 'paging', 'stats', 'reportRecordsLimit'];
        const responseKeys = Object.keys(response);
        
        expect(responseKeys).toStrictEqual(expectedKeys);
    });

    test('#makeRequest - should call the error status write when a request error occurs', async () => {

        await options.setLastTimeRequestFromJson();
        const urlAndOptions = options.urlOptions("listOrders");

        const response = await requests.get(
            urlAndOptions.url + "&page=100",
            urlAndOptions.options
        ).catch(err => {
            return err;
        })
        
        expect(response).toBeInstanceOf(Error);
    })

    test("#RequestErrors - Should write the error status", async () => {
        const result = await requests.requestErrors().then(resp => {
            
            return resp
        });

        const expected = 'File has saved';

        expect(result).toEqual(expected);
    });
});