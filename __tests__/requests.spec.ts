import dotenv from 'dotenv';
dotenv.config();

import { describe, test, expect, jest, beforeEach } from "@jest/globals";

import { Requests } from '../src/providers/Requests';
import axios from 'axios';
import { DateFormat } from '../src/utils/DateFormat';
import { OrdersDTO } from '../src/interfaces/OrdersDTO';

describe("VTEX API request", () => {

    afterEach(() => {
        jest.clearAllMocks();
    })
   
    test('#Make request - Should returns a resolve promisse with order id/datas', async () => {
        const requests = new Requests();

        const actualTimeRequest = DateFormat.dateFormatToQueryParams(new Date('2021-05-05T13:30:00'));
        const lastRequestTime = DateFormat.dateFormatToQueryParams(new Date('2021-05-05T13:00:00'));

        const queryParams = `?f_creationDate=creationDate%3A%5B${lastRequestTime}%20TO%20${actualTimeRequest}%5D&per_page=100`;
        
        const expected: OrdersDTO = {
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
                    "name": "product Name",
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
                    "name": "product name",
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
            "callCenterOperatorData": null,
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
        };

        await requests.makeRequest({
            queryParams,
            timeout: 1000
        }).then(resp => {

            expect(axios.get).toBeCalledTimes(1);
            expect(typeof resp).toBe('object');
            expect(resp.list[0]).toStrictEqual(expected);
        })
    });

    test('#Make request - Should throws a request error', async () => {
        expect(axios.get).not.toHaveBeenCalled();

        const mockedAxios = axios as jest.Mocked<typeof axios>;
        mockedAxios.get.mockImplementationOnce(() => {
            throw 'Connection error';
        });

        const requests = new Requests();

        const expected = 'Connection error';

        await requests.makeRequest({
            timeout: 1000
        }).catch(err => {
            expect(axios.get).toBeCalledTimes(1);
            expect(err).toStrictEqual(expected);
        });
    });

    test('#timeDelay - Should throws a Timeout Error', async () => {
        expect(axios.get).not.toHaveBeenCalled();
        
        const requests = new Requests();

        const actualTimeRequest = DateFormat.dateFormatToQueryParams(new Date('2021-05-05T13:30:00'));
        const lastRequestTime = DateFormat.dateFormatToQueryParams(new Date('2021-05-05T13:00:00'));

        const queryParams = `?f_creationDate=creationDate%3A%5B${lastRequestTime}%20TO%20${actualTimeRequest}%5D&per_page=100`;

        const expected = new Error("Timeout error");

        const response = await requests.makeRequest({
            queryParams,
            timeout: 1
        }).catch(err => err);
        
        expect(response).toEqual(expected);
    });
});