import { IHandleOrders } from "../../interfaces/IHandleOrders";

export default class HandleOrdersUseCase
{
    constructor(
        private HandleOrders: IHandleOrders
    ){}

    execute(orders: object[])
    {
        let hasBeenSuccessfullySaved: boolean;
        
        const handledOrders = orders.map(order => {
            const addressShippingData = this.HandleOrders.addressShippingData(order);
            const client = this.HandleOrders.client(order);
            const clientShippingData = this.HandleOrders.clientShippingData(order);
            const dicountsName = this.HandleOrders.dicountsName(order);
            const items = this.HandleOrders.items(order);
            const logisticsInfo = this.HandleOrders.logisticsInfo(order);
            const orderItems = this.HandleOrders.orderItems(order);
            const orders = this.HandleOrders.orders(order);
            const paymentData = this.HandleOrders.paymentData(order);

            return [
                addressShippingData,
                client,
                clientShippingData,
                dicountsName,
                items,
                logisticsInfo,
                orderItems,
                orders,
                paymentData
            ];
        });

        hasBeenSuccessfullySaved = this.HandleOrders.saveOrders(handledOrders);

        return hasBeenSuccessfullySaved;
    }
}