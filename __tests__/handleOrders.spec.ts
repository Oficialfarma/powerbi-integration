import { describe, test, expect } from '@jest/globals';
import createGetOrdersController from '../src/useCases/GetOrders';
import HandleOrders from '../src/useCases/HandleOrders/implementations/HandleOrders';
import { DateFormat } from '../src/utils/DateFormat';

describe('Handle Orders', () => {
    test('#Client - should returns a client informations', async () => {
        const actualTimeRequest = DateFormat.dateFormatToQueryParams(new Date('2021-05-05T13:30:00'));
        const lastRequestTime = DateFormat.dateFormatToQueryParams(new Date('2021-05-05T13:00:00'));

        const queryParams = `?f_creationDate=creationDate%3A%5B${lastRequestTime}%20TO%20${actualTimeRequest}%5D&per_page=100`;

        const [{ list }] = await createGetOrdersController.handle({
            methodType: 'get',
            timeout: 1000,
            queryParams,
            orderId: ['1080883513398-01']
        });

        const handleOrders = new HandleOrders();
        const result = handleOrders.client(list);

        expect(handleOrders).toEqual('teste');
    });
    
    test.todo('#addressShippingData - should returns address/shipping data')
    test.todo('#clientShippingData - should returns client shipping data')
    test.todo('#dicountsName - should returns discountsName')
    test.todo('#items - should return all itens from order')
    test.todo('#logisticsInfo - should return logistcs info')
    test.todo('#orderItems - should return the order/item')
    test.todo('#orders - should returns the orders informations')
    test.todo('#paymentData - should returns the payment datas')
    test.todo('#saveOrders - should returns the save status')
})