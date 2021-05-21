import { describe, test, expect, jest } from '@jest/globals';
import { v4 as uuidv4 } from 'uuid';
import { OrdersDTO } from '../src/interfaces/OrdersDTO';
import createGetOrdersController from '../src/useCases/GetOrders';
import HandleOrders from '../src/useCases/HandleOrders/implementations/HandleOrders';
import { DateFormat } from '../src/utils/DateFormat';

jest.mock('uuid');

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
        const result = list.map((order: OrdersDTO) => {
            return handleOrders.client(order);
        });

        const expected = [
            {
                client: {
                    client_id: '12345678987654321',
                    name: 'Maria Alves',
                    last_name: 'de Lima',
                    email: 'email@gmail.com',
                    document: '11122233345'
                }
            }
        ];

        const { client } = result[0];

        expect(result).toEqual(expected);
        expect(client).toEqual(expected[0].client);
    });
    
    test('#addressShippingData - should returns address/shipping data', async () => {
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
        const result = list.map((order: OrdersDTO) => {
            return handleOrders.addressShippingData(order);
        });

        const expected = [
            {
                addressShippingData: {
                    addressId: "65157854594",
                    state: "SP",
                    city: "Cândido Rodrigues",
                    receiverName: "José Matias",
                    neighborhood: "Arca da aliança"
                }
            }
        ];

        const { addressShippingData } = result[0];

        expect(result).toEqual(expected);
        expect(addressShippingData).toEqual(expected[0].addressShippingData);
    });

    test('#clientShippingData - should returns client shipping data', async () => {
        const actualTimeRequest = DateFormat.dateFormatToQueryParams(new Date('2021-05-05T13:30:00'));
        const lastRequestTime = DateFormat.dateFormatToQueryParams(new Date('2021-05-05T13:00:00'));

        const queryParams = `?f_creationDate=creationDate%3A%5B${lastRequestTime}%20TO%20${actualTimeRequest}%5D&per_page=100`;

        const [{ list }] = await createGetOrdersController.handle({
            methodType: 'get',
            timeout: 1000,
            queryParams,
            orderId: ['1080883513398-01']
        });

        (uuidv4 as jest.Mock).mockReturnValue('125f-4f5g-78a9-e4as');

        const handleOrders = new HandleOrders();
        const result = list.map((order: OrdersDTO) => {
            return handleOrders.clientShippingData(order);
        });

        const expected = [
            {
                clientShippingData: {
                    clientShippingId: "125f-4f5g-78a9-e4as",
                    client_id: "12345678987654321",
                    address_id: "65157854594"
                }
            }
        ];

        const { clientShippingData } = result[0];
        
        expect(result).toEqual(expected);
        expect(clientShippingData).toEqual(expected[0].clientShippingData);
    });

    test('#dicountsName - should returns discountsName', async () => {
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
        const result = list.map((order: OrdersDTO) => {
            return handleOrders.discountsName(order);
        });

        const expected = [
            {
                discountsName: {
                    discountId: 'a25d1sd-1321-478b-a351-as2d8d1d5',
                    orderId: '1080883513398-01',
                    discountName: 'Boleto Bancário'
                }
            }
        ];
        
        const { discountsName } = result[0];
        
        expect(result).toEqual(expected);
        expect(discountsName).toEqual(expected[0].discountsName);
    });

    test('#items - should return all itens from order', () => {
        
    });

    test('#logisticsInfo - should return logistcs info', () => {
        const expected = {
            'logistics_id VARCHAR(50)': '',
            'slaType VARCHAR(5)': '',
            'courrier VARCHAR(5)': '',
            'estimateDeliveryDate DATETIME': '',
            'deliveryDeadline VARCHAR(4)': '',
            'shippingListPrice DECIMAL': '',
            'shippingValue DECIMAL': '',
            'trackingNumber VARCHAR(20)': '',
            'orderId VARCHAR(20)': '',
            'addressId VARCHAR(20)': '',
        };
    });

    test.todo('#orderItems - should return the order/item')
    test.todo('#orders - should returns the orders informations')
    test.todo('#paymentData - should returns the payment datas')
    test.todo('#saveOrders - should returns the save status')
})