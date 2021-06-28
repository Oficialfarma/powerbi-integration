export interface IHandleOrders
{
    client(oder: object): Client;
    clientShippingData(order: object): ClientShippingData;
    addressShippingData(order: object): ShippingData;
    orders(order: object): Orders;
    logisticsInfo(order: object): LogisticsInfo;
    paymentData(order: object): PaymentData[];
    discountsName(order: object): DiscountsName[];
    orderItems(order: object): OrderItems[];
    items(order: object): Items[];
    saveOrders(orders: object[]): Promise<boolean | Error>
    updateOrders(orders: object[]): Promise<boolean | Error> 
}

type Client = {
    Client: {
        client_id: string;
        name: string;
        last_name: string;
        email: string;
        document: string;
    }
}

type ClientShippingData = {
    Client_ShippingData: {
        clientShippingId: string;
        client_id: string;
        addressId: string;
    }
}

type ShippingData = {
    ShippingData: {
        addressId: string;
        state: string;
        city: string;
        receiverName: string;
        neighborhood: string;
    }
}

type Orders = {
    Orders: {
        orderId: string;
        origin: string;
        sequence: string;
        creation_date: string;
        statusDescription: string;
        lastChangeDate: string;
        utmSource: string;
        utmMedium: string;
        utmCampaign: string;
        coupon: string;
        totalValue: number;
        discountsTotals: number;
        host: string;
        sellerName: string;
        callCenterEmail?: string;
        callCenterCode?: string;
        client_id: string;
    }
}

type LogisticsInfo = {
    LogisticsInfo: {
        logistics_id: string;
        slaType: string;
        courrier: string;
        estimateDeliveryDate: string;
        deliveryDeadline: string;
        trackingNumber: string;
        orderId: string;
        addressId: string;
    }
}

type PaymentData = {
    PaymentData: {
        transaction_id: string;
        orderId: string;
        paymentSystemName: string;
        installments: number,
        paymentValue: number
    }
}

type DiscountsName = {
    DiscountsName: {
        discountId: string;
        orderId: string;
        discountName: string;
    }
}

type OrderItems = {
    Order_Items: {
        orderItemsId: string;
        quantitySold: string;
        skuSellingPrice: number;
        skuTotalPrice: number;
        skuValue: number;
        orderId: string;
        skuId: string;
        shippingValue: number;
        shippingListPrice: number;
    }
}

type Items = {
    Items: {
        skuId: string;
        skuName: string;
    }
}