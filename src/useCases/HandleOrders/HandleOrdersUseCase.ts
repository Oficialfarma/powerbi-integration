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

            let ClientToSave;

            const clientAlreadyExits = await db
                .select('client_id')
                .from('Client')
                .where(`client_id=${Client.Client.client_id}`)
                .build();
            
            if(!clientAlreadyExits.length)
            {
                ClientToSave = Client;
            }

            handledOrders = handledOrders.concat([
                ClientToSave,
                ...ItemsToSave,
                Orders,
                ...Order_Items,
                ...PaymentData,
                ShippingData,
                Client_ShippingData,
                ...DiscountsName,
                LogisticsInfo,
            ]);
        }
        
        handledOrders = removeDoubleClients(handledOrders);
        
        
        // console.log(handledOrders)
        // orders.forEach((order: OrdersDTO) => {
        //     const ShippingData = this.HandleOrders.addressShippingData(order);
        //     const Client = this.HandleOrders.client(order);
        //     const Client_ShippingData = this.HandleOrders.clientShippingData(order);
        //     const DiscountsName = this.HandleOrders.discountsName(order);
        //     const Items = this.HandleOrders.items(order);
        //     const LogisticsInfo = this.HandleOrders.logisticsInfo(order);
        //     const Order_Items = this.HandleOrders.orderItems(order);
        //     const Orders = this.HandleOrders.orders(order);
        //     const PaymentData = this.HandleOrders.paymentData(order);

        //     const db = new Database().createConnection();

        //     const ItemsToSave: object[] = [];
            
        //     Items.forEach(async (item) => {
        //         const result = await db.select('skuID').from('Items').where(`skuID=${item.Items.skuId}`).build();

        //         if(!result.length)
        //         {
        //             ItemsToSave.push(item);
        //         }
        //     });

        //     // console.log(clientAlreadyExits)
        //     // if(!clientAlreadyExits.length)
        //     // {
        //     //     ClientToSave = Client;
        //     // }
            
        //     // console.log("cliente", ClientToSave)
        //     // handledOrders = handledOrders.concat([
        //     //     Client,
        //     //     ...ItemsToSave,
        //     //     Orders,
        //     //     ...Order_Items,
        //     //     ...PaymentData,
        //     //     ShippingData,
        //     //     Client_ShippingData,
        //     //     ...DiscountsName,
        //     //     LogisticsInfo,
        //     // ]);
        // });

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