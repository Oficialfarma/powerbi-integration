import { IHandleOrders } from "../../interfaces/IHandleOrders";
import { OrdersDTO } from "../../interfaces/OrdersDTO";
import { Database } from "../../repositories/Database";
import removeDoubleItems from "../../utils/removeDoubleItems";

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

            const ItemsToSave: object[] = [];
            
            for(const item of Items)
            {
                const result = await this.checkIfItemExistsIntoDatabase(
                    'skuID',
                    'Items',
                    `skuID=${item.Items.skuId}`
                );

                if(!result)
                {
                    ItemsToSave.push(item);
                }
            }

            /* Start of verification if the customer and
            address are already registered
            */
            const clientAlreadyExits = await this.checkIfItemExistsIntoDatabase(
                'client_id',
                'Client',
                `client_id=${Client.Client.client_id}`
            );

            const shippingDataAlreadyExists = await this.checkIfItemExistsIntoDatabase(
                'addressId',
                'ShippingData',
                `addressId=${ShippingData.ShippingData.addressId}`
            );

            if(!clientAlreadyExits)
            {
                handledOrders = handledOrders.concat([Client]);
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

            if(!shippingDataAlreadyExists)
            {
                handledOrders = handledOrders.concat([ShippingData]);
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
        handledOrders = removeDoubleItems(handledOrders);

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

    /**
     * @description Checks if an item exists into some database table
     * @param columnNames Columns that will be selected
     * @param tableName Table where select will be make
     * @param whereFilter Filter
     * @returns true if item already exists into the database
     * or false if item doesn't exists
     */
    async checkIfItemExistsIntoDatabase(columnNames: string, tableName: string, whereFilter: string): Promise<boolean>
    {
        const db = new Database().createConnection();

        const response = await db.select(columnNames).from(tableName).where(whereFilter).build();

        if(response.length)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}