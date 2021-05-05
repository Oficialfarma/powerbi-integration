import { describe, test, expect } from '@jest/globals';
import dotenv from 'dotenv';
dotenv.config();

import { GetOptions } from '../src/utils/GetOptions';

describe('Get options', () => {
    test('Should return an object with query params and headers', () => {
        const options = new GetOptions();
        const actualTimeRequest = new Date('2021-05-05T13:30:00');
        const lastRequestTime = new Date('2021-05-05T13:00:00');

        const expected1 = {
            queryParams: '',
            options: {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-VTEX-API-AppKey": process.env.X_VTEX_API_APPKEY,
                    "X-VTEX-API-AppToken": process.env.X_VTEX_API_APPTOKEN
                }
            },
            timeout: 10000
        }
        const expected2 = {
            queryParams: `?f_creationDate=creationDate%3A%5B2021-05-05T16%3A00%3A00.000Z%20TO%202021-05-05T16%3A30%3A00.000Z%5D&per_page=100`,
            options: {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-VTEX-API-AppKey": process.env.X_VTEX_API_APPKEY,
                    "X-VTEX-API-AppToken": process.env.X_VTEX_API_APPTOKEN
                }
            },
            timeout: 10000
        }

        const resultWithoutQueryParamas = options.urlOptions({
            method: 'getOrders',
            actualTimeRequest,
            lastRequestTime
        });

        const resultWithQueryParams = options.urlOptions({
            method: 'listOrders',
            actualTimeRequest,
            lastRequestTime
        });

        expect(resultWithoutQueryParamas).toStrictEqual(expected1);
        expect(resultWithQueryParams).toStrictEqual(expected2);
    });
});