import { IHandleOrders } from "../../interfaces/IHandleOrders";
import { OrdersDTO } from "../../interfaces/OrdersDTO";
import { Database } from "../../repositories/Database";
import removeDoubleClients from "../../utils/removeDoubleClients";

export default class HandleOrdersUseCase
{
    constructor(
        private HandleOrders: IHandleOrders
    ){}

    async execute(orders: OrdersDTO[])
    {   
        let handledOrders: object[] = [];
        
        for(const order of orders)
        {
            const ShippingData = this.HandleOrders.addressShippingData(order);
            const Client = this.HandleOrders.client(order);
            const Client_ShippingData = this.HandleOrders.clientShippingData(order);
            const DiscountsName = this.HandleOrders.discountsName(order);
            const Items = this.HandleOrders.items(order);
            const LogisticsInfo = this.HandleOrders.logisticsInfo(order);
            const Order_Items = this.HandleOrders.orderItems(order);
            const Orders = this.HandleOrders.orders(order);
            const PaymentData = this.HandleOrders.paymentData(order);

            const db = new Database().createConnection();

            const ItemsToSave: object[] = [];
            
            for(const item of Items)
            {
                const result = await db
                    .select('skuID')
                    .from('Items')
                    .where(`skuID=${item.Items.skuId}`)
                    .build();

                if(!result.length)
                {
                    ItemsToSave.push(item);
                }
            }

            /* Start of verification if the customer and
            address are already registered
            */
            let ClientToSave = null;
            let ShippingDataToSave = null;

            const clientAlreadyExits = await db
                .select('client_id')
                .from('Client')
                .where(`client_id=${Client.Client.client_id}`)
                .build();
            
            const shippingDataAlreadyExists = await db
                .select('addressId')
                .from('ShippingData')
                .where(`addressId=${ShippingData.ShippingData.addressId}`)
                .build();

            if(!clientAlreadyExits.length)
            {
                ClientToSave = Client;
            }

            if(!shippingDataAlreadyExists.length)
            {
                ShippingDataToSave = ShippingData;
            }

            if(ClientToSave)
            {
                handledOrders = handledOrders.concat([ClientToSave]);
            }
            /*
                concatenates in the array to the payment information and
                then checks whether a new address will be inserted and
                continues concatenating the rest of the information in the array 
            */
            handledOrders = handledOrders.concat([
                ...ItemsToSave,
                Orders,
                ...Order_Items,
                ...PaymentData,
            ]);

            if(ShippingDataToSave)
            {
                handledOrders = handledOrders.concat([ShippingDataToSave]);
            }

            handledOrders = handledOrders.concat([
                Client_ShippingData,
                ...DiscountsName,
                LogisticsInfo,
            ]);
        }
        /* End of verification if the customer and
            address are already registered
        */
        handledOrders = removeDoubleClients(handledOrders);

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