import dotenv from 'dotenv';
dotenv.config();

import { describe, test, expect, jest } from '@jest/globals';
import { v4 as uuidv4 } from 'uuid';
import { OrdersDTO } from '../src/interfaces/OrdersDTO';
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
                Client: {
                    client_id: 'ada159s-ed23-425s2d-80bf-78dcd344aa64',
                    name: 'Maria Alves',
                    last_name: 'de Lima',
                    email: 'email@gmail.com',
                    document: '11122233345'
                }
            }
        ];

        expect(result).toEqual(expected);
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
                ShippingData: {
                    addressId: "65157854594",
                    state: "SP",
                    city: "Cândido Rodrigues",
                    receiverName: "José Matias",
                    neighborhood: "Arca da aliança"
                }
            }
        ];

        expect(result).toEqual(expected);
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
                Client_ShippingData: {
                    clientShippingId: "125f-4f5g-78a9-e4as",
                    client_id: "12345678987654321",
                    address_id: "65157854594"
                }
            }
        ];
        
        expect(result).toEqual(expected);
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
                DiscountsName: {
                    discountId: 'a25d1sd-1321-478b-a351-as2d8d1d5',
                    orderId: '1080883513398-01',
                    discountName: 'Boleto Bancário'
                }
            },
            {
                DiscountsName: {
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

        const expected2 = [
            {
                DiscountsName: {
                    discountId: 'a25d1sd-1321-478b-a351-as2d8d1d5',
                    orderId: '1080883513398-01',
                    discountName: 'Boleto Bancário'
                }
            }
        ]
        
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
                Items: {
                    skuId: '5304',
                    skuName: 'Ioimbina'
                }
            },
            {
                Items: {
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
                LogisticsInfo: {
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
        const [ result ] = list.map((order: OrdersDTO) => {
            return handleOrders.orderItems(order);
        });

        const expected = [
            {
                Order_Items: {
                    orderItemsId: '1080883513398-01-5304',
                    quantitySold: '1',
                    skuSellingPrice: 58.66,
                    skuTotalPrice: 58.66,
                    skuValue: 78.00,
                    orderId: '1080883513398-01',
                    skuId: '5304',
                    shippingValue: 7.57,
                    shippingListPrice: 7.57,
                }
            },
            {
                Order_Items: {
                    orderItemsId: '1080883513398-01-1008',
                    quantitySold: '1',
                    skuSellingPrice: 28.40,
                    skuTotalPrice: 28.40,
                    skuValue: 53.90,
                    orderId: '1080883513398-01',
                    skuId: '1008',
                    shippingValue: 7.58,
                    shippingListPrice: 7.58
                }
            }
        ];

        expect(result).toEqual(expected);
    });

    test('#orders - should returns the orders informations', async () => {
        const { data } = await axios.get('http://fakeuri.com/getOrder/1080883513398-01');
        const list = data.list;

        (uuidv4 as jest.Mock).mockReturnValue('a12sd-1235s-apel1');

        const handleOrders = new HandleOrders();
        const result = list.map((order: OrdersDTO) => {
            return handleOrders.orders(order);
        });

        const expected: any = [
            {
                Orders: {
                    orderId: '1080883513398-01',
                    origin: 'Marketplace',
                    sequence: '2929244',
                    creation_date: '2020-12-02T23:58:29.8363023+00:00',
                    statusDescription: 'Faturado',
                    lastChangeDate: '2020-12-16T14:55:41.9145604+00:00',
                    utmSource: 'Google',
                    utmMedium: null,
                    utmCampaign: null,
                    coupon: null,
                    totalValue: 102.21,
                    discountsTotals: -4.59,
                    host: 'oficialfarma',
                    sellerName: 'oficialfarma',
                    callCenterEmail: 'televendas@oficialfarma.com.br',
                    callCenterCode: '[SAC] Televendas',
                    client_id: 'ada159s-ed23-425s2d-80bf-78dcd344aa64',
                }
            }
        ];

        list[0].callCenterOperatorData = null;

        const resultWithoutCallCenterData = list.map((order: OrdersDTO) => {
            return handleOrders.orders(order);
        });

        const expectedWithoutCallCenterData: any = [
            {
                Orders: {
                    orderId: '1080883513398-01',
                    origin: 'Marketplace',
                    sequence: '2929244',
                    creation_date: '2020-12-02T23:58:29.8363023+00:00',
                    statusDescription: 'Faturado',
                    lastChangeDate: '2020-12-16T14:55:41.9145604+00:00',
                    utmSource: 'Google',
                    utmMedium: null,
                    utmCampaign: null,
                    coupon: null,
                    totalValue: 102.21,
                    discountsTotals: -4.59,
                    host: 'oficialfarma',
                    sellerName: 'oficialfarma',
                    callCenterEmail: null,
                    callCenterCode: null,
                    client_id: 'ada159s-ed23-425s2d-80bf-78dcd344aa64',
                }
            }
        ]

        expect(result).toEqual(expected);
        expect(resultWithoutCallCenterData).toEqual(expectedWithoutCallCenterData);
    });

    test('#paymentData - should returns the payment datas', async () => {
        const { data } = await axios.get('http://fakeuri.com/getOrder/1080883513398-01');

        data.list[0].paymentData.transactions[0].payments.push({
            "id": "1698106DE7B840718D0A1DE98C9586D2",
            "paymentSystem": "4",
            "paymentSystemName": "Mastercard",
            "value": 20055,
            "installments": 1,
            "referenceValue": 20055,
            "cardHolder": null,
            "cardNumber": null,
            "firstDigits": "56321",
            "lastDigits": "4897",
            "cvv2": null,
            "expireMonth": null,
            "expireYear": null,
            "url": null,
            "giftCardId": null,
            "giftCardName": null,
            "giftCardCaption": null,
            "redemptionCode": null,
            "group": "creditCard",
            "tid": "001d3861-802e-41e2-a63b-3dc0ae5e7679",
            "dueDate": null,
            "connectorResponses": {
                "braspagTransactionId": "001d3861-802e-12sd-ads45-3dc0ae5e7679",
                "tid": "001d3861-802e-41e2-a63b-3dcs21cc",
                "AcquirerTransactionId": "1235456884455",
                "authId": "11052101111522525223",
                "nsu": "365486714455464",
                "proofOfSale": "3558498411",
                "returnCode": "00",
                "returnMessage": "Success.",
                "authorizationCode": "338922",
                "NsuSettle": "128488255"
            },
            "giftCardProvider": null,
            "giftCardAsDiscount": null,
            "koinUrl": null,
            "accountId": "71S5D1FG8GH51H45FBD5S1",
            "parentAccountId": null,
            "bankIssuedInvoiceIdentificationNumber": null,
            "bankIssuedInvoiceIdentificationNumberFormatted": null,
            "bankIssuedInvoiceBarCodeNumber": null,
            "bankIssuedInvoiceBarCodeType": null,
            "billingAddress": {
                "postalCode": "69060-444",
                "city": "Manaus",
                "state": "AM",
                "country": "BRA",
                "street": "Rua josenildo",
                "number": "125",
                "neighborhood": "Madureira",
                "complement": "",
                "reference": null,
                "geoCoordinates": [
                    -59.99417114245648,
                    -3.083528518424868
                ]
            }
        });

        const list = data.list;

        const handleOrders = new HandleOrders();
        const [ result ] = list.map((order: OrdersDTO) => {
            return handleOrders.paymentData(order);
        });

        const expected = [
            {
                PaymentData: {
                    transaction_id: 'D62B7C81BED342EF8E1426BFDCBA331A',
                    orderId: '1080883513398-01',
                    paymentSystemName: 'Boleto Bancário',
                    installments: 1,
                    paymentValue: 102.21
                }
            },
            {
                PaymentData: {
                    transaction_id: '1698106DE7B840718D0A1DE98C9586D2',
                    orderId: '1080883513398-01',
                    paymentSystemName: 'Mastercard',
                    installments: 1,
                    paymentValue: 200.55
                }
            }
        ];

        expect(result).toEqual(expected);
    });

    test('#saveOrders - should returns the save status', async () => {
        const { data } = await axios.get('http://fakeuri.com/getOrder/1080883513398-01');
        const list = data.list;
        
        const handleOrders = new HandleOrders();

        let handledOrders: object[] = [];

        list.forEach((order: OrdersDTO) => {
            const Client = handleOrders.client(order);
            const Client_ShippingData = handleOrders.clientShippingData(order);
            const DiscountsName = handleOrders.discountsName(order);
            const Items = handleOrders.items(order);
            const LogisticsInfo = handleOrders.logisticsInfo(order);
            const Order_Items = handleOrders.orderItems(order);
            const Orders = handleOrders.orders(order);
            const PaymentData = handleOrders.paymentData(order);
            const ShippingData = handleOrders.addressShippingData(order);

            handledOrders = handledOrders.concat([
                Client,
                Client_ShippingData,
                DiscountsName,
                ...Items,
                LogisticsInfo,
                ...Order_Items,
                Orders,
                ...PaymentData,
                ShippingData
            ]);
        });
        
        const hasBeenSuccessfullySaved = handleOrders.saveOrders(handledOrders);

        const hasError = handleOrders.saveOrders([])

        expect(hasBeenSuccessfullySaved).toBeTruthy();
        expect(hasError).toBeFalsy();
    });
})