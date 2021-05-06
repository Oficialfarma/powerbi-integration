import dotenv from 'dotenv';
dotenv.config();

import { describe, test, expect, jest } from '@jest/globals';
import { DateFormat } from '../src/utils/DateFormat';
import { GetAmountPages } from '../src/utils/GetAmountPages';
import axios from 'axios';

jest.mock('axios');

describe('Get amount pages', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Should return the number of pages", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                orderID: "52034561",
                other_informations: "information",
                paging: {
                    pages: 5,
                    actualPage: 2,
                    perPage: 100
                }
            }
        });

        const actualTimeRequest = DateFormat.dateFormatToQueryParams(new Date('2021-05-05T13:30:00'));
        const lastRequestTime = DateFormat.dateFormatToQueryParams(new Date('2021-05-05T13:00:00'));

        const queryParams = `?f_creationDate=creationDate%3A%5B${lastRequestTime}%20TO%20${actualTimeRequest}%5D&per_page=100`;

        await expect(
            GetAmountPages.getPages({
                timeout: 1000,
                queryParams
            })
        ).resolves.toEqual(5);
        expect(axios.get).toHaveBeenCalledTimes(1);
    });

    test('Should return a connection error', async () => {
        expect(axios.get).not.toHaveBeenCalled();
        const mockedAxios = axios as jest.Mocked<typeof axios>;

        mockedAxios.get.mockRejectedValueOnce(new Error("Networking error"));

        const actualTimeRequest = DateFormat.dateFormatToQueryParams(new Date('2021-05-05T13:30:00'));
        const lastRequestTime = DateFormat.dateFormatToQueryParams(new Date('2021-05-05T13:00:00'));

        const queryParams = `?f_creationDate=creationDate%3A%5B${lastRequestTime}%20TO%20${actualTimeRequest}%5D&per_page=100`;

        const expected = new Error("Networking error");

        await expect(
            GetAmountPages.getPages({
                timeout: 1000,
                queryParams
            })
        ).rejects.toEqual(expected);
        expect(axios.get).toHaveBeenCalledTimes(1);
    });
});