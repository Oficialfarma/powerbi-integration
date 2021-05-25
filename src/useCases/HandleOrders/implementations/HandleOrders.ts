import { v4 as uuidv4 } from 'uuid';
import { IHandleOrders } from "../../../interfaces/IHandleOrders";
import { OrdersDTO } from "../../../interfaces/OrdersDTO";
import { Database } from '../../../repositories/Database';

export default class HandleOrders implements IHandleOrders
{
    client(order: OrdersDTO)
    {
        let clientEmail = order.clientProfileData.email;
        clientEmail = clientEmail.substring(0, clientEmail.indexOf('-'));

        return {
            Client: {
                client_id: order.clientProfileData.userProfileId,
                name: order.clientProfileData.firstName,
                last_name: order.clientProfileData.lastName,
                email: clientEmail,
                document: order.clientProfileData.document
            }
        };
    }

    addressShippingData(order: OrdersDTO)
    {
        return {
            ShippingData: {
                addressId: order.shippingData.address.addressId,
                state: order.shippingData.address.state,
                city: order.shippingData.address.city,
                receiverName: order.shippingData.address.receiverName,
                neighborhood: order.shippingData.address.neighborhood
            }
        }
    }

    clientShippingData(order: OrdersDTO)
    {
        return {
            Client_ShippingData: {
                clientShippingId: uuidv4(),
                client_id: order.clientProfileData.id,
                address_id: order.shippingData.address.addressId
            }
        }
    }

    discountsName(order: OrdersDTO)
    {
        const discountsName = order.ratesAndBenefitsData.rateAndBenefitsIdentifiers.map(elem => {
            return {
                DiscountsName: {
                    discountId: elem.id,
                    orderId: order.orderId,
                    discountName: elem.name
                }
            };
        });
        
        return discountsName;
    }

    items(order: OrdersDTO)
    {
        const itens = order.items.map(item => {
            return {
                Items: {
                    skuId: item.id,
                    skuName: item.name
                }
            };
        });
        
        return itens;
    }

    logisticsInfo(order: OrdersDTO)
    {
        const logisticsInfo = {
            LogisticsInfo: {
                logistics_id: uuidv4(),
                slaType: order.shippingData.logisticsInfo[0].selectedSla,
                courrier: order.shippingData.logisticsInfo[0].selectedSla,
                estimateDeliveryDate: order.shippingData.logisticsInfo[0].shippingEstimateDate,
                deliveryDeadline: order.shippingData.logisticsInfo[0].shippingEstimate,
                trackingNumber: order.packageAttachment.packages[0].trackingNumber,
                orderId: order.orderId,
                addressId: order.shippingData.selectedAddresses[0].addressId
            }
        };

        return logisticsInfo;
    }

    orderItems(order: OrdersDTO)
    {
        const itens = order.items.map((item, index) => {
            return {
                Order_Items: {
                    orderItemsId: `${order.orderId}-${item.id}`,
                    quantitySold: item.seller,
                    skuSellingPrice: item.sellingPrice / 100,
                    skuTotalPrice: (item.sellingPrice * Number(item.seller)) / 100,
                    skuValue: item.costPrice / 100,
                    orderId: order.orderId,
                    skuId: item.id,
                    shippingValue: order.shippingData.logisticsInfo[index].price / 100,
                    shippingListPrice: order.shippingData.logisticsInfo[index].listPrice / 100
                }
            }
        });

        return itens;
    }

    orders(order: OrdersDTO)
    {
        let callCenterDatas: object;

        if(order.callCenterOperatorData !== null)
        {
            callCenterDatas = {
                callCenterEmail: order.callCenterOperatorData.email,
                callCenterCode: order.callCenterOperatorData.userName
            }
        }
        else
        {
            callCenterDatas = {
                callCenterEmail: null,
                callCenterCode: null
            };
        }

        return {
            Orders: {
                orderId: order.orderId,
                origin: order.origin,
                sequence: order.sequence,
                creation_date: order.creationDate,
                statusDescription: order.statusDescription,
                lastChangeDate: order.lastChange,
                utmSource: order.marketingData.utmSource,
                utmMedium: order.marketingData.utmMedium,
                utmCampaign: order.marketingData.utmCampaign,
                coupon: order.marketingData.coupon,
                totalValue: order.value / 100,
                discountsTotals: order.totals.find(totals => {
                    return totals.id === 'Discounts';
                }).value / 100,
                host: order.hostname,
                sellerName: order.sellers[0].name,
                ...callCenterDatas,
                client_id: order.clientProfileData.userProfileId,
            }
        }
    }

    paymentData(order: OrdersDTO)
    {
        const payments = order.paymentData.transactions[0].payments.map(payment => {
            return {
                PaymentData: {
                    transaction_id: payment.id,
                    orderId: order.orderId,
                    paymentSystemName: payment.paymentSystemName,
                    installments: payment.installments,
                    paymentValue: payment.value / 100
                }
            }
        });

        return payments
    }

    saveOrders(orders: object[])
    {
        if(!orders.length) return false;

        const db = new Database().createConnection();

        orders.forEach((order: any) => {
            const tableName = Object.keys(order)[0];
            
            const values = Object.entries(order[tableName]);
            console.log(order[tableName])
            db.insertInto(tableName).values(order[tableName]);
            // for(const [ key, value ] of values)
            // {
                
            // }
        });
        
        return false;
    }
}