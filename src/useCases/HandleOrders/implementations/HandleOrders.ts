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
            client_id: order.clientProfileData.id,
            name: order.clientProfileData.firstName,
            last_name: order.clientProfileData.lastName,
            email: clientEmail,
            document: order.clientProfileData.document,
        };
    }

    addressShippingData(order: OrdersDTO)
    {
        return {
            addressId: order.shippingData.address.addressId,
            state: order.shippingData.address.state,
            city: order.shippingData.address.city,
            receiverName: order.shippingData.address.receiverName,
            neighborhood: order.shippingData.address.neighborhood
        }
    }

    clientShippingData(order: OrdersDTO)
    {
        return {
            clientShippingId: uuidv4(),
            client_id: order.clientProfileData.id,
            address_id: order.shippingData.address.addressId
        }
    }

    dicountsName(order: OrdersDTO)
    {
        return {}
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