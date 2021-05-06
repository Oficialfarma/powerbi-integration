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