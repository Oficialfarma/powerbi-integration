import { IGetOrders } from "../../interfaces/IGetOrders";
import { IGetOrdersDTO } from "../../interfaces/IGetOrdersDTO";

/**
 * @classdesc implements the usage logic of obtaining orders
 */
export class GetOrdersUseCase
{
    constructor(
        private GetOrders: IGetOrders
    ){}

    async execute(datas: IGetOrdersDTO)
    {
        const mainOptions = {
            timeout: datas.timeout,
            methodType: datas.methodType
        };

        /**
         * Checks if the method is to list all informations about the orders
         * or if it is get detailed orders
         */
        if(datas.methodType === "list")
        {
            return await this.GetOrders.getOrders({
                ...mainOptions,
                queryParams: datas.queryParams,
                amountPages: datas.amountPages
            });
        }
        else
        {
            return await this.GetOrders.getOrders({
                ...mainOptions,
                orderId: datas.orderId
            });
        }
    }
}