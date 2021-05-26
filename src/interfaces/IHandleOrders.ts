export interface IHandleOrders
{
    client(oder: object): object;
    clientShippingData(order: object): object;
    addressShippingData(order: object): object;
    orders(order: object): object;
    logisticsInfo(order: object): object;
    paymentData(order: object): object;
    discountsName(order: object): object | object[];
    orderItems(order: object): object;
    items(order: object): object;
    saveOrders(orders: object[]): Promise<boolean | Error> 
}