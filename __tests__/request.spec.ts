import { Requests } from '../src/Requests';
const requests = new Requests();

import { allOrdersMockResponse } from '../__mocks__/requestAllOrders.mock';
import { mockedQueryParams } from '../__mocks__/requestParams.mock';

jest.mock('../src/Requests');

describe("VTEX Error connection", () => {
    
    it(`Throw a timeout error`, async () => {

        requests.makeRequest = jest.fn().mockRejectedValue(new Error('Timeout at [url]'));
        
        const result = await requests.makeRequest({...mockedQueryParams}).catch(err => {
            return err;
        });

        expect(result).toEqual(new Error('Timeout at [url]'));
    });
});

describe("VTEX get orders", () => {
    it('Return all / detailed orders', async () => {
        requests.makeRequest = jest.fn().mockResolvedValue(allOrdersMockResponse);

        const response = await requests.makeRequest({...mockedQueryParams}).then(resp => {
            return resp;
        });

        expect(response).toStrictEqual(allOrdersMockResponse);
    });
});