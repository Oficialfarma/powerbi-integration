import { IGetOrders } from "../../../interfaces/IGetOrders";
import { IRequestOptions } from "../../../interfaces/IRequestOptions";

export class GetOrders implements IGetOrders
{
    async getOrders(
        url: string,
        options: IRequestOptions,
        methodType: "list" | "get",
        timeout: number,
        queryParams?: string,
        orderId?: string[],
        amountPages?: number
    ): Promise<void>
    {
        amountPages = amountPages ?? 1;

        let requests = [];

        if(methodType === "list")
        {
            for(let i = 1; i <= amountPages; i++)
            {
                requests.push({
                    url,
                    queryParams: queryParams + `?page=${i}`,
                    ...options,
                    timeout
                });
                
            }
        }
        else
        {
            for(let i = 0; i < orderId.length; i++)
            {
                
            }
        }
    }
}