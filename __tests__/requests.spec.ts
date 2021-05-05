import dotenv from 'dotenv';
dotenv.config();

import { describe, test, expect, jest, beforeEach } from "@jest/globals";

import { Requests } from '../src/providers/Requests';
import { GetOptions } from "../src/utils/GetOptions";
import axios from 'axios';

describe("VTEX API request", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
   
    test.todo('#Make request - Should returns a resolve promisse with order id/datas');

    test('#timeDelay - Should throws a Timeout Error', async () => {

        expect(axios.get).not.toHaveBeenCalled()
        const options = new GetOptions();
        const requests = new Requests();

        const actualTimeRequest = new Date('2021-05-05T13:30:00');
        const lastRequestTime = new Date('2021-05-05T13:00:00');

        const params = options.urlOptions({
            method: 'listOrders',
            actualTimeRequest,
            lastRequestTime
        });

        const expected = new Error("Timeout error");
        
        await expect(
            requests.makeRequest({
                options: params.options,
                timeout: 1
            })
        ).rejects.toEqual(expected);
    });
});