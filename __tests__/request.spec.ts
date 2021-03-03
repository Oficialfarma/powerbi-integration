import { Requests } from '../src/Requests';
const requests = new Requests();

jest.mock('../src/Requests');

describe("Test the VTEX API request to obtain ordersId and detailed orders", () => {
    
    it(`Should throw an error when the function has spent more than ${1000}ms`, async () => {

        requests.makeRequest = jest.fn().mockRejectedValue(new Error('Timeout at [url]'));
        
        const result = await requests.makeRequest({
            url: 'string',
            options: {
                headers: {
                    "Content-Type": 'teste',
                    "X-VTEX-API-AppKey": 'key',
                    "X-VTEX-API-AppToken": 'token',
                    Accept: 'accept',
                },
                method: 'get'
            },
            timeout: 1000
        }).catch(err => {
            return err;
        });

        expect(result).toEqual(new Error('Timeout at [url]'));
    });
});