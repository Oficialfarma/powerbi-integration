import { describe, test, expect, jest } from '@jest/globals';
import { v4 as uuidv4 } from 'uuid';
import { OrdersDTO } from '../src/interfaces/OrdersDTO';
import createGetOrdersController from '../src/useCases/GetOrders';
import HandleOrders from '../src/useCases/HandleOrders/implementations/HandleOrders';
import axios from 'axios';

jest.mock('uuid');

describe('Handle Orders', () => {
    
    test('#Client - should returns a client informations', async () => {

        const { data } = await axios.get('http://fakeuri.com');
        const order = data.list;

        const handleOrders = new HandleOrders();
        const result = order.map((order: OrdersDTO) => {
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

        const { data } = await axios.get('http://fakeuri.com');
        const order = data.list;
        
        const handleOrders = new HandleOrders();
        const result = order.map((order: OrdersDTO) => {
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

        const { data } = await axios.get('http://fakeuri.com');
        const list = data.list;

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

        const { data } = await axios.get('http://fakeuri.com/getOrder/1080883513398-01');
        const list = data.list;

        list[0].ratesAndBenefitsData.rateAndBenefitsIdentifiers.push({
            "description": null,
            "featured": false,
            "id": "a25d1sd-1321-478b-a351-as2d8d1d5",
            "name": "Coupon",
            "matchedParameters": {
                "paymentMethodId": "3"
            },
            "additionalInfo": null
        })

        const handleOrders = new HandleOrders();
        const [ result ] = list.map((order: OrdersDTO) => {
            return handleOrders.discountsName(order);
        });

        const expected = [
            {
                discountsName: {
                    discountId: 'a25d1sd-1321-478b-a351-as2d8d1d5',
                    orderId: '1080883513398-01',
                    discountName: 'Boleto Bancário'
                }
            },
            {
                discountsName: {
                    discountId: 'a25d1sd-1321-478b-a351-as2d8d1d5',
                    orderId: '1080883513398-01',
                    discountName: 'Coupon'
                }
            }
        ];
        
        expect(result).toEqual(expected);

        const datas = await axios.get('http://fakeuri.com/getOrder/1080883513398-01').then(res => {
            const { data } = res;

            return data;
        });
        const order = datas.list;

        const [ result2 ] = order.map((order: OrdersDTO) => {
            return handleOrders.discountsName(order);
        });

        const expected2 =
        {
            discountsName: {
                discountId: 'a25d1sd-1321-478b-a351-as2d8d1d5',
                orderId: '1080883513398-01',
                discountName: 'Boleto Bancário'
            }
        }
        
        expect(result2).toEqual(expected2);
    });

    test('#items - should return all itens from order', async () => {
        const { data } = await axios.get('http://fakeuri.com/getOrder/1080883513398-01');
        const list = data.list;

        const handleOrders = new HandleOrders();
        const [ result ] = list.map((order: OrdersDTO) => {
            return handleOrders.items(order);
        });
        
        const expected = [
            {
                itens: {
                    skuId: '5304',
                    skuName: 'Ioimbina'
                }
            },
            {
                itens: {
                    skuId: '1008',
                    skuName: 'Maca Peruana'
                }
            }
        ];
        
        expect(result).toEqual(expected);
    });

    test('#logisticsInfo - should return logistcs info', async () => {

        const { data } = await axios.get('http://fakeuri.com/getOrder/1080883513398-01');
        const list = data.list;

        (uuidv4 as jest.Mock).mockReturnValue('a12sd-1235s-apel1');

        const handleOrders = new HandleOrders();
        const result = list.map((order: OrdersDTO) => {
            return handleOrders.logisticsInfo(order);
        });

        const expected = [
            {
                logisticsInfo: {
                    logistics_id: 'a12sd-1235s-apel1',
                    slaType: 'PAC',
                    courrier: 'PAC',
                    estimateDeliveryDate: '2020-12-21T11:58:56.1102865+00:00',
                    deliveryDeadline: '12bd',
                    trackingNumber: 'AA1554869884FD',
                    orderId: '1080883513398-01',
                    addressId: '4820858183688'
                }
            }
        ];

        expect(result).toEqual(expected);
    });

    test('#orderItems - should return the order/item', async () => {
        const { data } = await axios.get('http://fakeuri.com/getOrder/1080883513398-01');
        const list = data.list;

        (uuidv4 as jest.Mock).mockReturnValue('a12sd-1235s-apel1');

        const handleOrders = new HandleOrders();
        const result = list.map((order: OrdersDTO) => {
            return handleOrders.orderItems(order);
        });

        const expected = [
            {
                orderItems: {
                    orderItemsId: '',
                    quantitySold: '',
                    skuSellingPrice: '',
                    skuTotalPrice: '',
                    skuValue: '',
                    orderId: '',
                    skuId: '',
                    shippingValue: '',
                    shippingListPrice: '',
                }
            }
        ];

        expect(result).toEqual(expected);
    });

    test.todo('#orders - should returns the orders informations')
    test.todo('#paymentData - should returns the payment datas')
    test.todo('#saveOrders - should returns the save status')
})