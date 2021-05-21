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
            return JSON.parse(discountsName.join(','));
        }
        else
        {
            return discountsName[0];
        }
    }

    items(order: OrdersDTO)
    {
        return {}
    }

    logisticsInfo(order: OrdersDTO)
    {
        return {}
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