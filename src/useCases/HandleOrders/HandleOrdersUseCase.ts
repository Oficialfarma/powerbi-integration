import { IHandleOrders } from "../../interfaces/IHandleOrders";
import { OrdersDTO } from "../../interfaces/OrdersDTO";

export default class HandleOrdersUseCase
{
    constructor(
        private HandleOrders: IHandleOrders
    ){}

    async execute(orders: OrdersDTO[])
    {   
        let handledOrders: object[] = [];
        
        orders.forEach((order: OrdersDTO) => {
            const ShippingData = this.HandleOrders.addressShippingData(order);
            const Client = this.HandleOrders.client(order);
            const Client_ShippingData = this.HandleOrders.clientShippingData(order);
            const DiscountsName = this.HandleOrders.discountsName(order);
            const Items = this.HandleOrders.items(order);
            const LogisticsInfo = this.HandleOrders.logisticsInfo(order);
            const Order_Items = this.HandleOrders.orderItems(order);
            const Orders = this.HandleOrders.orders(order);
            const PaymentData = this.HandleOrders.paymentData(order);

            handledOrders = handledOrders.concat([
                Client,
                ...Items,
                Orders,
                ...Order_Items,
                ...PaymentData,
                ShippingData,
                Client_ShippingData,
                ...DiscountsName,
                LogisticsInfo,
            ]);
        });

        const status = await this.HandleOrders.saveOrders(handledOrders);

        if(status instanceof Error)
        {
            return status;
        }
        else
        {
            return true;
        }
    }
}