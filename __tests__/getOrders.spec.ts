import dotenv from 'dotenv';
dotenv.config();

import { describe, test, expect, jest } from '@jest/globals';

import createGetOrdersController from "../src/useCases/GetOrders";
import axios from 'axios';
import { DateFormat } from '../src/utils/DateFormat';

describe("Get orders", () => {

    afterEach(() => {
        jest.clearAllMocks();
    })
    
    test("Returns an Array with All orders ID", async () => {

        const actualTimeRequest = DateFormat.dateFormatToQueryParams(new Date('2021-05-05T13:30:00'));
        const lastRequestTime = DateFormat.dateFormatToQueryParams(new Date('2021-05-05T13:00:00'));

        const queryParams = `?f_creationDate=creationDate%3A%5B${lastRequestTime}%20TO%20${actualTimeRequest}%5D&per_page=100`;
        const expected = ["1080883513398-01"];

        await expect(
            createGetOrdersController.handle({
                methodType: 'list',
                timeout: 1000,
                amountPages: 1,
                queryParams
            })
        ).resolves.toEqual(expected)

        expect(axios.get).toHaveBeenCalledTimes(1);
    });

    test("Returns an array of objects with all detailed orders", async () => {
        expect(axios.get).not.toHaveBeenCalled();

        const mockedAxios = axios as jest.Mocked<typeof axios>

        mockedAxios.get.mockResolvedValueOnce({
            data: {
                "orderId": "1080883513398-01",
                "sequence": "2929244",
                "marketplaceOrderId": "",
                "marketplaceServicesEndpoint": "http://oms.vtexinternal.com.br/api/oms?an=oficialfarma",
                "sellerOrderId": "00-1080883513398-01",
                "origin": "Marketplace",
                "affiliateId": "",
                "salesChannel": "1",
                "status": "invoiced",
                "statusDescription": "Faturado",
                "value": 10221,
                "creationDate": "02/12/2020 20:58:29",
                "lastChange": "16/12/2020 11:55:41",
                "orderGroup": "1080883513398",
            }
        });

        const actualTimeRequest = DateFormat.dateFormatToQueryParams(new Date('2021-05-05T13:30:00'));
        const lastRequestTime = DateFormat.dateFormatToQueryParams(new Date('2021-05-05T13:00:00'));

        const queryParams = `?f_creationDate=creationDate%3A%5B${lastRequestTime}%20TO%20${actualTimeRequest}%5D&per_page=100`;
        const expected = {
            "orderId": "1080883513398-01",
            "sequence": "2929244",
            "marketplaceOrderId": "",
            "marketplaceServicesEndpoint": "http://oms.vtexinternal.com.br/api/oms?an=oficialfarma",
            "sellerOrderId": "00-1080883513398-01",
            "origin": "Marketplace",
            "affiliateId": "",
            "salesChannel": "1",
            "status": "invoiced",
            "statusDescription": "Faturado",
            "value": 10221,
            "creationDate": "02/12/2020 20:58:29",
            "lastChange": "16/12/2020 11:55:41",
            "orderGroup": "1080883513398"
        }

        await expect(
            createGetOrdersController.handle({
                methodType: 'get',
                timeout: 1000,
                queryParams,
                orderId: ['1080883513398-01']
            })
        ).resolves.toStrictEqual([expected])

        expect(axios.get).toHaveBeenCalledTimes(1);
    });

    test("Should return a networking error", async () => {
        expect(axios.get).not.toHaveBeenCalled();

        const mockedAxios = axios as jest.Mocked<typeof axios>;
        mockedAxios.get.mockRejectedValueOnce(new Error('Networking Error'));

        const actualTimeRequest = DateFormat.dateFormatToQueryParams(new Date('2021-05-05T13:30:00'));
        const lastRequestTime = DateFormat.dateFormatToQueryParams(new Date('2021-05-05T13:00:00'));

        const queryParams = `?f_creationDate=creationDate%3A%5B${lastRequestTime}%20TO%20${actualTimeRequest}%5D&per_page=100`;
        const expected = new Error('Networking Error');
        await expect(
            createGetOrdersController.handle({
                methodType: 'get',
                timeout: 1000,
                queryParams,
                orderId: ['1080883513398-01']
            })
        ).rejects.toStrictEqual(expected)

        expect(axios.get).toHaveBeenCalledTimes(1);
    });
});