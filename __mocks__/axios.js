const axios = {
    get: jest.fn().mockImplementation(() => {
        return new Promise(async (resolve, reject) => {
            await setTimeout(() => {
                resolve({
                    data: {
                        list: [
                            {
                                "orderId": "1080883513398-01",
                                "sequence": "2929244",
                                "marketplaceOrderId": "",
                                "marketplaceServicesEndpoint": "http://oms.vtexinternal.com.br/api/oms?an=oficialfarma",
                                "sellerOrderId": "00-1080883513398-01",
                                "origin": "Marketplace",
                                "affiliateId": "",
                                "salesChannel": "1",
                                "status": "invoiced",
                                "statusDescription": "Faturado",
                                "value": 10221,
                                "creationDate": "02/12/2020 20:58:29",
                                "lastChange": "16/12/2020 11:55:41",
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
                                    }
                                ],
                                "items": [
                                    {
                                        "uniqueId": "1561asdadad56adaasfsafs",
                                        "id": "1111",
                                        "productId": "1111",
                                        "ean": "1111",
                                        "lockId": "00-1080883513398-01",
                                        "quantity": 1,
                                        "seller": "1",
                                        "name": "Ocitocina (Oxitocina) 60 Cápsulas",
                                        "price": 6175,
                                        "listPrice": 7800,
                                        "priceTags": [
                                            {
                                                "name": "DISCOUNT@MARKETPLACE",
                                                "value": -309,
                                                "identifier": "asd5asd-1321-478b-a351-ad644c10e3df",
                                                "rawValue": -3.09,
                                            }
                                        ],
                                        "imageUrl": "https://link/link/ids/163371-55-55/5304-Ocitocina--Oxitocina--60-Capsulas.jpg?v=637163562198470000",
                                        "detailUrl": "/ocitocina--oxitocina--60-capsulas/p",
                                        "sellerSku": "5304",
                                        "commission": 0,
                                        "tax": 0,
                                        "unitMultiplier": 1,
                                        "sellingPrice": 5866,
                                        "rewardValue": 149,
                                        "freightCommission": 0,
                                        "costPrice": 7800
                                    },
                                    {
                                        "uniqueId": "EKS63A6D2A623D63",
                                        "id": "2222",
                                        "productId": "2222",
                                        "ean": "7898070130061",
                                        "lockId": "00-1080883513398-01",
                                        "quantity": 1,
                                        "seller": "1",
                                        "name": "Maca Peruana 500Mg 60 Cápsulas",
                                        "price": 2990,
                                        "listPrice": 5390,
                                        "priceTags": [
                                            {
                                                "name": "DISCOUNT@MARKETPLACE",
                                                "value": -150,
                                                "identifier": "ca50fab9-1321-478b-a351-ad644c10e3df",
                                                "rawValue": -1.5,
                                            }
                                        ],
                                        "imageUrl": "https://link/link/ids/162897-55-55/1008.jpg?v=637090838307430000",
                                        "detailUrl": "/maca-peruana-500mg-60-capsulas/p",
                                        "sellerSku": "1008",
                                        "unitMultiplier": 1,
                                        "sellingPrice": 2840,
                                        "rewardValue": 60,
                                        "costPrice": 5390
                                    }
                                ],
                                "clientProfileData": {
                                    "id": "clientProfileData",
                                    "email": "email@gmail.com-204700124775b.ct.vtex.com.br",
                                    "firstName": "nome",
                                    "lastName": "sobrenome",
                                    "documentType": "cpf",
                                    "document": "xxxxxxxxxxxxx",
                                    "phone": "+5516999999999",
                                    "userProfileId": "e272bbcb-ed23-4d94-80bf-78dcd344aa64",
                                },
                                "marketingData": {
                                    "id": "marketingData",
                                    "utmSource": "Google",
                                    "utmPartner": "partner",
                                    "utmMedium": "medium",
                                    "utmCampaign": "campaign",
                                    "coupon": "any coupon",
                                    "utmiCampaign": "",
                                    "utmipage": "",
                                    "utmiPart": ""
                                },
                                "ratesAndBenefitsData": {
                                    "id": "ratesAndBenefitsData",
                                    "rateAndBenefitsIdentifiers": [
                                        {
                                            "featured": false,
                                            "id": "ca50fab9-1321-478b-a351-aad186asd",
                                            "name": "Boleto Bancário",
                                            "matchedParameters": {
                                                "paymentMethodId": "6"
                                            },
                                        }
                                    ]
                                },
                                "shippingData": {
                                    "id": "shippingData",
                                    "address": {
                                        "addressType": "residential",
                                        "receiverName": "nome do recebedor",
                                        "addressId": "id do endereço",
                                        "postalCode": "10000-000",
                                        "city": "Nome da cidade",
                                        "state": "SP",
                                        "country": "BRA",
                                        "street": "Nome da rua",
                                        "number": "1376",
                                        "neighborhood": "Jardim das pitangueiras",
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
                                            "deliveryCompany": "PAC",
                                            "shippingEstimate": "12bd",
                                            "shippingEstimateDate": "2020-12-21T11:58:56.1102865+00:00",
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
                                            "transitTime": "8bd"
                                        },
                                        {
                                            "itemIndex": 1,
                                            "selectedSla": "PAC",
                                            "lockTTL": "12d",
                                            "price": 758,
                                            "listPrice": 758,
                                            "sellingPrice": 758,
                                            "deliveryCompany": "PAC",
                                            "shippingEstimate": "12bd",
                                            "shippingEstimateDate": "2020-12-21T11:58:56.1102865+00:00",
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
                                            "addressId": "4820858183688",
                                            "transitTime": "8bd"
                                        }
                                    ],
                                    "selectedAddresses": [
                                        {
                                            "addressId": "4820858183688",
                                            "addressType": "residential",
                                            "receiverName": "Nome do recebedor",
                                            "street": "Nome da rua",
                                            "number": "1376",
                                            "neighborhood": "bairro",
                                            "postalCode": "10000-000",
                                            "city": "Any city",
                                            "state": "SP",
                                            "country": "BRA",
                                            "geoCoordinates": [
                                                -48.62886428833008,
                                                -21.35030746459961
                                            ]
                                        }
                                    ]
                                },
                                "paymentData": {
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
                                                    "group": "bankInvoice",
                                                    "tid": "1f060486fa6b4b069cec7d111d627aad-na26s36afh",
                                                    "dueDate": "2020-12-05"
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
                                                    "unitMultiplier": 0
                                                },
                                                {
                                                    "itemIndex": 1,
                                                    "quantity": 1,
                                                    "price": 2840,
                                                    "unitMultiplier": 0
                                                }
                                            ],
                                            "courier": "1",
                                            "invoiceNumber": "1894627",
                                            "invoiceValue": 10221,
                                            "issuanceDate": "2020-12-16T14:53:16.5830000+00:00",
                                            "trackingNumber": "PU999585353BR",
                                            "trackingUrl": "",
                                            "embeddedInvoice": "",
                                            "type": "Output",
                                        }
                                    ]
                                },
                                "sellers": [
                                    {
                                        "id": "1",
                                        "name": "oficialfarma",
                                        "logo": "",
                                        "fulfillmentEndpoint": "http://fulfillment.vtexcommerce.com.br/api/fulfillment?sc=1&an=oficialfarma"
                                    }
                                ],
                                "followUpEmail": "bc9c527de09f48eda88fc47a3a72c07e@ct.vtex.com.br",
                                "hostname": "oficialfarma",
                                "orderFormId": "f5a62f1649d64735bac10733f282279c",
                                "marketplace": {
                                    "baseURL": "http://link/api/oms?an=oficialfarma",
                                    "name": "oficialfarma"
                                },
                                "authorizedDate": "2020-12-03T11:58:50.0000000+00:00",
                                "invoicedDate": "2020-12-16T14:54:00.5436574+00:00",
                                "itemMetadata": {
                                    "Items": [
                                        {
                                            "Id": "5304",
                                            "Seller": "1",
                                            "Name": "Ocitocina (Oxitocina) 60 Cápsulas",
                                            "SkuName": "Ocitocina (Oxitocina) 60 Cápsulas",
                                            "ProductId": "5304",
                                            "Ean": "5304",
                                            "ImageUrl": "http://link/link/ids/163371-55-55/5304-Ocitocina--Oxitocina--60-Capsulas.jpg?v=637163562198470000",
                                            "DetailUrl": "/ocitocina--oxitocina--60-capsulas/p",
                                        },
                                        {
                                            "Id": "1008",
                                            "Seller": "1",
                                            "Name": "Maca Peruana 500Mg 60 Cápsulas",
                                            "SkuName": "Maca Peruana 500Mg 60 Cápsulas",
                                            "ProductId": "1008",
                                            "Ean": "7898070130061",
                                            "ImageUrl": "http://link/link/ids/162897-55-55/1008.jpg?v=637090838307430000",
                                            "DetailUrl": "/maca-peruana-500mg-60-capsulas/p",
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                });
            }, 500)
        })
    }),
    create: () => axios
}

module.exports = axios;