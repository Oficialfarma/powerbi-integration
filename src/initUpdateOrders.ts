import { OrdersDTO } from "./interfaces/OrdersDTO";
import { Database } from "./repositories/Database";
import UpdateOrders from "./repositories/UpdateOrders";
import createGetOrdersController from "./useCases/GetOrders";
import HandleOrders from "./useCases/HandleOrders/implementations/HandleOrders";
import writeLogError from "./utils/writeLogError";

type ordersId = {
    orderId: string;
}

(async function () {

    const db = new Database().createConnection();

    let response = await db.select("COUNT(orderId) AS rows").from("Orders").build();

    const limit = 500;
    let actualIndex = 0;
    let max = limit;
    let hasError = false;

    const interval = setInterval(async () => {
        const { rows } = response[0];
        
        if(actualIndex > rows)
        {
            clearInterval(interval);
            
            if(hasError)
            {
                process.exit(0);
            }
            else
            {
                process.exit(1);
            }
        }

        const ordersToUpdate = await new UpdateOrders().createConnection().specialLimit(actualIndex, max).build();
        
        actualIndex += limit;
        max += limit;
        
        if(!ordersToUpdate.length)
        {
            return;
        }
    
        const orderId = ordersToUpdate.map((order: ordersId) => order.orderId);
        let detailedOrders: OrdersDTO[];
        
        try
        {
            detailedOrders = await createGetOrdersController.handle({
                timeout: 10000,
                methodType: "get",
                orderId
            })
            
            if(detailedOrders instanceof Error)
            {
                throw detailedOrders;
            }
        }
        catch(err)
        {
            writeLogError(err + " on update orders");
            clearInterval(interval);
            hasError = true;
            process.exit(err);
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

        const buildResponse = await db.build();

        if(buildResponse instanceof Error)
        {
            hasError = true;
            writeLogError(buildResponse.toString());
            clearInterval(interval);
            process.exit(0);
        }
    }, 20000);
})();