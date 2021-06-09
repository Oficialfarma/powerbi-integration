import { OrdersDTO } from "./interfaces/OrdersDTO";
import { Database } from "./repositories/Database";
import createGetOrdersController from "./useCases/GetOrders";
import HandleOrders from "./useCases/HandleOrders/implementations/HandleOrders";
import writeLogError from "./utils/writeLogError";

type ordersId = {
    orderId: string;
}

(async function () {

    const db = new Database().createConnection();

    const ordersToUpdate = await db
        .select('orderId')
        .from('Orders')
        .where("statusDescription<>'faturado' AND statusDescription<>'cancelado'")
        .build();

    const orderId = ordersToUpdate.map((order: ordersId) => order.orderId);
    
    let detailedOrders: OrdersDTO[];

    try
    {
        detailedOrders = await createGetOrdersController.handle({
            timeout: 10000,
            methodType: "get",
            orderId
        });
    }
    catch(err)
    {
        writeLogError(err);
    }

    const handleOrders = new HandleOrders();
    let handledOrders: object[] = [];

    for(const order of detailedOrders)
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
            LogisticsInfo
        ]);
    };

    handledOrders.forEach((information: any) => {
        const actualKey = Object.keys(information)[0];
        const objId = Object.keys(information[actualKey])[0];
        const objIdValue = information[actualKey][objId];
        const differentUpdates = ["logistics_id", "orderItemsId", "discountId"];

        if(objId === "client_id")
        {
            const clientId = information[actualKey][objId];
            delete information[actualKey][objId];
            
            db.update(actualKey).set(information[actualKey]).where(`client_id=${clientId}`);
        }
        else if(differentUpdates.includes(objId))
        {
            delete information[actualKey][objId];
            
            db.update(actualKey).set(information[actualKey]).where(`orderId=${information[actualKey].orderId}`);
        }
        else if(objId === "clientShippingId")
        {
            const clientId = information[actualKey].client_id;
            delete information[actualKey][objId];
            
            db.update(actualKey).set(information[actualKey]).where(`client_id=${clientId}`);
        }
        else
        {
            db.update(actualKey).set(information[actualKey]).where(`${objId}=${objIdValue}`);
        }
    });

    const response = await db.build();

    if(response instanceof Error)
    {
        writeLogError(response.toString());
    }
    else
    {
        process.exit(1);
    }
})();