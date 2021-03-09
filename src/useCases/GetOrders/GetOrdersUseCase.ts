import { IGetOrders } from "../../interfaces/IGetOrders";
import { IGetOrdersDTO } from "../../interfaces/IGetOrdersDTO";

export class GetOrdersUseCase
{
    constructor(
        private GetOrders: IGetOrders
    ){}

    async execute(datas: IGetOrdersDTO)
    {
        if(datas.methodType === "list")
        {
            return await this.GetOrders.getOrders({
                url: datas.url,
                options: datas.options,
                queryParams: datas.queryParams,
                methodType: datas.methodType,
                timeout: datas.timeout,
                amountPages: datas.amountPages
            });
        }
        else
        {

        }
    }
}