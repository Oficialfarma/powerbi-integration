import { v4 as uuidv4 } from 'uuid';
import { IHandleOrders } from "../../../interfaces/IHandleOrders";
import { OrdersDTO } from "../../../interfaces/OrdersDTO";

export default class HandleOrders implements IHandleOrders
{
    client(order: OrdersDTO)
    {
        let clientEmail = order.clientProfileData.email;
        clientEmail = clientEmail.substring(0, clientEmail.indexOf('-'));

        return {
            client: {
                client_id: order.clientProfileData.id,
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
            addressShippingData: {
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
            clientShippingData: {
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
                discountsName: {
                    discountId: elem.id,
                    orderId: order.orderId,
                    discountName: elem.name
                }
            };
        });
        
        if(discountsName.length > 1)
        {
            return discountsName;
        }
        else
        {
            return discountsName[0];
        }
    }

    items(order: OrdersDTO)
    {
        const itens = order.items.map(item => {
            return {
                itens: {
                    skuId: item.id,
                    skuName: item.name
                }
            };
        });
        
        if(itens.length > 1)
        {
            return itens;
        }
        else
        {
            return itens[0];
        }
    }

    logisticsInfo(order: OrdersDTO)
    {
        const logisticsInfo = {
            logisticsInfo: {
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
        return {}
    }

    orders(order: OrdersDTO)
    {
        return {}
    }

    paymentData(order: OrdersDTO)
    {
        return {}
    }

    saveOrders(orders: object[])
    {
        return false;
    }
}