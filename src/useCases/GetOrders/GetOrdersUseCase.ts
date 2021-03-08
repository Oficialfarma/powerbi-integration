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
            return await this.GetOrders.getOrders(
                datas.url,
                datas.options,
                datas.methodType,
                datas.timeout
            );
        }
        else
        {

        }
    }
}