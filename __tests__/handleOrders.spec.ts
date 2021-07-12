import dotenv from 'dotenv';
dotenv.config();

import * as sql from 'mssql';
import { describe, test, expect } from '@jest/globals';
import { v4 as uuidv4 } from 'uuid';
import { OrdersDTO } from '../src/interfaces/OrdersDTO';
import HandleOrders from '../src/useCases/HandleOrders/implementations/HandleOrders';
import { Database } from '../src/repositories/Database';

jest.mock('uuid');
jest.unmock('axios');

describe('Handle Orders', () => {

    const  mockedResponse: OrdersDTO[] = [
        {
            "orderId": "1080883513398-01",
            "sequence": "2929244",
            "marketplaceOrderId": "",
            "marketplaceServicesEndpoint": "http://oms.url.com.br/api/oms?an=accountName",
            "sellerOrderId": "00-1080883513398-01",
            "origin": "Marketplace",
            "affiliateId": "",
            "salesChannel": "1",
            "merchantName": null,
            "status": "invoiced",
            "statusDescription": "Faturado",
            "value": 10221,
            "creationDate": "2020-12-02T23:58:29.8363023+00:00",
            "lastChange": "2020-12-16T14:55:41.9145604+00:00",
            "orderGroup": "1080883513398",
            "totals": [
                {
                    "id": "Items",
                    "name": "Total dos Itens",
                    "value": 9165
                },
                {
                    "id": "Discounts",
                    "name": "Total dos Descontos",
                    "value": -459
                },
                {
                    "id": "Shipping",
                    "name": "Total do Frete",
                    "value": 1515
                },
                {
                    "id": "Tax",
                    "name": "Total da Taxa",
                    "value": 0
                }
            ],
            "items": [
                {
                    "uniqueId": "16E99E4890674D3883773A901FBEDA0A",
                    "id": "5304",
                    "productId": "5304",
                    "ean": "5304",
                    "lockId": "00-1080883513398-01",
                    "itemAttachment": {
                        "content": {},
                        "name": null
                    },
                    "attachments": [],
                    "quantity": 1,
                    "seller": "1",
                    "name": "Ioimbina",
                    "refId": null,
                    "price": 6175,
                    "listPrice": 7800,
                    "manualPrice": null,
                    "priceTags": [
                        {
                            "name": "DISCOUNT@MARKETPLACE",
                            "value": -309,
                            "isPercentual": false,
                            "identifier": "identifier",
                            "rawValue": -3.09,
                            "rate": null,
                            "jurisCode": null,
                            "jurisType": null,
                            "jurisName": null
                        }
                    ],
                    "imageUrl": "https://url/arquivos/ids/163371-55-55/imageName.jpg?v=637163562198470000",
                    "detailUrl": "/product/p",
                    "components": [],
                    "bundleItems": [],
                    "params": [],
                    "offerings": [],
                    "sellerSku": "5304",
                    "priceValidUntil": null,
                    "commission": 0,
                    "tax": 0,
                    "preSaleDate": null,
                    "additionalInfo": {
                        "brandName": "OficialFarma",
                        "brandId": "1",
                        "categoriesIds": "/17/",
                        "categories": [
                            {
                                "id": 17,
                                "name": "Saúde"
                            },
                            {
                                "id": 22,
                                "name": "Depressão"
                            },
                            {
                                "id": 26,
                                "name": "Estresse / Ansiedade"
                            }
                        ],
                        "productClusterId": "157,161,164,165,201,234,239,248,258,260,281",
                        "commercialConditionId": "1",
                        "dimension": {
                            "cubicweight": 0.2,
                            "height": 30,
                            "length": 30,
                            "weight": 200,
                            "width": 15
                        },
                        "offeringInfo": null,
                        "offeringType": null,
                        "offeringTypeId": null
                    },
                    "measurementUnit": "un",
                    "unitMultiplier": 1,
                    "sellingPrice": 5866,
                    "isGift": false,
                    "shippingPrice": null,
                    "rewardValue": 149,
                    "freightCommission": 0,
                    "priceDefinitions": null,
                    "taxCode": null,
                    "parentItemIndex": null,
                    "parentAssemblyBinding": null,
                    "callCenterOperator": null,
                    "serialNumbers": null,
                    "assemblies": [],
                    "costPrice": 7800
                },
                {
                    "uniqueId": "ED064B849F15438EACDF87C136A60CCB",
                    "id": "1008",
                    "productId": "1008",
                    "ean": "7898070130061",
                    "lockId": "00-1080883513398-01",
                    "itemAttachment": {
                        "content": {},
                        "name": null
                    },
                    "attachments": [],
                    "quantity": 1,
                    "seller": "1",
                    "name": "Maca Peruana",
                    "refId": null,
                    "price": 2990,
                    "listPrice": 5390,
                    "manualPrice": null,
                    "priceTags": [
                        {
                            "name": "DISCOUNT@MARKETPLACE",
                            "value": -150,
                            "isPercentual": false,
                            "identifier": "ca50fab9-1321-478b-a351-ad644c10e3df",
                            "rawValue": -1.5,
                            "rate": null,
                            "jurisCode": null,
                            "jurisType": null,
                            "jurisName": null
                        }
                    ],
                    "imageUrl": "https://ur/arquivos/ids/162897-55-55/1008.jpg?v=637090838307430000",
                    "detailUrl": "/url/p",
                    "components": [],
                    "bundleItems": [],
                    "params": [],
                    "offerings": [],
                    "sellerSku": "1008",
                    "priceValidUntil": null,
                    "commission": 0,
                    "tax": 0,
                    "preSaleDate": null,
                    "additionalInfo": {
                        "brandName": "OficialFarma",
                        "brandId": "1",
                        "categoriesIds": "/10/",
                        "categories": [
                            {
                                "id": 10,
                                "name": "Desempenho Físico"
                            },
                            {
                                "id": 42,
                                "name": "Saúde Sexual"
                            }
                        ],
                        "productClusterId": "140,141,156,157,161,165,167,170,171,178,183,199,217,219,223,239,248,255,260,261,264,274,281,290",
                        "commercialConditionId": "1",
                        "dimension": {
                            "cubicweight": 0.2,
                            "height": 30,
                            "length": 30,
                            "weight": 200,
                            "width": 15
                        },
                        "offeringInfo": null,
                        "offeringType": null,
                        "offeringTypeId": null
                    },
                    "measurementUnit": "un",
                    "unitMultiplier": 1,
                    "sellingPrice": 2840,
                    "isGift": false,
                    "shippingPrice": null,
                    "rewardValue": 60,
                    "freightCommission": 0,
                    "priceDefinitions": null,
                    "taxCode": null,
                    "parentItemIndex": null,
                    "parentAssemblyBinding": null,
                    "callCenterOperator": null,
                    "serialNumbers": null,
                    "assemblies": [],
                    "costPrice": 5390
                }
            ],
            "marketplaceItems": [],
            "clientProfileData": {
                "id": "12345678987654321",
                "email": "email@gmail.com-15412.ct.vtex.com.br",
                "firstName": "Maria Alves",
                "lastName": "de Lima",
                "documentType": "cpf",
                "document": "11122233345",
                "phone": "phone",
                "corporateName": null,
                "tradeName": null,
                "corporateDocument": null,
                "stateInscription": "",
                "corporatePhone": null,
                "isCorporate": false,
                "userProfileId": "ada159s-ed23-425s2d-80bf-78dcd344aa64",
                "customerClass": null
            },
            "giftRegistryData": null,
            "marketingData": {
                "id": "marketingData",
                "utmSource": "Google",
                "utmPartner": null,
                "utmMedium": null,
                "utmCampaign": null,
                "coupon": null,
                "utmiCampaign": "",
                "utmipage": "",
                "utmiPart": "",
                "marketingTags": []
            },
            "ratesAndBenefitsData": {
                "id": "ratesAndBenefitsData",
                "rateAndBenefitsIdentifiers": [
                    {
                        "description": null,
                        "featured": false,
                        "id": "a25d1sd-1321-478b-a351-as2d8d1d5",
                        "name": "Boleto Bancário",
                        "matchedParameters": {
                            "paymentMethodId": "6"
                        },
                        "additionalInfo": null
                    }
                ]
            },
            "shippingData": {
                "id": "shippingData",
                "address": {
                    "addressType": "residential",
                    "receiverName": "José Matias",
                    "addressId": "65157854594",
                    "postalCode": "15930-000",
                    "city": "Cândido Rodrigues",
                    "state": "SP",
                    "country": "BRA",
                    "street": "Carolina Delamona rua",
                    "number": "15648",
                    "neighborhood": "Arca da aliança",
                    "complement": null,
                    "reference": null,
                    "geoCoordinates": [
                        -48.62886428833008,
                        -21.35030746459961
                    ]
                },
                "logisticsInfo": [
                    {
                        "itemIndex": 0,
                        "selectedSla": "PAC",
                        "lockTTL": "12d",
                        "price": 757,
                        "listPrice": 757,
                        "sellingPrice": 757,
                        "deliveryWindow": null,
                        "deliveryCompany": "PAC",
                        "shippingEstimate": "12bd",
                        "shippingEstimateDate": "2020-12-21T11:58:56.1102865+00:00",
                        "slas": [
                            {
                                "id": "PAC",
                                "name": "PAC",
                                "shippingEstimate": "12bd",
                                "deliveryWindow": null,
                                "price": 757,
                                "deliveryChannel": "delivery",
                                "pickupStoreInfo": {
                                    "additionalInfo": null,
                                    "address": null,
                                    "dockId": null,
                                    "friendlyName": null,
                                    "isPickupStore": false
                                },
                                "polygonName": null,
                                "lockTTL": "12d",
                                "pickupPointId": null,
                                "transitTime": "8bd"
                            },
                            {
                                "id": "Sedex",
                                "name": "Sedex",
                                "shippingEstimate": "10bd",
                                "deliveryWindow": null,
                                "price": 829,
                                "deliveryChannel": "delivery",
                                "pickupStoreInfo": {
                                    "additionalInfo": null,
                                    "address": null,
                                    "dockId": null,
                                    "friendlyName": null,
                                    "isPickupStore": false
                                },
                                "polygonName": null,
                                "lockTTL": "12d",
                                "pickupPointId": null,
                                "transitTime": "6bd"
                            }
                        ],
                        "shipsTo": [
                            "BRA"
                        ],
                        "deliveryIds": [
                            {
                                "courierId": "1fa34bb",
                                "courierName": "PAC",
                                "dockId": "1",
                                "quantity": 1,
                                "warehouseId": "1_1",
                                "accountCarrierName": "oficialfarma"
                            }
                        ],
                        "deliveryChannel": "delivery",
                        "pickupStoreInfo": {
                            "additionalInfo": null,
                            "address": null,
                            "dockId": null,
                            "friendlyName": null,
                            "isPickupStore": false
                        },
                        "addressId": "4820858183688",
                        "polygonName": null,
                        "pickupPointId": null,
                        "transitTime": "8bd"
                    },
                    {
                        "itemIndex": 1,
                        "selectedSla": "PAC",
                        "lockTTL": "12d",
                        "price": 758,
                        "listPrice": 758,
                        "sellingPrice": 758,
                        "deliveryWindow": null,
                        "deliveryCompany": "PAC",
                        "shippingEstimate": "12bd",
                        "shippingEstimateDate": "2020-12-21T11:58:56.1102865+00:00",
                        "slas": [
                            {
                                "id": "PAC",
                                "name": "PAC",
                                "shippingEstimate": "12bd",
                                "deliveryWindow": null,
                                "price": 758,
                                "deliveryChannel": "delivery",
                                "pickupStoreInfo": {
                                    "additionalInfo": null,
                                    "address": null,
                                    "dockId": null,
                                    "friendlyName": null,
                                    "isPickupStore": false
                                },
                                "polygonName": null,
                                "lockTTL": "12d",
                                "pickupPointId": null,
                                "transitTime": "8bd"
                            },
                            {
                                "id": "Sedex",
                                "name": "Sedex",
                                "shippingEstimate": "10bd",
                                "deliveryWindow": null,
                                "price": 828,
                                "deliveryChannel": "delivery",
                                "pickupStoreInfo": {
                                    "additionalInfo": null,
                                    "address": null,
                                    "dockId": null,
                                    "friendlyName": null,
                                    "isPickupStore": false
                                },
                                "polygonName": null,
                                "lockTTL": "12d",
                                "pickupPointId": null,
                                "transitTime": "6bd"
                            }
                        ],
                        "shipsTo": [
                            "BRA"
                        ],
                        "deliveryIds": [
                            {
                                "courierId": "1fa34bb",
                                "courierName": "PAC",
                                "dockId": "1",
                                "quantity": 1,
                                "warehouseId": "1_1",
                                "accountCarrierName": "oficialfarma"
                            }
                        ],
                        "deliveryChannel": "delivery",
                        "pickupStoreInfo": {
                            "additionalInfo": null,
                            "address": null,
                            "dockId": null,
                            "friendlyName": null,
                            "isPickupStore": false
                        },
                        "addressId": "4820858183688",
                        "polygonName": null,
                        "pickupPointId": null,
                        "transitTime": "8bd"
                    }
                ],
                "trackingHints": null,
                "selectedAddresses": [
                    {
                        "addressId": "4820858183688",
                        "addressType": "residential",
                        "receiverName": "receiver name",
                        "street": "Carolina Delamonfddf rua",
                        "number": "1376",
                        "complement": null,
                        "neighborhood": "Arca da aliança ",
                        "postalCode": "15930-000",
                        "city": "Cândido Rodrigues",
                        "state": "SP",
                        "country": "BRA",
                        "reference": null,
                        "geoCoordinates": [
                            -48.62886428833008,
                            -21.35030746459961
                        ]
                    }
                ]
            },
            "paymentData": {
                "giftCards": [],
                "transactions": [
                    {
                        "isActive": true,
                        "transactionId": "089F19BE62B941A788D9FCC3DA9E47EF",
                        "merchantName": "OFICIALFARMA",
                        "payments": [
                            {
                                "id": "D62B7C81BED342EF8E1426BFDCBA331A",
                                "paymentSystem": "6",
                                "paymentSystemName": "Boleto Bancário",
                                "value": 10221,
                                "installments": 1,
                                "referenceValue": 10221,
                                "cardHolder": null,
                                "cardNumber": null,
                                "firstDigits": null,
                                "lastDigits": null,
                                "cvv2": null,
                                "expireMonth": null,
                                "expireYear": null,
                                "giftCardId": null,
                                "giftCardName": null,
                                "giftCardCaption": null,
                                "redemptionCode": null,
                                "group": "bankInvoice",
                                "dueDate": "2020-12-05",
                                "connectorResponses": {},
                                "giftCardProvider": null,
                                "giftCardAsDiscount": null,
                                "koinUrl": null,
                                "accountId": null,
                                "parentAccountId": null,
                            }
                        ]
                    }
                ]
            },
            "packageAttachment": {
                "packages": [
                    {
                        "items": [
                            {
                                "itemIndex": 0,
                                "quantity": 1,
                                "price": 5866,
                                "description": null,
                                "unitMultiplier": 0
                            },
                            {
                                "itemIndex": 1,
                                "quantity": 1,
                                "price": 2840,
                                "description": null,
                                "unitMultiplier": 0
                            }
                        ],
                        "courier": "1",
                        "invoiceNumber": "1894627",
                        "invoiceValue": 10221,
                        "invoiceUrl": null,
                        "issuanceDate": "2020-12-16T14:53:16.5830000+00:00",
                        "trackingNumber": "AA1554869884FD",
                        "invoiceKey": null,
                        "trackingUrl": "",
                        "embeddedInvoice": "",
                        "type": "Output",
                        "courierStatus": null,
                        "cfop": null,
                        "restitutions": {},
                        "volumes": null
                    }
                ]
            },
            "sellers": [
                {
                    "id": "1",
                    "name": "oficialfarma",
                    "logo": "",
                    "fulfillmentEndpoint": "http://fulfillment.asdsds.com.br/api/fulfillment?sc=1&an=accountName"
                }
            ],
            "callCenterOperatorData": {
                "id": "CallCenterOperatorAttachment",
                "email": "televendas@oficialfarma.com.br",
                "userName": "[SAC] Televendas"
            },
            "followUpEmail": "bc9c527de09f48eda88fc47a3a72c07e@ct.vtex.com.br",
            "lastMessage": null,
            "hostname": "oficialfarma",
            "invoiceData": {
                "address": null
            },
            "allowCancellation": false,
            "allowEdition": false,
            "isCheckedIn": false,
            "marketplace": {
                "baseURL": "http://oms.vtexinternal.com.br/api/oms?an=oficialfarma",
                "isCertified": null,
                "name": "oficialfarma"
            },
            "authorizedDate": "2020-12-03T11:58:50.0000000+00:00",
            "invoicedDate": "2020-12-16T14:54:00.5436574+00:00",
            "cancelReason": null,
            "itemMetadata": {
                "Items": [
                    {
                        "Id": "5304",
                        "Seller": "1",
                        "Name": "Ocitocina (Oxitocina) 60 Cápsulas",
                        "SkuName": "Ocitocina (Oxitocina) 60 Cápsulas",
                        "ProductId": "5304",
                        "RefId": null,
                        "Ean": "5304",
                        "ImageUrl": "http://oficialfarma.vteximg.com.br/arquivos/ids/163371-55-55/5304-Ocitocina--Oxitocina--60-Capsulas.jpg?v=637163562198470000",
                        "DetailUrl": "/ocitocina--oxitocina--60-capsulas/p",
                        "AssemblyOptions": []
                    },
                    {
                        "Id": "1008",
                        "Seller": "1",
                        "Name": "Maca Peruana 500Mg 60 Cápsulas",
                        "SkuName": "Maca Peruana 500Mg 60 Cápsulas",
                        "ProductId": "1008",
                        "RefId": null,
                        "Ean": "7898070130061",
                        "ImageUrl": "http://oficialfarma.vteximg.com.br/arquivos/ids/162897-55-55/1008.jpg?v=637090838307430000",
                        "DetailUrl": "/maca-peruana-500mg-60-capsulas/p",
                        "AssemblyOptions": []
                    }
                ]
            },
            "subscriptionData": null,
            "taxData": null,
            "checkedInPickupPointId": null,
            "cancellationData": null
        }
    ]

    const resetDatabase = async () => {
        const config = {
            user: process.env.DB_USERID_TEST,
            password: process.env.DB_PASS_TEST,
            server: process.env.DB_SERVER_TEST,
            database: process.env.DB_NAME_TEST,
            options: {
                encrypt: true,
                enableArithAbort: true
            }
        }
        
        const connPool = new sql.ConnectionPool(config);
    
        await connPool.connect();
    
        await connPool.query('DELETE FROM Order_Items');
        await connPool.query('DELETE FROM Items');
    
        await connPool.close();
    }

    beforeEach(async () => {
        await resetDatabase();
    })
    
    test('#Client - should returns a client informations', async () => {

        const handleOrders = new HandleOrders();
        const result =  mockedResponse.map((order: OrdersDTO) => {
            return handleOrders.client(order);
        });

        const expected = [
            {
                Client: {
                    client_id: "'ada159s-ed23-425s2d-80bf-78dcd344aa64'",
                    name: "'Maria Alves'",
                    last_name: "'de Lima'",
                    email: "'email@gmail.com'",
                    document: "'11122233345'"
                }
            }
        ];

        expect(result).toEqual(expected);
    });
    
    test('#addressShippingData - should returns address/shipping data', async () => {
        
        const handleOrders = new HandleOrders();
        const result =  mockedResponse.map((order: OrdersDTO) => {
            return handleOrders.addressShippingData(order);
        });

        const expected = [
            {
                ShippingData: {
                    addressId: "'65157854594'",
                    state: "'SP'",
                    city: "'Cândido Rodrigues'",
                    receiverName: "'José Matias'",
                    neighborhood: "'Arca da aliança'"
                }
            }
        ];

        expect(result).toEqual(expected);
    });

    test('#clientShippingData - should returns client shipping data', async () => {

        (uuidv4 as jest.Mock).mockReturnValue('125f-4f5g-78a9-e4as');

        const handleOrders = new HandleOrders();
        const result = mockedResponse.map((order: OrdersDTO) => {
            return handleOrders.clientShippingData(order);
        });

        const expected = [
            {
                Client_ShippingData: {
                    clientShippingId: "'125f-4f5g-78a9-e4as'",
                    client_id: "'ada159s-ed23-425s2d-80bf-78dcd344aa64'",
                    addressId: "'65157854594'"
                }
            }
        ];
        
        expect(result).toEqual(expected);
    });

    test('#dicountsName - should returns discountsName', async () => {

        const list = mockedResponse;

        (uuidv4 as jest.Mock).mockReturnValue('a25d1sd-1321-478b-a351-as2d8d1d5');

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
                    discountId: "'a25d1sd-1321-478b-a351-as2d8d1d5'",
                    orderId: "'1080883513398-01'",
                    discountName: "'Boleto Bancário'"
                }
            },
            {
                DiscountsName: {
                    discountId: "'a25d1sd-1321-478b-a351-as2d8d1d5'",
                    orderId: "'1080883513398-01'",
                    discountName: "'Coupon'"
                }
            }
        ];
        
        expect(result).toEqual(expected);

        list[0].ratesAndBenefitsData.rateAndBenefitsIdentifiers.splice(1,1);

        const [ result2 ] = list.map((order: OrdersDTO) => {
            return handleOrders.discountsName(order);
        });

        const expected2 = [
            {
                DiscountsName: {
                    discountId: "'a25d1sd-1321-478b-a351-as2d8d1d5'",
                    orderId: "'1080883513398-01'",
                    discountName: "'Boleto Bancário'"
                }
            }
        ]
        
        expect(result2).toEqual(expected2);
    });

    test('#items - should return all itens from order', async () => {

        const handleOrders = new HandleOrders();
        const [ result ] = mockedResponse.map((order: OrdersDTO) => {
            return handleOrders.items(order);
        });
        
        const expected = [
            {
                Items: {
                    skuID: "'5304'",
                    skuName: "'Ioimbina'"
                }
            },
            {
                Items: {
                    skuID: "'1008'",
                    skuName: "'Maca Peruana'"
                }
            }
        ];
        
        expect(result).toEqual(expected);
    });

    test('#logisticsInfo - should return logistcs info', async () => {

        (uuidv4 as jest.Mock).mockReturnValue('a12sd-1235s-apel1');

        const handleOrders = new HandleOrders();
        const result = mockedResponse.map((order: OrdersDTO) => {
            return handleOrders.logisticsInfo(order);
        });

        const expected = [
            {
                LogisticsInfo: {
                    logistics_id: "'a12sd-1235s-apel1'",
                    slaType: "'PAC'",
                    courrier: "'PAC'",
                    estimateDeliveryDate: "'2020-12-21T11:58:56.1102865+00:00'",
                    deliveryDeadline: "'12bd'",
                    trackingNumber: "'AA1554869884FD'",
                    orderId: "'1080883513398-01'",
                    addressId: "'65157854594'"
                }
            }
        ];

        expect(result).toEqual(expected);
    });

    test("#LogisticsInfo - should return a empty tracking number and shippingEstimateDate", () => {
        (uuidv4 as jest.Mock).mockReturnValue('a12sd-1235s-apel1');

        const order = [...mockedResponse];

        order[0].packageAttachment.packages[0] = null;
        order[0].shippingData.logisticsInfo[0].shippingEstimateDate = null;

        const handleOrders = new HandleOrders();
        const result = order.map((order: OrdersDTO) => {
            return handleOrders.logisticsInfo(order);
        });

        const expected = [
            {
                LogisticsInfo: {
                    logistics_id: "'a12sd-1235s-apel1'",
                    slaType: "'PAC'",
                    courrier: "'PAC'",
                    estimateDeliveryDate: "'2199-12-31T00:00:00.00+00:00'",
                    deliveryDeadline: "'12bd'",
                    trackingNumber: "''",
                    orderId: "'1080883513398-01'",
                    addressId: "'65157854594'"
                }
            }
        ];

        expect(result).toEqual(expected);
    });

    test('#orderItems - should return the order/item', async () => {

        (uuidv4 as jest.Mock).mockReturnValue('a1a2sd-1f235s-apghel1');

        const handleOrders = new HandleOrders();
        const [ result ] = mockedResponse.map((order: OrdersDTO) => {
            return handleOrders.orderItems(order);
        });

        const expected = [
            {
                Order_Items: {
                    orderItemsId: "'a1a2sd-1f235s-apghel1'",
                    quantitySold: "'1'",
                    skuSellingPrice: 58.66,
                    skuTotalPrice: 58.66,
                    skuValue: 78.00,
                    orderId: "'1080883513398-01'",
                    skuID: "'5304'",
                    shippingValue: 7.57,
                    shippingListPrice: 7.57,
                }
            },
            {
                Order_Items: {
                    orderItemsId: "'a1a2sd-1f235s-apghel1'",
                    quantitySold: "'1'",
                    skuSellingPrice: 28.40,
                    skuTotalPrice: 28.40,
                    skuValue: 53.90,
                    orderId: "'1080883513398-01'",
                    skuID: "'1008'",
                    shippingValue: 7.58,
                    shippingListPrice: 7.58
                }
            }
        ];

        expect(result).toEqual(expected);
    });

    test('#orders - should returns the orders informations', async () => {
        const list = mockedResponse;

        (uuidv4 as jest.Mock).mockReturnValue('a12sd-1235s-apel1');

        const handleOrders = new HandleOrders();
        const result = list.map((order: OrdersDTO) => {
            return handleOrders.orders(order);
        });

        const expected: any = [
            {
                Orders: {
                    orderId: "'1080883513398-01'",
                    origin: "'Marketplace'",
                    sequence: "'2929244'",
                    creation_date: "'2020-12-02T23:58:29.8363023+00:00'",
                    statusDescription: "'Faturado'",
                    lastChangeDate: "'2020-12-16T14:55:41.9145604+00:00'",
                    utmSource: "'Google'",
                    utmMedium: "'null'",
                    utmCampaign: "'null'",
                    coupon: "'null'",
                    totalValue: 102.21,
                    discountsTotals: -4.59,
                    host: "'oficialfarma'",
                    sellerName: "'oficialfarma'",
                    callCenterEmail: "'televendas@oficialfarma.com.br'",
                    callCenterCode: "'[SAC] Televendas'",
                    client_id: "'ada159s-ed23-425s2d-80bf-78dcd344aa64'",
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
                    orderId: "'1080883513398-01'",
                    origin: "'Marketplace'",
                    sequence: "'2929244'",
                    creation_date: "'2020-12-02T23:58:29.8363023+00:00'",
                    statusDescription: "'Faturado'",
                    lastChangeDate: "'2020-12-16T14:55:41.9145604+00:00'",
                    utmSource: "'Google'",
                    utmMedium: "'null'",
                    utmCampaign: "'null'",
                    coupon: "'null'",
                    totalValue: 102.21,
                    discountsTotals: -4.59,
                    host: "'oficialfarma'",
                    sellerName: "'oficialfarma'",
                    callCenterEmail: "''",
                    callCenterCode: "''",
                    client_id: "'ada159s-ed23-425s2d-80bf-78dcd344aa64'",
                }
            }
        ]

        expect(result).toEqual(expected);
        expect(resultWithoutCallCenterData).toEqual(expectedWithoutCallCenterData);
    });

    test('#orders - should return empty marketing datas', () => {
        const list = [...mockedResponse];

        (uuidv4 as jest.Mock).mockReturnValue('a12sd-1235s-apel1');

        const expected: any = [
            {
                Orders: {
                    orderId: "'1080883513398-01'",
                    origin: "'Marketplace'",
                    sequence: "'2929244'",
                    creation_date: "'2020-12-02T23:58:29.8363023+00:00'",
                    statusDescription: "'Faturado'",
                    lastChangeDate: "'2020-12-16T14:55:41.9145604+00:00'",
                    utmSource: "''",
                    utmMedium: "''",
                    utmCampaign: "''",
                    coupon: "''",
                    totalValue: 102.21,
                    discountsTotals: -4.59,
                    host: "'oficialfarma'",
                    sellerName: "'oficialfarma'",
                    callCenterEmail: "''",
                    callCenterCode: "''",
                    client_id: "'ada159s-ed23-425s2d-80bf-78dcd344aa64'",
                }
            }
        ];

        list[0].callCenterOperatorData = null;
        list[0].marketingData = null;

        const handleOrders = new HandleOrders();
        const result = list.map((order: OrdersDTO) => {
            return handleOrders.orders(order);
        });        

        expect(result).toEqual(expected);
    });

    test('#paymentData - should returns the payment datas', async () => {
        const data = mockedResponse;

        data[0].paymentData.transactions[0].payments.push({
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

        const list = data;

        const handleOrders = new HandleOrders();
        const [ result ] = list.map((order: OrdersDTO) => {
            return handleOrders.paymentData(order);
        });

        const expected = [
            {
                PaymentData: {
                    transaction_id: "'D62B7C81BED342EF8E1426BFDCBA331A'",
                    orderId: "'1080883513398-01'",
                    paymentSystemName: "'Boleto Bancário'",
                    installments: 1,
                    paymentValue: 102.21
                }
            },
            {
                PaymentData: {
                    transaction_id: "'1698106DE7B840718D0A1DE98C9586D2'",
                    orderId: "'1080883513398-01'",
                    paymentSystemName: "'Mastercard'",
                    installments: 1,
                    paymentValue: 200.55
                }
            }
        ];

        expect(result).toEqual(expected);
    });

    test('#saveOrders - should returns the save status', async () => {
        const config = {
            user: process.env.DB_USERID_TEST,
            password: process.env.DB_PASS_TEST,
            server: process.env.DB_SERVER_TEST,
            database: process.env.DB_NAME_TEST,
            options: {
                encrypt: true,
                enableArithAbort: true
            }
        }
        
        const connPool = new sql.ConnectionPool(config);
    
        await connPool.connect();
    
        await connPool.query('DELETE FROM requestStatus');
        await connPool.query('DELETE FROM Client_ShippingData');
        await connPool.query('DELETE FROM Order_Items');
        await connPool.query('DELETE FROM LogisticsInfo');
        await connPool.query('DELETE FROM DiscountsName');
        await connPool.query('DELETE FROM PaymentData');
        await connPool.query('DELETE FROM ShippingData');
        await connPool.query('DELETE FROM Items');
        await connPool.query('DELETE FROM Orders');
        await connPool.query('DELETE FROM Client');
    
        await connPool.close();

        (uuidv4 as jest.Mock).mockReturnValue('125fef-4f5ghg-78aad9-e4ass1')
        const handleOrders = new HandleOrders();

        let handledOrders: object[] = [];

        mockedResponse[0].items.splice(1,1);

        mockedResponse.forEach((order: OrdersDTO) => {
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
                ...Items,
                Orders,
                ...Order_Items,
                ...PaymentData,
                ShippingData,
                Client_ShippingData,
                ...DiscountsName,
                LogisticsInfo,
            ]);
        });
        
        const respSuccessfuly = await handleOrders.saveOrders(handledOrders);
        let savedWithSuccess: boolean;
        
        if(respSuccessfuly instanceof Error)
        {
            savedWithSuccess = false;
        }
        else
        {
            savedWithSuccess = true;
        }
        
        const respError = await handleOrders.saveOrders([]);
        let savedWithError: boolean;

        if(respError instanceof Error || !respError)
        {
            savedWithError = false;
        }
        else
        {
            savedWithError = true;
        }
        
        expect(savedWithSuccess).toBeTruthy();
        expect(savedWithError).toBeFalsy();
    });

    test('#General - should return an skuId and skuName', async () => {
        const db = new Database().createConnection();

        await db.insertInto("Items").values([
            {
                skuID: "'7517'",
                skuName: "'Metilcobalamina 1mg 60 Cápsulas'"
            },
            {
                skuID: "'4136'",
                skuName: "'Laxosterone® 50mg + Bioperine 5mg 60 Cápsulas'"
            },
            {
                skuID: "'1802'",
                skuName: "'Metilcobalamina 1mg 60 Cápsulas'"
            }
        ]).build();

        const response = await db
            .select('skuId')
            .from('Items')
            .select('skuName')
            .from('Items')
            .build();
            
        expect(response).toEqual([
            { skuId: '1802' },
            { skuId: '4136' },
            { skuId: '7517' },
            { skuName: 'Metilcobalamina 1mg 60 Cápsulas' },
            { skuName: 'Laxosterone® 50mg + Bioperine 5mg 60 Cápsulas' },
            { skuName: 'Metilcobalamina 1mg 60 Cápsulas' }
        ]);
    });

    test('#General - Should return all items from Items table', async () => {
        const db = new Database().createConnection();

        await db.insertInto("Items").values([
            {
                skuID: "'7517'",
                skuName: "'Metilcobalamina 1mg 60 Cápsulas'"
            },
            {
                skuID: "'4136'",
                skuName: "'Laxosterone® 50mg + Bioperine 5mg 60 Cápsulas'"
            },
            {
                skuID: "'1802'",
                skuName: "'Metilcobalamina 1mg 60 Cápsulas'"
            }
        ]).build();

        const response = await db.from('Items').build();

        expect(response).toEqual([
            {
                skuID: "1802",
                skuName: "Metilcobalamina 1mg 60 Cápsulas"
            },
            {
                skuID: "4136",
                skuName: "Laxosterone® 50mg + Bioperine 5mg 60 Cápsulas"
            },
            {
                skuID: "7517",
                skuName: "Metilcobalamina 1mg 60 Cápsulas"
            }
        ]);
    });

    test("#saveOrder - Checks if already exists an Item so that save it", async () => {
        const db = new Database().createConnection();
        const handleOrders = new HandleOrders();
        mockedResponse[0].items.push({
            "uniqueId": "ED064B849F15438EACDF87C136A60CCB",
            "id": "1008",
            "productId": "1008",
            "ean": "7898070130061",
            "lockId": "00-1080883513398-01",
            "itemAttachment": {
                "content": {},
                "name": null
            },
            "attachments": [],
            "quantity": 1,
            "seller": "1",
            "name": "Maca Peruana",
            "refId": null,
            "price": 2990,
            "listPrice": 5390,
            "manualPrice": null,
            "priceTags": [
                {
                    "name": "DISCOUNT@MARKETPLACE",
                    "value": -150,
                    "isPercentual": false,
                    "identifier": "ca50fab9-1321-478b-a351-ad644c10e3df",
                    "rawValue": -1.5,
                    "rate": null,
                    "jurisCode": null,
                    "jurisType": null,
                    "jurisName": null
                }
            ],
            "imageUrl": "https://ur/arquivos/ids/162897-55-55/1008.jpg?v=637090838307430000",
            "detailUrl": "/url/p",
            "components": [],
            "bundleItems": [],
            "params": [],
            "offerings": [],
            "sellerSku": "1008",
            "priceValidUntil": null,
            "commission": 0,
            "tax": 0,
            "preSaleDate": null,
            "additionalInfo": {
                "brandName": "OficialFarma",
                "brandId": "1",
                "categoriesIds": "/10/",
                "categories": [
                    {
                        "id": 10,
                        "name": "Desempenho Físico"
                    },
                    {
                        "id": 42,
                        "name": "Saúde Sexual"
                    }
                ],
                "productClusterId": "140,141,156,157,161,165,167,170,171,178,183,199,217,219,223,239,248,255,260,261,264,274,281,290",
                "commercialConditionId": "1",
                "dimension": {
                    "cubicweight": 0.2,
                    "height": 30,
                    "length": 30,
                    "weight": 200,
                    "width": 15
                },
                "offeringInfo": null,
                "offeringType": null,
                "offeringTypeId": null
            },
            "measurementUnit": "un",
            "unitMultiplier": 1,
            "sellingPrice": 2840,
            "isGift": false,
            "shippingPrice": null,
            "rewardValue": 60,
            "freightCommission": 0,
            "priceDefinitions": null,
            "taxCode": null,
            "parentItemIndex": null,
            "parentAssemblyBinding": null,
            "callCenterOperator": null,
            "serialNumbers": null,
            "assemblies": [],
            "costPrice": 5390
        });

        const handledItems = handleOrders.items(mockedResponse[0]);

        let someItemsToSave: object[] = [];
        
        for(const { Items } of handledItems)
        {
            const response = await db
                .select('skuID')
                .from('Items')
                .where(`skuID=${Items.skuID}`)
                .build();
                
            if(!response.length)
            {
                someItemsToSave.push({
                    Items: {
                        ...Items
                    }
                })
            }
        }

        const config = {
            user: process.env.DB_USERID_TEST,
            password: process.env.DB_PASS_TEST,
            server: process.env.DB_SERVER_TEST,
            database: process.env.DB_NAME_TEST,
            options: {
                encrypt: true,
                enableArithAbort: true
            }
        }
        
        const connPool = new sql.ConnectionPool(config);
    
        await connPool.connect();
        await connPool.query('DELETE FROM Order_Items');
        await connPool.query('DELETE FROM Items');
    
        await connPool.close();

        let itensToSave: object[] = [];

        for(const { Items } of handledItems)
        {
            const response = await db
                .select('skuID')
                .from('Items')
                .where(`skuID=${Items.skuID}`)
                .build();
                
            if(!response.length)
            {
                itensToSave.push({
                    Items: {
                        ...Items
                    }
                })
            }
        }

        expect(someItemsToSave).toHaveLength(2);
        expect(itensToSave).toHaveLength(2);
        expect(itensToSave).toEqual([
            {
                Items: {
                    skuID: "'5304'",
                    skuName: "'Ioimbina'"
                }
            },
            {
                Items: {
                    skuID: "'1008'",
                    skuName: "'Maca Peruana'"
                }
            }
        ])
    });

    test("#Update orders - Should update orders successfully", async () => {
        const handleOrders = new HandleOrders();
        let handledOrders: object[] = [];

        for(const order of mockedResponse)
        {
            const ShippingData = handleOrders.addressShippingData(order);
            const Client = handleOrders.client(order);
            const Client_ShippingData = handleOrders.clientShippingData(order);
            const DiscountsName = handleOrders.discountsName(order);
            const Items = handleOrders.items(order);
            const LogisticsInfo = handleOrders.logisticsInfo(order);
            const Order_Items = handleOrders.orderItems(order);
            const Orders = handleOrders.orders(order);
            const PaymentData = handleOrders.paymentData(order);

            handledOrders = handledOrders.concat([
                Client,
                ...Items,
                Orders,
                ...Order_Items,
                ...PaymentData,
                ShippingData,
                Client_ShippingData,
                ...DiscountsName,
                LogisticsInfo,
            ]);

            await handleOrders.saveOrders(handledOrders);
        }

        const updateResponse = await handleOrders.updateOrders(handledOrders);

        expect(updateResponse.length).toBeGreaterThan(1);
    });

    test("#General - Should insert an Item from an Array into Item table, update and delete it", async () => {
        const db = new Database().createConnection();

        const insertResponse = await db.insertInto('Items').values([
            {
                skuID: "'8340'",
                skuName: "'Chá verde'"
            }
        ]).build();
        
        const updateResponse = await db.update('Items').set({
            skuName: "'Creatina pure'"
        }).where("skuID='8340'").build();

        const deleteResponse = await db.deleteFrom('Items').where("skuID='8340'").build();

        const config = {
            user: process.env.DB_USERID_TEST,
            password: process.env.DB_PASS_TEST,
            server: process.env.DB_SERVER_TEST,
            database: process.env.DB_NAME_TEST,
            options: {
                encrypt: true,
                enableArithAbort: true
            }
        }
        
        const connPool = new sql.ConnectionPool(config);
    
        await connPool.connect();
        await connPool.query('DELETE FROM Order_Items');
        await connPool.query('DELETE FROM Items');
    
        await connPool.close();

        expect(insertResponse).toEqual([1]);
        expect(updateResponse).toEqual([1]);
        expect(deleteResponse).toEqual([1]);
    });

    test("#General - should return an empty object", async () => {
        const db = new Database().createConnection();

        const resp = await db.build();
        
        expect(resp).toEqual([{}]);
    });

    test("#General - Should return an Error on commit the transaction", async () => {
        const commit = sql.Transaction.prototype.commit;

        sql.Transaction.prototype.commit = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                return reject(new Error('ENOTBEGUN (TransactionError'));
            });
        });

        const db = new Database().createConnection();

        const result = await db
            .insertInto('requestStatus')
            .values({
                id_status:2,
                requestStatus: 0,
                lastTimeRequest: "'" + new Date().toISOString() + "'"
            })
            .build();

        sql.Transaction.prototype.commit = commit;
        expect(result).toEqual(new Error('ENOTBEGUN (TransactionError'));
    });

    test('#General- should return an error in sql.Transaction create', async () => {
        const connect = sql.ConnectionPool.prototype.connect;

        sql.ConnectionPool.prototype.connect = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                return reject(new Error('ENOTOPEN (ConnectionError)'));
            })
        });
        
        const db = new Database().createConnection();

        const result = await db
            .insertInto('requestStatus')
            .values({
                id_status:2,
                requestStatus: 0,
                lastTimeRequest: "'" + new Date().toISOString() + "'"
            })
            .build();
        
        sql.ConnectionPool.prototype.connect = connect;
        expect(result).toEqual(new Error('ENOTOPEN (ConnectionError)'));
    });
})