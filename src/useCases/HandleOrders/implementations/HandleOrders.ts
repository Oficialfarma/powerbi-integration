import { IHandleOrders } from "../../../interfaces/IHandleOrders";

export default class HandleOrders implements IHandleOrders
{
    client(order: object)
    {
        return {};
    }

    addressShippingData(order: object)
    {
        return {}
    }

    clientShippingData(order: object)
    {
        return {}
    }

    dicountsName(order: object)
    {
        return {}
    }

    items(order: object)
    {
        return {}
    }

    logisticsInfo(order: object)
    {
        return {}
    }

    orderItems(order: object)
    {
        return {}
    }

    orders(order: object)
    {
        return {}
    }

    paymentData(order: object)
    {
        return {}
    }

    saveOrders(orders: object[])
    {
        return false;
    }
}